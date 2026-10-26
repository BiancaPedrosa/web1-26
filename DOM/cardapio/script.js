const produtos = [
    {
        nome: "Hambúrguer Clássico",
        descricao: "Pão, hambúrguer de 150g, queijo cheddar, alface e tomate.",
        preco: 25.00
    },
    {
        nome: "Pizza Margherita",
        descricao: "Mussarela, tomate, manjericão fresco e azeite.",
        preco: 45.50
    },
    {
        nome: "Salada Caesar",
        descricao: "Mix de folhas, frango grelhado, croutons e molho caesar.",
        preco: 32.75
    },
    {
        nome: "Filé Mignon ao Molho Madeira",
        descricao: "Acompanhado de arroz à piamontese e batata rústica.",
        preco: 75.00
    },
    {
        nome: "Brownie com Sorvete",
        descricao: "Brownie de chocolate meio amargo com uma bola de sorvete de creme.",
        preco: 18.00
    }
];

function criarCardapio() {
    const container = document.getElementById('cardapio-container');

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('produto-card');

        card.innerHTML = `
            <h2>${produto.nome}</h2>
            <p>${produto.descricao}</p>
            <div class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
        `;

        const botao = document.createElement('button');
        botao.classList.add('btn-adicionar');
        botao.textContent = 'Adicionar';
        botao.addEventListener('click', () => {
            adicionarAoCarrinho(produto);
        });
        card.appendChild(botao);

        container.appendChild(card);
    });
}

const carrinho = [];

function formatarPreco(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

function adicionarAoCarrinho(produto) {
    const item = carrinho.find(item => item.nome === produto.nome);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ nome: produto.nome, preco: produto.preco, quantidade: 1 });
    }

    atualizarCarrinho();
}

function removerDoCarrinho(nome) {
    const indice = carrinho.findIndex(item => item.nome === nome);

    if (carrinho[indice].quantidade > 1) {
        carrinho[indice].quantidade--;
    } else {
        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('carrinho-lista');
    const vazio = document.getElementById('carrinho-vazio');
    const total = document.getElementById('carrinho-total');

    lista.innerHTML = '';
    let soma = 0;

    carrinho.forEach(item => {
        const li = document.createElement('li');

        const texto = document.createElement('span');
        texto.textContent = `${item.quantidade}x ${item.nome} - ${formatarPreco(item.preco * item.quantidade)}`;

        const botaoRemover = document.createElement('button');
        botaoRemover.classList.add('btn-remover');
        botaoRemover.textContent = 'Remover';
        botaoRemover.addEventListener('click', () => {
            removerDoCarrinho(item.nome);
        });

        li.appendChild(texto);
        li.appendChild(botaoRemover);
        lista.appendChild(li);

        soma += item.preco * item.quantidade;
    });

    vazio.style.display = carrinho.length === 0 ? 'block' : 'none';
    total.textContent = `Total: ${formatarPreco(soma)}`;
}

criarCardapio();