class GraficoInterativo {
    constructor() {
        this.grafico = document.getElementById('grafico');
        this.eixoY = document.getElementById('eixo-y');
        this.eixoX = document.getElementById('eixo-x');
        this.mensagemVazio = document.getElementById('mensagem-vazio');
        this.nomeInput = document.getElementById('nome-dado');
        this.valorInput = document.getElementById('valor-dado');
        
        this.dados = [];
        this.valorMaximo = 10;
        
        this.iniciar();
    }
    
    iniciar() {
        this.configurarEventos();
        this.atualizarVisualizacao();
    }
    
    configurarEventos() {
        document.getElementById('adicionar-btn').addEventListener('click', () => this.adicionarDado());
        this.valorInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.adicionarDado();
        });
        
        document.getElementById('limpar-btn').addEventListener('click', () => this.limparDados());
    }
    
    adicionarDado() {
        const nome = this.nomeInput.value.trim();
        const valor = parseFloat(this.valorInput.value);
        
        if (!this.validarEntrada(nome, valor)) {
            this.mostrarErro('Por favor, preencha um nome e um valor válido (maior que zero)');
            return;
        }
        
        this.dados.push({
            id: Date.now(),
            nome,
            valor
        });
        
        this.atualizarValorMaximo(valor);
        this.limparCampos();
        this.atualizarVisualizacao();
    }
    
    validarEntrada(nome, valor) {
        return nome && !isNaN(valor) && valor > 0;
    }
    
    mostrarErro(mensagem) {
        alert(mensagem);
        this.valorInput.focus();
    }
    
    atualizarValorMaximo(valor) {
        this.valorMaximo = Math.max(this.valorMaximo, valor);
    }
    
    limparCampos() {
        this.nomeInput.value = '';
        this.valorInput.value = '';
        this.nomeInput.focus();
    }
    
    limparDados() {
        if (this.dados.length === 0) return;
        
        if (confirm('Tem certeza que deseja remover todos os dados?')) {
            this.dados = [];
            this.valorMaximo = 10;
            this.atualizarVisualizacao();
        }
    }
    
    atualizarVisualizacao() {
        this.atualizarEixoY();
        this.renderizarGrafico();
        this.atualizarMensagemVazio();
    }
    
    atualizarEixoY() {
        this.eixoY.innerHTML = '';
        const qtdMarcadores = 5;
        
        for (let i = 0; i <= qtdMarcadores; i++) {
            const valor = Math.round((this.valorMaximo * i) / qtdMarcadores);
            const marcador = document.createElement('div');
            marcador.textContent = valor.toLocaleString();
            marcador.style.bottom = `${(i / qtdMarcadores) * 100}%`;
            this.eixoY.appendChild(marcador);
        }
    }
    
    renderizarGrafico() {
        this.grafico.innerHTML = '';
        this.eixoX.innerHTML = '';
        
        this.dados.forEach(dado => {
            this.criarBarra(dado);
            this.criarRotuloEixoX(dado.nome);
        });
    }
    
    criarBarra(dado) {
        const container = document.createElement('div');
        container.className = 'barra-container';
        
        const barra = document.createElement('div');
        barra.className = 'barra';
        barra.style.height = `${(dado.valor / this.valorMaximo) * 100}%`;
        barra.dataset.id = dado.id;
        
        const valor = document.createElement('div');
        valor.className = 'barra-valor';
        valor.textContent = dado.valor.toLocaleString();
        
        const rotulo = document.createElement('div');
        rotulo.className = 'barra-rotulo';
        rotulo.textContent = dado.nome;
        
        barra.addEventListener('click', () => {
            document.querySelectorAll('.barra').forEach(b => b.classList.remove('ativa'));
            barra.classList.add('ativa');
        });
        
        barra.appendChild(valor);
        container.appendChild(barra);
        container.appendChild(rotulo);
        this.grafico.appendChild(container);
    }
    
    criarRotuloEixoX(nome) {
        const rotulo = document.createElement('div');
        rotulo.textContent = nome;
        this.eixoX.appendChild(rotulo);
    }
    
    atualizarMensagemVazio() {
        this.mensagemVazio.style.display = this.dados.length === 0 ? 'block' : 'none';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new GraficoInterativo();
});