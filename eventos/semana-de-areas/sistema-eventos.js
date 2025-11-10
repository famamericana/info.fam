/**
 * Sistema Automatizado de Eventos - Semana de Áreas
 * Arquivo único que gerencia todos os eventos automaticamente
 */

class SemanaDeAreas {
    constructor() {
        this.eventos = [];
        this.dataAtual = new Date();
        this.coresClasses = {
            'veterinaria': '#3eb288',
            'saudeum': '#45b7e5',
            'saudedois': '#199eae',
            'exatas': '#173e70',
            'direito': '#E93F3C',
            'educacao': '#5d378d',
            'comunicacao': '#e53888',
            'gestao': '#205c7e',
            'tec': '#79a744'
        };
    }

    // Analisa strings de data em vários formatos e retorna um Date
    parseDate(dateStr) {
        if (!dateStr) return null;
        if (dateStr instanceof Date) return dateStr;

        // YYYY-MM-DD (ISO-like) -> cria com timezone local garantindo hora 00:00
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            return new Date(dateStr + 'T00:00:00');
        }

        // DD-MM-YYYY -> construir manualmente
        if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
            const parts = dateStr.split('-').map(Number); // [DD, MM, YYYY]
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }

        // Tentativa genérica fallback
        const parsed = new Date(dateStr);
        if (!isNaN(parsed)) return parsed;
        return null;
    }

    /**
     * Carrega eventos do JSON
     */
    async carregarEventos() {
        try {
            // Adiciona timestamp para forçar recarregamento do JSON
            const timestamp = Date.now();
            const response = await fetch(`eventos-config.json?v=6.9`);
            const data = await response.json();
            this.eventos = data.eventos;
            
            // Sempre usa a data real do navegador
            this.dataAtual = new Date();
            
            return true;
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
            return false;
        }
    }

    /**
     * Organiza eventos: próximo, passados, por ano
     */
    organizarEventos() {
        // Normaliza a data atual para 00:00 para comparação justa
        const hoje = new Date(this.dataAtual);
        hoje.setHours(0, 0, 0, 0);
        
        const eventosOrdenados = [...this.eventos].sort((a, b) => 
            this.parseDate(a.dataInicio) - this.parseDate(b.dataInicio)
        );

        const resultado = {
            proximo: null,
            passados: [],
            porAno: {}
        };

        // Encontra o próximo evento (futuro) ou o atual
        for (const evento of eventosOrdenados) {
            const inicioEvento = this.parseDate(evento.dataInicio);
            const fimEvento = this.parseDate(evento.dataFim);
            
            // Se o evento ainda não começou ou está acontecendo agora
            if (inicioEvento >= hoje || (inicioEvento <= hoje && fimEvento >= hoje)) {
                if (!resultado.proximo) {
                    resultado.proximo = evento;
                }
            }
            // Se o evento já terminou
            else if (fimEvento < hoje) {
                resultado.passados.push(evento);
            }
        }

        // Se não há próximo evento, pega o mais recente dos passados
        if (!resultado.proximo && resultado.passados.length > 0) {
            // eventos.passados está em ordem ascendente (mais antigo -> mais recente),
            // então usamos pop() para obter o mais recente.
            resultado.proximo = resultado.passados.pop(); // Remove o final (mais recente)
        }

        // Inverte passados para ter os mais recentes primeiro
        resultado.passados.reverse();

        // Organiza por ano APENAS os eventos que já terminaram (passados),
        // excluindo o próximo evento e os 3 passados mostrados nos mini-containers.
        const eventosParaAccordion = this.eventos.filter(evento => {
            // Não inclui o evento próximo (comparação por nome + dataInicio)
            if (resultado.proximo && evento.nome === resultado.proximo.nome &&
                evento.dataInicio === resultado.proximo.dataInicio) {
                return false;
            }

            // Converte datas para comparação segura
            const inicioEvento = this.parseDate(evento.dataInicio);
            const fimEvento = this.parseDate(evento.dataFim);

            // Excluir eventos que ainda não terminaram (ou seja, futuros ou em andamento)
            if (!fimEvento || fimEvento >= hoje) {
                return false;
            }

            // Não inclui os 3 eventos mais recentes que estão nos mini-containers
            const eventosPassadosNomes = resultado.passados.slice(0, 3).map(e =>
                `${e.nome}-${e.dataInicio}-${e.ano}`);
            const eventoAtualId = `${evento.nome}-${evento.dataInicio}-${evento.ano}`;

            return !eventosPassadosNomes.includes(eventoAtualId);
        });

        // Agora organiza por ano apenas os eventos filtrados
        eventosParaAccordion.forEach(evento => {
            if (!resultado.porAno[evento.ano]) {
                resultado.porAno[evento.ano] = [];
            }
            resultado.porAno[evento.ano].push(evento);
        });

        return resultado;
    }

    /**
     * Formata período de datas
     */
    formatarPeriodo(dataInicio, dataFim) {
    const inicio = this.parseDate(dataInicio);
    const fim = this.parseDate(dataFim);
        
    const diaInicio = inicio.getDate().toString().padStart(2, '0');
    const diaFim = fim.getDate().toString().padStart(2, '0');
        
        const meses = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];
        
        const mesNome = meses[inicio.getMonth()];
        
        // calcula diferença em dias inteiros entre as datas
        const diffDays = Math.round((fim - inicio) / (1000 * 60 * 60 * 24));

        const diasFormatados = diaInicio === diaFim
            ? diaInicio
            : (diffDays === 1 ? `${diaInicio} e ${diaFim}` : `${diaInicio} a ${diaFim}`);

        return {
            dias: diasFormatados,
            mes: `de ${mesNome}`
        };
    }

    /**
     * Atualiza o evento principal na página
     */
    atualizarEventoPrincipal(evento) {
        if (!evento) return;

        const periodo = this.formatarPeriodo(evento.dataInicio, evento.dataFim);
        
        // Determina se é "Próxima Semana", "Semana atual" ou "Última Semana"
        // Normaliza a data atual para 00:00 para comparação justa
        const hoje = new Date(this.dataAtual);
        hoje.setHours(0, 0, 0, 0);
        
        const inicioEvento = this.parseDate(evento.dataInicio);
        const fimEvento = this.parseDate(evento.dataFim);

        let titulo = "Última Semana";

        // Se a data atual estiver dentro do período do evento (inclusive)
        if (inicioEvento && fimEvento && inicioEvento <= hoje && fimEvento >= hoje) {
            titulo = "Semana atual";
        } else if (inicioEvento && inicioEvento > hoje) {
            titulo = "Próxima Semana";
        }
      
        
        // Atualiza título
        const tituloElemento = document.querySelector('.eventoatualtitulo2');
        if (tituloElemento) {
            tituloElemento.textContent = titulo;
        }

        // Atualiza nome do evento (não aplicar classe de área no texto para não alterar a cor)
        const nomeElemento = document.querySelector('.qualsemana') || document.querySelector('.div5');
        if (nomeElemento) {
            nomeElemento.textContent = evento.nome;
            // garantir que o elemento mantenha a classe de posicionamento 'div5' e a classe base 'qualsemana'
            nomeElemento.className = 'div5 qualsemana';
        }

        // Atualiza datas
        const elementoDias = document.querySelector('.dias');
        const elementoMes = document.querySelector('.mes');
        
        if (elementoDias) {
            elementoDias.innerHTML = `<i class="fa-regular fa-calendar"></i> ${periodo.dias}`;
        }
        
        if (elementoMes) {
            elementoMes.innerHTML = `<i class="fa-regular fa-calendar"></i> ${periodo.mes}`;
        }

        // Atualiza descrição
        const descricaoElemento = document.querySelector('.texto-descricao p');
        if (descricaoElemento) {
            descricaoElemento.innerHTML = `${evento.descricao}<span class="seta"></span>`;
        }

        // Atualiza link
        const linkElemento = document.querySelector('.btn2');
        if (linkElemento) {
            linkElemento.href = evento.link;
        }

        // Atualiza cor do tema (aplicada ao background do container, não ao texto)
        const corEvento = this.coresClasses[evento.classe] || '#000000';
        document.documentElement.style.setProperty('--cordoeventoatual', corEvento);
        const containerEvento = document.querySelector('.eventoatual');
        if (containerEvento) {
            containerEvento.style.backgroundColor = corEvento;
        }
    }

    /**
     * Atualiza eventos passados
     */
    atualizarEventosPassados(eventos) {
        const container = document.querySelector('.eventospassados');
        if (!container) return;

        container.innerHTML = '';
        
        // Pega os 3 mais recentes
        const eventosRecentes = eventos.slice(0, 3);
        
        eventosRecentes.forEach((evento, index) => {
            const div = document.createElement('div');
            div.className = `mini-container evento-${index + 1}`;
            const corEvento = this.coresClasses[evento.classe] || '#000000';
            div.style.backgroundColor = corEvento;
            
            div.innerHTML = `
                <h1>${evento.nome}</h1>
                <a target="_blank" href="${evento.link}" class="btn">Ver evento</a>
            `;
            
            container.appendChild(div);
        });
    }

    /**
     * Atualiza accordion por ano
     */
    atualizarAccordion(eventosPorAno) {
        const accordion = document.querySelector('.accordion');
        if (!accordion) return;

        // Remove tabs existentes (exceto botão fechar)
        const tabsExistentes = accordion.querySelectorAll('.tab:not(:last-child)');
        tabsExistentes.forEach(tab => tab.remove());

        // Ordena anos (mais recente primeiro)
        const anos = Object.keys(eventosPorAno).sort((a, b) => b - a);

        anos.forEach((ano, index) => {
            const eventos = eventosPorAno[ano];
            
            // Ordena eventos do ano por data
            eventos.sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio));
            
            const tab = document.createElement('div');
            tab.className = 'tab';
            
            const radioId = `rd${index + 1}`;
            
            tab.innerHTML = `
                <input type="radio" name="accordion-2" id="${radioId}">
                <label for="${radioId}" class="tab__label">
                    <h3>${ano}</h3>
                </label>
                <div class="tab__content">
                    <div class="content">
                        ${eventos.map(evento => {
                            const dataInicio = this.parseDate(evento.dataInicio);
                            const dataFim = this.parseDate(evento.dataFim);
                            const mesInicio = dataInicio.toLocaleDateString('pt-BR', { month: 'long' });
                            const mesFim = dataFim.toLocaleDateString('pt-BR', { month: 'long' });
                            const diaInicio = dataInicio.getDate();
                            const diaFim = dataFim.getDate();
                            const diffDias = Math.round((dataFim - dataInicio) / (1000 * 60 * 60 * 24));

                            let periodo;
                            if (dataInicio.getMonth() !== dataFim.getMonth()) {
                                periodo = `${mesInicio} ${diaInicio} a ${mesFim} ${diaFim}`;
                            } else if (diaInicio === diaFim) {
                                periodo = `${mesInicio} ${diaInicio}`;
                            } else if (diffDias === 1) {
                                periodo = `${mesInicio} ${diaInicio} e ${diaFim}`;
                            } else {
                                periodo = `${mesInicio} ${diaInicio} a ${diaFim}`;
                            }

                            return `<a target="_blank" href="${evento.link}">${periodo} | ${evento.nome}</a>`;
                        }).join('')}
                    </div>
                </div>
            `;
            
            // Insere antes do botão fechar
            const botaoFechar = accordion.querySelector('.tab:last-child');
            accordion.insertBefore(tab, botaoFechar);
        });

        // Reaplica event listeners
        this.configurarAccordion();
    }

    /**
     * Configura funcionamento do accordion
     */
    configurarAccordion() {
        document.querySelectorAll('.accordion input[type="radio"]').forEach(input => {
            input.addEventListener('change', function() {
                document.querySelectorAll('.tab__content').forEach(content => {
                    content.style.maxHeight = '0';
                });

                if (this.checked) {
                    const content = this.nextElementSibling.nextElementSibling;
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }

    /**
     * Inicializa todo o sistema
     */
    async inicializar() {
        const sucesso = await this.carregarEventos();
        if (!sucesso) {
            console.error('Falha ao carregar eventos');
            return;
        }

        const eventosOrganizados = this.organizarEventos();

  
        // Atualiza a página
        this.atualizarEventoPrincipal(eventosOrganizados.proximo);
        this.atualizarEventosPassados(eventosOrganizados.passados);
        this.atualizarAccordion(eventosOrganizados.porAno);

        // Disponibiliza para debugging (opcional)
        window.semanaDeAreas = this;
    }

}

// Inicialização automática
document.addEventListener('DOMContentLoaded', async function() {
    const sistema = new SemanaDeAreas();
    await sistema.inicializar();
});
