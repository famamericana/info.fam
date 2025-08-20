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

    /**
     * Carrega eventos do JSON
     */
    async carregarEventos() {
        try {
            const response = await fetch('eventos-config.json');
            const data = await response.json();
            this.eventos = data.eventos;
            
            // Usar data atual do arquivo se especificada (para testes)
            if (data.configuracoes && data.configuracoes.dataAtual) {
                this.dataAtual = new Date(data.configuracoes.dataAtual);
            }
            
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
        const hoje = this.dataAtual;
        const eventosOrdenados = [...this.eventos].sort((a, b) => 
            new Date(a.dataInicio) - new Date(b.dataInicio)
        );

        const resultado = {
            proximo: null,
            passados: [],
            porAno: {}
        };

        // Encontra o próximo evento (futuro) ou o atual
        for (const evento of eventosOrdenados) {
            const inicioEvento = new Date(evento.dataInicio);
            const fimEvento = new Date(evento.dataFim);
            
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
            resultado.proximo = resultado.passados.shift(); // Remove do início dos passados
        }

        // Inverte passados para ter os mais recentes primeiro
        resultado.passados.reverse();

        // Organiza por ano APENAS os eventos que não estão em "passados" nem como "próximo"
        const eventosParaAccordion = this.eventos.filter(evento => {
            // Não inclui o evento próximo
            if (resultado.proximo && evento.nome === resultado.proximo.nome && 
                evento.dataInicio === resultado.proximo.dataInicio) {
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
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        
        const diaInicio = inicio.getDate().toString().padStart(2, '0');
        const diaFim = fim.getDate().toString().padStart(2, '0');
        
        const meses = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];
        
        const mesNome = meses[inicio.getMonth()];
        
        return {
            dias: diaInicio === diaFim ? diaInicio : `${diaInicio} a ${diaFim}`,
            mes: `de ${mesNome}`
        };
    }

    /**
     * Atualiza o evento principal na página
     */
    atualizarEventoPrincipal(evento) {
        if (!evento) return;

        const periodo = this.formatarPeriodo(evento.dataInicio, evento.dataFim);
        
        // Determina se é "Próxima Semana" ou "Última Semana"
        const hoje = this.dataAtual;
        const inicioEvento = new Date(evento.dataInicio);
        const titulo = inicioEvento > hoje ? "Próxima Semana" : "Última Semana";
        
        // Atualiza título
        const tituloElemento = document.querySelector('.eventoatualtitulo2');
        if (tituloElemento) {
            tituloElemento.textContent = titulo;
        }

        // Atualiza nome do evento
        const nomeElemento = document.querySelector('.qualsemana');
        if (nomeElemento) {
            nomeElemento.textContent = evento.nome;
            nomeElemento.className = `qualsemana ${evento.classe}`;
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

        // Atualiza cor do tema
        const corEvento = this.coresClasses[evento.classe] || '#000000';
        document.documentElement.style.setProperty('--cordoeventoatual', corEvento);
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
                            const dataInicio = new Date(evento.dataInicio);
                            const dataFim = new Date(evento.dataFim);
                            const mes = dataInicio.toLocaleDateString('pt-BR', { month: 'long' });
                            const dia = dataInicio.getDate();
                            const diaFim = dataFim.getDate();
                            
                            const periodo = dia === diaFim ? 
                                `${mes} ${dia}` : 
                                `${mes} ${dia} a ${diaFim}`;
                                
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
        console.log('🎯 Iniciando Sistema de Semana de Áreas...');
        
        const sucesso = await this.carregarEventos();
        if (!sucesso) {
            console.error('❌ Falha ao carregar eventos');
            return;
        }

        const eventosOrganizados = this.organizarEventos();
        
        console.log('📅 Eventos organizados:', {
            proximo: eventosOrganizados.proximo?.nome,
            totalPassados: eventosOrganizados.passados.length,
            anos: Object.keys(eventosOrganizados.porAno)
        });

        // Atualiza a página
        this.atualizarEventoPrincipal(eventosOrganizados.proximo);
        this.atualizarEventosPassados(eventosOrganizados.passados);
        this.atualizarAccordion(eventosOrganizados.porAno);

        console.log('✅ Sistema inicializado com sucesso!');
        
        // Disponibiliza para debugging
        window.semanaDeAreas = this;
    }

    /**
     * Método para adicionar novo evento facilmente
     */
    adicionarEvento({nome, dataInicio, dataFim, descricao, area, ano}) {
        const novoEvento = {
            nome,
            dataInicio,
            dataFim,
            descricao,
            link: `https://info.fam.br/eventos/semana-de-areas/${ano}/${nome.toLowerCase().replace(/\s+/g, '-')}`,
            ano: parseInt(ano),
            classe: area
        };

        console.log('📝 Novo evento criado:');
        console.log('Copie e cole no eventos-config.json:');
        console.log(JSON.stringify(novoEvento, null, 2));
        
        return novoEvento;
    }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', async function() {
    const sistema = new SemanaDeAreas();
    await sistema.inicializar();
});

// Para adicionar novos eventos via console:
// semanaDeAreas.adicionarEvento({
//     nome: "Nome do Evento",
//     dataInicio: "2025-MM-DD", 
//     dataFim: "2025-MM-DD",
//     descricao: "Descrição...",
//     area: "direito", // ou outra área
//     ano: 2025
// });
