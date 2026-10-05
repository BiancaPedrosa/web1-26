// Array que guarda todos os pacientes cadastrados.
// Cada paciente é um objeto: { nome, peso, altura, imc }
const pacientes = [];

// Guarda o índice do paciente que está sendo editado no momento.
// Enquanto for "null", o formulário está em modo de CADASTRO.
let indiceEmEdicao = null;

// Referências aos elementos do formulário e da tabela
const formPaciente = document.getElementById("formPaciente");
const inputNome = document.getElementById("inputNome");
const inputPeso = document.getElementById("inputPeso");
const inputAltura = document.getElementById("inputAltura");
const btnEnviar = document.getElementById("btnEnviar");
const corpoTabela = document.getElementById("corpoTabela");

// Evento disparado ao clicar em "Cadastrar" / "Salvar edição"
formPaciente.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a página de recarregar

  const nome = inputNome.value;
  const peso = parseFloat(inputPeso.value);
  const altura = parseFloat(inputAltura.value);
  const imc = calcularIMC(peso, altura);

  if (indiceEmEdicao === null) {
    // MODO CADASTRO: cria um paciente novo e adiciona no array
    const paciente = { nome: nome, peso: peso, altura: altura, imc: imc };
    pacientes.push(paciente);
  } else {
    // MODO EDIÇÃO: atualiza o paciente que já existe no array,
    // sem criar um item novo (sem duplicar)
    pacientes[indiceEmEdicao] = { nome: nome, peso: peso, altura: altura, imc: imc };
    indiceEmEdicao = null;
    btnEnviar.textContent = "Cadastrar";
  }

  formPaciente.reset();
  renderizarTabela();
});

// Calcula o IMC: peso dividido pela altura ao quadrado
function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  return imc.toFixed(2); // arredonda para 2 casas decimais
}

// Preenche o formulário com os dados do paciente escolhido para editar
function editar(index) {
  const paciente = pacientes[index];

  inputNome.value = paciente.nome;
  inputPeso.value = paciente.peso;
  inputAltura.value = paciente.altura;

  indiceEmEdicao = index;
  btnEnviar.textContent = "Salvar edição";
}

// Remove o paciente do array (não só da tela) e atualiza a tabela
function excluir(index) {
  pacientes.splice(index, 1);

  // Se o paciente excluído era o que estava em edição, sai do modo edição
  if (indiceEmEdicao === index) {
    indiceEmEdicao = null;
    formPaciente.reset();
    btnEnviar.textContent = "Cadastrar";
  }

  renderizarTabela();
}

// Limpa a tabela inteira e a reconstrói a partir do array "pacientes".
// É chamada sempre que o array muda (cadastrar, editar ou excluir).
function renderizarTabela() {
  corpoTabela.innerHTML = "";

  pacientes.forEach(function (paciente, index) {
    const linha = document.createElement("tr");

    linha.innerHTML =
      "<td>" + paciente.nome + "</td>" +
      "<td>" + paciente.peso + "</td>" +
      "<td>" + paciente.altura + "</td>" +
      "<td>" + paciente.imc + "</td>" +
      "<td>" +
        "<button class='btn-editar' onclick='editar(" + index + ")'>Editar</button>" +
        "<button class='btn-excluir' onclick='excluir(" + index + ")'>Excluir</button>" +
      "</td>";

    corpoTabela.appendChild(linha);
  });
}
