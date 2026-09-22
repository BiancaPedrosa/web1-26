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

        container.appendChild(card);
    });
}

criarCardapio();