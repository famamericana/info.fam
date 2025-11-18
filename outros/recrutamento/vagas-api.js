/**
 * Cliente API para consumir vagas do servidor PHP
 * Site: info.fam/recrutamento
 * API: famamericana.com.br/recrutamento/api
 */

const API_CONFIG = {
    // URL base da API - AJUSTE PARA O DOMÍNIO CORRETO
    baseURL: 'https://famamericana.com.br/recrutamento/api',
    // Timeout em milissegundos
    timeout: 10000
};

/**
 * Cliente HTTP para fazer requisições à API
 */
class VagasAPI {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
    }

    /**
     * Buscar todas as vagas ativas
     */
    async listarVagas() {
        try {
            const response = await fetch(`${this.baseURL}/vagas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                return data.vagas;
            } else {
                throw new Error('Resposta da API inválida');
            }
        } catch (error) {
            console.error('Erro ao buscar vagas:', error);
            return [];
        }
    }

    /**
     * Filtrar vagas por tipo
     * @param {string} tipo - 'administrativo' ou 'docente'
     */
    async listarVagasPorTipo(tipo) {
        const vagas = await this.listarVagas();
        return vagas.filter(vaga => vaga.tipo === tipo);
    }
}

/**
 * Renderizador de vagas na página
 */
class VagasRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.api = new VagasAPI();
    }

    /**
     * Criar HTML de uma vaga
     */
    criarCardVaga(vaga) {
        const tipoBadge = vaga.tipo === 'docente' ? 
            '<span class="vaga-tipo-badge docente">Docente</span>' : 
            '<span class="vaga-tipo-badge administrativo">Administrativo</span>';

        return `
            <div class="vaga-card" data-vaga-id="${vaga.id}">
                <div class="vaga-header">
                    <h3 class="vaga-titulo">${this.escapeHtml(vaga.titulo)}</h3>
                    <div class="vaga-badges">
                        ${tipoBadge}
                    </div>
                </div>
                
                <div class="vaga-body">
                    <p class="vaga-descricao">${this.escapeHtml(vaga.descricao)}</p>
                    
                    ${vaga.requisitos ? `
                        <div class="vaga-section">
                            <h4>Requisitos:</h4>
                            <p>${this.formatarTexto(vaga.requisitos)}</p>
                        </div>
                    ` : ''}
                    
                    ${vaga.diferenciais ? `
                        <div class="vaga-section">
                            <h4>Diferenciais:</h4>
                            <p>${this.formatarTexto(vaga.diferenciais)}</p>
                        </div>
                    ` : ''}
                    
                    <div class="vaga-info-grid">
                        ${vaga.regime ? `<div class="vaga-info-item"><strong>Regime:</strong> ${this.escapeHtml(vaga.regime)}</div>` : ''}
                        ${vaga.jornada ? `<div class="vaga-info-item"><strong>Jornada:</strong> ${this.escapeHtml(vaga.jornada)}</div>` : ''}
                        ${vaga.local ? `<div class="vaga-info-item"><strong>Local:</strong> ${this.escapeHtml(vaga.local)}</div>` : ''}
                        ${vaga.salario ? `<div class="vaga-info-item"><strong>Salário:</strong> ${this.escapeHtml(vaga.salario)}</div>` : ''}
                    </div>
                    
                    ${vaga.publicado_em ? `<p class="vaga-data">Publicado em: ${vaga.publicado_em}</p>` : ''}
                </div>
                
                <div class="vaga-footer">
                    <a href="#formularioCandidatura" class="btn2 vaga-candidatar-btn" onclick="preencherTipoVaga('${vaga.tipo}')">
                        Candidatar-se
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Escape HTML para prevenir XSS
     */
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Formatar texto com quebras de linha
     */
    formatarTexto(text) {
        if (!text) return '';
        return this.escapeHtml(text).replace(/\n/g, '<br>');
    }

    /**
     * Renderizar todas as vagas
     */
    async renderizar() {
        if (!this.container) {
            console.error('Container de vagas não encontrado');
            return;
        }

        // Mostrar loading
        this.container.innerHTML = '<div class="vagas-loading">Carregando vagas disponíveis...</div>';

        try {
            const vagas = await this.api.listarVagas();

            if (vagas.length === 0) {
                this.container.innerHTML = `
                    <div class="vagas-vazio">
                        <p>No momento não há vagas disponíveis.</p>
                        <p>Mas você pode enviar seu currículo mesmo assim! Mantemos um banco de talentos e entraremos em contato quando surgir uma oportunidade que combine com seu perfil.</p>
                    </div>
                `;
                return;
            }

            let html = '';
            html += '<div class="vagas-secao">';
            html += '<h2 class="vagas-secao-titulo">Vagas Disponíveis</h2>';
            html += '<div class="vagas-grid">';
            vagas.forEach(vaga => {
                html += this.criarCardVaga(vaga);
            });
            html += '</div></div>';

            this.container.innerHTML = html;

        } catch (error) {
            console.error('Erro ao renderizar vagas:', error);
            this.container.innerHTML = `
                <div class="vagas-erro">
                    <p>Não foi possível carregar as vagas no momento.</p>
                    <p>Por favor, tente novamente mais tarde ou envie seu currículo através do formulário abaixo.</p>
                    <button class="btn2" onclick="location.reload()">Tentar Novamente</button>
                </div>
            `;
        }
    }

    /**
     * Renderizar vagas filtradas por tipo
     */
    async renderizarPorTipo(tipo) {
        const vagas = await this.api.listarVagasPorTipo(tipo);
        // Implementar lógica similar ao renderizar()
    }
}

/**
 * Função auxiliar para preencher o tipo de vaga no formulário
 */
function preencherTipoVaga(tipo) {
    const selectTipo = document.getElementById('tipoVaga');
    if (selectTipo) {
        selectTipo.value = tipo;
        // Disparar evento change para mostrar os campos corretos
        selectTipo.dispatchEvent(new Event('change'));
    }
}

/**
 * Inicializar quando a página carregar
 */
document.addEventListener('DOMContentLoaded', function() {
    // Criar container para vagas se não existir
    const formSection = document.getElementById('formularioCandidatura');
    if (formSection && !document.getElementById('vagas-disponiveis')) {
        const vagasContainer = document.createElement('section');
        vagasContainer.id = 'vagas-disponiveis';
        vagasContainer.className = 'vagas-section';
        
        // Inserir antes do formulário
        formSection.parentNode.insertBefore(vagasContainer, formSection);
    }

    // Inicializar e renderizar vagas
    const renderer = new VagasRenderer('vagas-disponiveis');
    renderer.renderizar();

    // Atualizar a cada 5 minutos
    setInterval(() => {
        renderer.renderizar();
    }, 5 * 60 * 1000);
});
