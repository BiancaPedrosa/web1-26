const listaDisponiveis = document.querySelector('#disponiveis');
const listaSelecionados = document.querySelector('#selecionados');

// Função para mover o item
function moverItem(event) {
    const itemClicado = event.target;

    // Garante que clicamos em um LI
    if (itemClicado.tagName === 'LI') {
        const destino = itemClicado.parentElement.id === 'disponiveis' 
                        ? listaSelecionados 
                        : listaDisponiveis;
        
        
        // O método appendChild remove do local antigo e insere no novo automaticamente
        destino.appendChild(itemClicado);

    }
}

// Adicionando ouvintes de eventos
listaDisponiveis.addEventListener('click', moverItem);
listaSelecionados.addEventListener('click', moverItem);