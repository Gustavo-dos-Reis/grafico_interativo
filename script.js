document.addEventListener('DOMContentLoaded', function() {
    const grafico = document.getElementById('grafico');
    const eixoY = document.getElementById('eixo-y');
    const eixoX = document.getElementById('eixo-x');
    const nomeInput = document.getElementById('nome-dado');
    const valorInput = document.getElementById('valor-dado');
    const adicionarBtn = document.getElementById('adicionar-btn');
    const limparBtn = document.getElementById('limpar-btn');
    const aleatorioBtn = document.getElementById('aleatorio-btn');
    
    let dados = [];
    let valorMaximo = 10;
    
    // Inicializa o gráfico
    function iniciarGrafico() {
        atualizarEixoY();
        renderizarGrafico();
    }
    
    // Adiciona novo dado
    function adicionarDado() {
        const nome = nomeInput.value.trim();
        const valor = parseFloat(valorInput.value);
        
        if (!nome || isNaN(valor) || valor <= 0) {
            alert('Por favor, preencha um nome e um valor válido!');
            return;
        }
        
        dados.push({
            nome,
            valor,
            id: Date.now()
        });
        
        // Atualiza valor máximo
        valorMaximo = Math.max(valorMaximo, valor);
        
        // Limpa inputs
        nomeInput.value = '';
        valorInput.value = '';
        nomeInput.focus();
        
        // Atualiza gráfico
        atualizarEixoY();
        renderizarGrafico();
    }
    
    // Gera dados aleatórios
    function gerarDadosAleatorios() {
        const nomes = ['Maçãs', 'Laranjas', 'Bananas', 'Uvas', 'Pêras', 'Morangos', 'Abacaxis'];
        const qtd = Math.floor(Math.random() * 5) + 3; // 3-7 itens
        
        dados = [];
        valorMaximo = 10;
        
        for (let i = 0; i < qtd; i++) {
            const nome = nomes[Math.floor(Math.random() * nomes.length)];
            const valor = Math.floor(Math.random() * 90) + 10; // 10-100
            
            dados.push({
                nome,
                valor,
                id: Date.now() + i
            });
            
            valorMaximo = Math.max(valorMaximo, valor);
        }
        
        atualizarEixoY();
        renderizarGrafico();
    }
    
    // Limpa o gráfico
    function limparGrafico() {
        if (dados.length === 0) return;
        
        if (confirm('Tem certeza que deseja limpar todos os dados?')) {
            dados = [];
            valorMaximo = 10;
            atualizarEixoY();
            renderizarGrafico();
        }
    }
    
    // Atualiza eixo Y com valores
    function atualizarEixoY() {
        eixoY.innerHTML = '';
        
        // Cria 5 marcadores no eixo Y
        const qtdMarcadores = 5;
        for (let i = 0; i <= qtdMarcadores; i++) {
            const valor = Math.round((valorMaximo * i) / qtdMarcadores);
            const marcador = document.createElement('div');
            marcador.textContent = valor;
            marcador.style.position = 'absolute';
            marcador.style.bottom = `${(i / qtdMarcadores) * 100}%`;
            marcador.style.transform = 'translateY(50%)';
            eixoY.appendChild(marcador);
        }
    }
    
    // Renderiza as barras do gráfico
    function renderizarGrafico() {
        grafico.innerHTML = '';
        eixoX.innerHTML = '';
        
        if (dados.length === 0) {
            grafico.innerHTML = '<p class="sem-dados">Adicione dados para ver o gráfico</p>';
            return;
        }
        
        dados.forEach(dado => {
            // Container da barra
            const container = document.createElement('div');
            container.className = 'barra-container';
            
            // Cria a barra
            const barra = document.createElement('div');
            barra.className = 'barra';
            barra.style.height = `${(dado.valor / valorMaximo) * 100}%`;
            barra.dataset.id = dado.id;
            
            // Valor no topo da barra
            const valor = document.createElement('div');
            valor.className = 'barra-valor';
            valor.textContent = dado.valor;
            
            // Rótulo no eixo X
            const rotulo = document.createElement('div');
            rotulo.className = 'barra-rotulo';
            rotulo.textContent = dado.nome;
            
            // Eventos da barra
            barra.addEventListener('click', function() {
                document.querySelectorAll('.barra').forEach(b => b.classList.remove('ativa'));
                this.classList.add('ativa');
            });
            
            // Monta a estrutura
            barra.appendChild(valor);
            container.appendChild(barra);
            container.appendChild(rotulo);
            grafico.appendChild(container);
            
            // Adiciona rótulo no eixo X
            const rotuloEixoX = document.createElement('div');
            rotuloEixoX.textContent = dado.nome;
            eixoX.appendChild(rotuloEixoX);
        });
    }
    
    // Event Listeners
    adicionarBtn.addEventListener('click', adicionarDado);
    valorInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') adicionarDado();
    });
    
    limparBtn.addEventListener('click', limparGrafico);
    aleatorioBtn.addEventListener('click', gerarDadosAleatorios);
    
    // Inicia o gráfico
    iniciarGrafico();
});