const BORDA = 8;
const REFRIGERANTE = 10;
const SOBREMESA = 12;

function calcularPedido() {

    let quantidade = Number(document.getElementById("quantidade").value);

    if (quantidade <= 0) {
        alert("Informe a quantidade de pizzas.");
        return;
    }

    let tamanho = document.querySelector('input[name="tamanho"]:checked');

    if (!tamanho) {
        alert("Escolha um tamanho.");
        return;
    }

    let total = quantidade * Number(tamanho.value);

    if (document.querySelectorAll(".adicional")[0].checked) {
        total += BORDA;
    }

    if (document.querySelectorAll(".adicional")[1].checked) {
        total += REFRIGERANTE;
    }

    if (document.querySelectorAll(".adicional")[2].checked) {
        total += SOBREMESA;
    }

    document.getElementById("resultado").innerHTML =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function limparResultado() {
    document.getElementById("resultado").innerHTML = "Total: R$ 0,00";
}
