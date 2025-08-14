// CONFIGURAÇÃO - Substitua pelos seus valores EXATOS
const CONFIG = {
  pastaDriveAdmin: 'Currículos Administrativos',
  pastaDriveDocentes: 'Currículos Docentes',
  emailNotificacaoAdmin: 'nicole@fam.br',
  emailNotificacaoDocentes: 'nicole@fam.br',
  planilhaAdmin: 'Candidatos_Administrativos',   // Nome base da planilha
  planilhaDocentes: 'Candidatos_Docentes'        // Nome base da planilha
};

// Variáveis globais para armazenar IDs e objetos (cache)
let cache = {
  folderIds: {},
  spreadsheetIds: {}
};

/**
 * Função para obter o ID de uma pasta pelo nome.
 * @param {string} folderName - Nome da pasta.
 * @return {string} ID da pasta ou null se não encontrada.
 */
function getFolderIdByName(folderName) {
  if (cache.folderIds[folderName]) {
    console.log(`[CACHE] Pasta '${folderName}' encontrada no cache: ${cache.folderIds[folderName]}`);
    return cache.folderIds[folderName];
  }

  try {
    const folders = DriveApp.getFoldersByName(folderName);
    let folderId = null;
    let count = 0;
    while (folders.hasNext()) {
      const folder = folders.next();
      folderId = folder.getId();
      count++;
      console.log(`[ENCONTRADO] Pasta '${folderName}' com ID: ${folderId}`);
      if(count > 1) {
          console.warn(`[AVISO] Mais de uma pasta encontrada com o nome '${folderName}'. Usando a primeira.`);
          break;
      }
    }

    if (folderId) {
      cache.folderIds[folderName] = folderId;
      return folderId;
    } else {
      console.error(`[ERRO] Pasta '${folderName}' NÃO ENCONTRADA no Google Drive.`);
      return null;
    }
  } catch (error) {
    console.error('[ERRO] Exceção ao buscar pasta:', error.toString());
    return null;
  }
}

/**
 * Função para obter o ID de uma planilha pelo nome.
 * @param {string} sheetName - Nome da planilha.
 * @return {string} ID da planilha ou null se não encontrada.
 */
function getSpreadsheetIdByName(sheetName) {
  if (cache.spreadsheetIds[sheetName]) {
    console.log(`[CACHE] Planilha '${sheetName}' encontrada no cache: ${cache.spreadsheetIds[sheetName]}`);
    return cache.spreadsheetIds[sheetName];
  }

  try {
    const files = DriveApp.getFilesByName(sheetName);
    let fileId = null;
    let count = 0;
    while (files.hasNext()) {
      const file = files.next();
      if (file.getMimeType() === 'application/vnd.google-apps.spreadsheet') {
        fileId = file.getId();
        count++;
        console.log(`[ENCONTRADO] Planilha '${sheetName}' com ID: ${fileId}`);
        if(count > 1) {
            console.warn(`[AVISO] Mais de uma planilha encontrada com o nome '${sheetName}'. Usando a primeira.`);
            break;
        }
      } else {
         console.log(`[INFO] Arquivo encontrado com nome '${sheetName}', mas tipo MIME é '${file.getMimeType()}'. Ignorando.`);
      }
    }

    if (fileId) {
      cache.spreadsheetIds[sheetName] = fileId;
      return fileId;
    } else {
      console.error(`[ERRO] Planilha '${sheetName}' NÃO ENCONTRADA no Google Drive.`);
      return null;
    }
  } catch (error) {
    console.error('[ERRO] Exceção ao buscar planilha:', error.toString());
    return null;
  }
}

/**
 * Função para garantir que a planilha tenha os cabeçalhos corretos e formatados.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - Objeto da aba da planilha.
 * @param {Array<string>} headers - Array com os cabeçalhos esperados.
 */
function ensureHeaders(sheet, headers) {
  const cellA1Value = sheet.getRange('A1').getValue();
  const hasHeaders = cellA1Value !== '';

  console.log(`[ensureHeaders] Verificando cabeçalhos na aba '${sheet.getName()}'. Tem cabeçalhos? ${hasHeaders} (Baseado no valor de A1: '${cellA1Value}')`);
  console.log(`[ensureHeaders] Cabeçalhos esperados: ${JSON.stringify(headers)}`);

  if (!hasHeaders) {
    console.log(`[ensureHeaders] Inserindo cabeçalhos na aba '${sheet.getName()}'.`);
    
    // Insere os cabeçalhos
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    
    // --- Formatação dos Cabeçalhos ---
    const headerRowRange = sheet.getRange(1, 1, 1, headers.length);
    
    // Define estilo
    headerRowRange.setFontWeight('bold'); // Negrito
    headerRowRange.setBackground('#4285f4'); // Cor de fundo azul do Google (você pode mudar)
    headerRowRange.setFontColor('#ffffff'); // Cor da fonte branca
    // Opcional: Adicionar bordas
    headerRowRange.setBorder(true, true, true, true, true, true); // Superior, Esquerda, Inferior, Direita, Vertical, Horizontal
    
    SpreadsheetApp.flush();
    console.log(`[ensureHeaders] Cabeçalhos inseridos e formatados com sucesso.`);
  } else {
    console.log(`[ensureHeaders] Cabeçalhos já existem na aba '${sheet.getName()}'. Nenhuma ação necessária.`);
  }
}

/**
 * Função principal que recebe os dados do formulário via POST.
 * @param {GoogleAppsScript.Events.DoPost} e - Evento doPost.
 * @return {GoogleAppsScript.Content.TextOutput} Resposta HTTP.
 */
function doPost(e) {
  console.log('[doPost] Função doPost iniciada.');
  let lock;
  try {
    lock = LockService.getScriptLock();
    console.log('[doPost] Tentando adquirir lock...');
    const hasLock = lock.tryLock(30000);
    if (!hasLock) {
      throw new Error('Não foi possível adquirir o lock. Outra execução está em andamento.');
    }
    console.log('[doPost] Lock adquirido com sucesso.');

    console.log('[doPost] Conteúdo recebido:', e.postData.contents);
    const formData = JSON.parse(e.postData.contents);
    console.log('[doPost] Dados do formulário parseados:', JSON.stringify(formData, null, 2));

    const tipoVaga = formData.tipoVaga;
    console.log(`[doPost] Tipo de vaga determinado: ${tipoVaga}`);

    let folderId, spreadsheetId, sheetBaseName, emailNotificacao, headers, fileNamePrefix;

    if (tipoVaga === 'administrativo') {
      folderId = getFolderIdByName(CONFIG.pastaDriveAdmin);
      spreadsheetId = getSpreadsheetIdByName(CONFIG.planilhaAdmin);
      sheetBaseName = CONFIG.planilhaAdmin;
      emailNotificacao = CONFIG.emailNotificacaoAdmin;
      headers = ['Data/Hora Envio', 'Nome Completo', 'CPF', 'Telefone', 'Email', 'Endereço', 'Área de Interesse', 'Link do Currículo', 'Observações'];
      fileNamePrefix = 'Curriculo_Admin_';
    } else if (tipoVaga === 'docente') {
      folderId = getFolderIdByName(CONFIG.pastaDriveDocentes);
      spreadsheetId = getSpreadsheetIdByName(CONFIG.planilhaDocentes);
      sheetBaseName = CONFIG.planilhaDocentes;
      emailNotificacao = CONFIG.emailNotificacaoDocentes;
      headers = ['Data/Hora Envio', 'Nome Completo', 'CPF', 'Telefone', 'Email', 'Endereço', 'Área de Interesse', 'Link do Lattes', 'Link do Currículo', 'Observações'];
      fileNamePrefix = 'Curriculo_Docente_';
    } else {
       throw new Error(`Tipo de vaga inválido recebido: '${tipoVaga}'`);
    }

    if (!folderId) {
      throw new Error(`Pasta não encontrada para o tipo de vaga: ${tipoVaga}. Verifique o nome '${tipoVaga === 'administrativo' ? CONFIG.pastaDriveAdmin : CONFIG.pastaDriveDocentes}' no Google Drive.`);
    }
    if (!spreadsheetId) {
      throw new Error(`Planilha não encontrada para o tipo de vaga: ${tipoVaga}. Verifique o nome '${tipoVaga === 'administrativo' ? CONFIG.planilhaAdmin : CONFIG.planilhaDocentes}' no Google Drive.`);
    }

    console.log(`[doPost] IDs obtidos - Pasta: ${folderId}, Planilha: ${spreadsheetId}`);

    const ss = SpreadsheetApp.openById(spreadsheetId);
    console.log(`[doPost] Planilha aberta: ${ss.getName()}`);

    // --- Cria nome da aba com base APENAS NO ANO ---
    const currentYear = new Date().getFullYear().toString();
    const sheetName = currentYear; // Ex: 2025
    console.log(`[doPost] Nome da aba a ser usada/criada: ${sheetName}`);
    // --- Fim da criação do nome da aba ---

    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      console.log(`[doPost] Aba '${sheetName}' não encontrada. Criando nova aba.`);
      sheet = ss.insertSheet(sheetName);
      console.log(`[doPost] Nova aba '${sheetName}' criada.`);
      SpreadsheetApp.flush();
    } else {
       console.log(`[doPost] Aba '${sheetName}' encontrada.`);
    }

    // Garante que os cabeçalhos estejam presentes e formatados
    ensureHeaders(sheet, headers);

    // Trata o upload do arquivo
    let fileUrl = '';
    if (formData.arquivo && formData.arquivo.name && formData.arquivo.type && formData.arquivo.data) {
      console.log(`[doPost] Arquivo recebido: ${formData.arquivo.name}`);
      const folder = DriveApp.getFolderById(folderId);
      const base64Data = formData.arquivo.data.split(',')[1];
      if (!base64Data) {
          throw new Error('Dados do arquivo em formato Base64 inválidos.');
      }
      const decodedData = Utilities.base64Decode(base64Data);
      const blob = Utilities.newBlob(decodedData, formData.arquivo.type, formData.arquivo.name);

      const timestamp = new Date().getTime();
      const safeNome = (formData.nomeCompleto || 'Desconhecido').replace(/[^a-zA-Z0-9-_ ]/g, '_');
      const uniqueFileName = `${fileNamePrefix}${safeNome}_${timestamp}_${formData.arquivo.name}`;

      console.log(`[doPost] Criando arquivo no Drive com nome: ${uniqueFileName}`);
      const file = folder.createFile(blob);
      file.setName(uniqueFileName);
      fileUrl = file.getUrl();
      console.log(`[doPost] Arquivo criado com sucesso. URL: ${fileUrl}`);
    } else if(tipoVaga === 'docente') {
        console.error('[doPost] Erro: O upload do currículo é obrigatório para vagas docentes, mas nenhum arquivo foi recebido.');
        throw new Error('O upload do currículo é obrigatório para vagas docentes.');
    } else {
        console.log('[doPost] Nenhum arquivo recebido (ou não era obrigatório).');
    }

    // Prepara os dados para a planilha
    const timestamp = new Date();
    let rowData;
    if (tipoVaga === 'administrativo') {
      rowData = [
        timestamp,
        formData.nomeCompleto || '',
        formData.cpf || '',
        formData.telefone || '',
        formData.email || '',
        formData.endereco || '',
        (formData.areaInteresseAdmin || []).join(', '),
        fileUrl,
        formData.observacoesAdmin || ''
      ];
    } else if (tipoVaga === 'docente') {
      rowData = [
        timestamp,
        formData.nomeCompleto || '',
        formData.cpf || '',
        formData.telefone || '',
        formData.email || '',
        formData.endereco || '',
        (formData.areaInteresseDocente || []).join(', '),
        formData.linkLattes || '',
        fileUrl,
        formData.observacoesDocente || ''
      ];
    }
    console.log(`[doPost] Dados preparados para inserção na planilha: ${JSON.stringify(rowData)}`);

    // Adiciona os dados à planilha
    sheet.appendRow(rowData);
    SpreadsheetApp.flush();
    console.log('[doPost] Dados adicionados à planilha com sucesso.');

    // Envia email de notificação
    if (emailNotificacao) {
        const subject = `Nova Candidatura Recebida - ${tipoVaga.charAt(0).toUpperCase() + tipoVaga.slice(1)}`;
        let body = `Uma nova candidatura foi recebida para a vaga de ${tipoVaga}.\n\n`;
        body += `Nome: ${formData.nomeCompleto}\n`;
        body += `Email: ${formData.email}\n`;
        if(fileUrl) {
             body += `Currículo/Lattes: ${fileUrl}\n`;
        }
        body += `\nVerifique a aba "${sheetName}" da planilha "${ss.getName()}" para mais detalhes.`;

        console.log(`[doPost] Enviando email de notificação para ${emailNotificacao}`);
        MailApp.sendEmail(emailNotificacao, subject, body);
        console.log('[doPost] Email de notificação enviado com sucesso.');
    }

    lock.releaseLock();
    console.log('[doPost] Lock liberado.');

    console.log('[doPost] Processo concluído com sucesso. Retornando resposta.');
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'Formulário enviado com sucesso!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('[doPost] Erro durante a execução:', error.toString());
    console.error('[doPost] Stack trace:', error.stack);

    if (lock && lock.hasLock()) {
      try {
        lock.releaseLock();
        console.log('[doPost] Lock liberado após erro.');
      } catch (releaseError) {
        console.error('[doPost] Erro ao liberar o lock após falha principal:', releaseError.toString());
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função para implantar o Web App.
 */
function deployAsWebApp() {
  console.log("Lembre-se de implantar este script como um Web App!");
  console.log("Vá em 'Implantar' -> 'Novo implantação' -> 'Tipo de implantação: Web App'");
  console.log("Execute como: 'Minha conta' (ou conta do projeto)");
  console.log("Quem tem acesso: 'Qualquer um'");
}

/**
 * Função de teste para simular uma chamada ao doPost.
 */
function testFunction() {
  console.log("--- INICIANDO TESTE MANUAL ---");
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        tipoVaga: 'administrativo',
        nomeCompleto: 'Teste da Silva',
        cpf: '123.456.789-00',
        telefone: '(11) 99999-8888',
        email: 'teste@exemplo.com',
        endereco: 'Rua Exemplo, 123',
        areaInteresseAdmin: ['Secretaria', 'Financeiro'],
        observacoesAdmin: 'Observação de teste para vaga administrativa.',
        arquivo: {
          name: "teste.txt",
          type: "text/plain",
          data: "text/plain;base64,dGVzdGU="
        }
      })
    }
  };

  try {
    doPost(mockEvent);
    console.log("--- TESTE MANUAL CONCLUÍDO ---");
  } catch (e) {
    console.error("--- ERRO NO TESTE MANUAL ---", e.toString(), e.stack);
  }
}