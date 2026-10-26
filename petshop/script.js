/* ==========================================================
   GABARITO — Amigo Fiel (v2)
   Estrutura do script:
   1) Configuração (preços, valida data mínima)
   2) Funções auxiliares de validação (uma por regra da Parte 2)
   3) Função de cálculo (Parte 3)
   4) Função de exibição do resultado (Parte 4)
   5) Histórico via manipulação do DOM (Parte 5)
   6) Listener do submit, orquestrando tudo

   Mudanças desde a v1: entregue como arquivo separado (antes estava
   embutido no HTML); a Parte 5 não exige mais botão de remover no
   histórico — só criar e inserir os itens com createElement/appendChild.
   ========================================================== */

// ---------- 1) Configuração ----------

const PRECOS_PORTE = {
  pequeno: 40,
  medio: 60,
  grande: 90
};

const form = document.getElementById('formAgendamento');
const campoData = document.getElementById('data');

// A data mínima do campo "date" é definida dinamicamente como HOJE,
// para nunca deixar o navegador oferecer datas passadas.
const hoje = new Date();
const hojeISO = hoje.toISOString().split('T')[0];
campoData.min = hojeISO;

// Contador de caracteres da textarea (feedback visual, não obrigatório na prova)
const observacoes = document.getElementById('observacoes');
const contadorObs = document.getElementById('contadorObs');
observacoes.addEventListener('input', () => {
  contadorObs.textContent = observacoes.value.length;
});

// ---------- 2) Funções de validação ----------
// Cada função retorna uma string de erro (vazia = válido) e já escreve
// a mensagem no <div class="erro"> correspondente.

function validarNomeTutor() {
  const campo = document.getElementById('nomeTutor');
  const erroEl = document.getElementById('erroNomeTutor');
  let msg = '';
  if (campo.value.trim().length < 3) {
    msg = 'Informe o nome completo do tutor (mínimo 3 caracteres).';
  }
  erroEl.textContent = msg;
  return msg;
}

function validarTelefone() {
  const campo = document.getElementById('telefone');
  const erroEl = document.getElementById('erroTelefone');
  const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
  let msg = '';
  if (!regex.test(campo.value.trim())) {
    msg = 'Telefone inválido. Use o formato (11) 91234-5678.';
  }
  erroEl.textContent = msg;
  return msg;
}

function validarEmail() {
  const campo = document.getElementById('email');
  const erroEl = document.getElementById('erroEmail');
  // Validação simples de formato de e-mail (didática; regex de e-mail
  // "perfeita" foge do escopo da disciplina).
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let msg = '';
  if (!regex.test(campo.value.trim())) {
    msg = 'Informe um e-mail válido.';
  }
  erroEl.textContent = msg;
  return msg;
}

function validarNomePet() {
  const campo = document.getElementById('nomePet');
  const erroEl = document.getElementById('erroNomePet');
  let msg = '';
  if (campo.value.trim() === '') {
    msg = 'Informe o nome do pet.';
  }
  erroEl.textContent = msg;
  return msg;
}

function validarPorte() {
  const erroEl = document.getElementById('erroPorte');
  const marcado = form.querySelector('input[name="porte"]:checked');
  let msg = '';
  if (!marcado) {
    msg = 'Selecione o porte do animal.';
  }
  erroEl.textContent = msg;
  return msg;
}

function validarPagamento() {
  const campo = document.getElementById('pagamento');
  const erroEl = document.getElementById('erroPagamento');
  let msg = '';
  if (campo.value === '') {
    msg = 'Selecione a forma de pagamento.';
  }
  erroEl.textContent = msg;
  return msg;
}

function validarData() {
  const campo = document.getElementById('data');
  const erroEl = document.getElementById('erroData');
  let msg = '';

  if (campo.value === '') {
    msg = 'Selecione a data do agendamento.';
  } else {
    // new Date('YYYY-MM-DD') é interpretado em UTC; comparamos apenas a
    // parte de data (string) para evitar problemas de fuso horário.
    if (campo.value < hojeISO) {
      msg = 'A data não pode ser anterior a hoje.';
    } else {
      const [ano, mes, dia] = campo.value.split('-').map(Number);
      const dataEscolhida = new Date(ano, mes - 1, dia);
      const diaDaSemana = dataEscolhida.getDay(); // 0=domingo ... 1=segunda
      if (diaDaSemana === 1) {
        msg = 'O petshop não funciona às segundas-feiras. Escolha outra data.';
      }
    }
  }
  erroEl.textContent = msg;
  return msg;
}

function validarHorario() {
  const campo = document.getElementById('horario');
  const erroEl = document.getElementById('erroHorario');
  let msg = '';
  if (campo.value === '') {
    msg = 'Selecione o horário.';
  } else {
    const [h, m] = campo.value.split(':').map(Number);
    const minutos = h * 60 + m;
    const abertura = 8 * 60;   // 08:00
    const fechamento = 18 * 60; // 18:00
    if (minutos < abertura || minutos > fechamento) {
      msg = 'O horário deve estar entre 08:00 e 18:00.';
    }
  }
  erroEl.textContent = msg;
  return msg;
}

function validarFormulario() {
  // Executa todas as validações (sem "curto-circuito") para que o aluno
  // veja TODOS os erros de uma vez, não apenas o primeiro.
  const mensagens = [
    validarNomeTutor(),
    validarTelefone(),
    validarEmail(),
    validarNomePet(),
    validarPorte(),
    validarPagamento(),
    validarData(),
    validarHorario()
  ];
  return mensagens.every(msg => msg === '');
}

// ---------- 3) Cálculo do orçamento ----------

function calcularOrcamento() {
  const porte = form.querySelector('input[name="porte"]:checked').value;
  const precoPorte = PRECOS_PORTE[porte];

  const checkboxesExtras = form.querySelectorAll('input[name="extras"]:checked');
  let somaExtras = 0;
  const nomesExtras = [];
  checkboxesExtras.forEach(chk => {
    somaExtras += Number(chk.value);
    nomesExtras.push(chk.dataset.nome);
  });

  const subtotal = precoPorte + somaExtras;

  const pagamento = document.getElementById('pagamento').value;
  const descontoPix = pagamento === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal - descontoPix;

  return {
    nomePet: document.getElementById('nomePet').value.trim(),
    porte,
    precoPorte,
    nomesExtras,
    somaExtras,
    subtotal,
    pagamento,
    descontoPix,
    total
  };
}

// ---------- 4) Exibição do resultado ----------

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function exibirResultado(orc) {
  const resultadoEl = document.getElementById('resultado');

  let linhasExtras = '';
  if (orc.nomesExtras.length > 0) {
    linhasExtras = `
      <div class="linha"><span>Extras (${orc.nomesExtras.join(', ')})</span><span>${formatarMoeda(orc.somaExtras)}</span></div>`;
  }

  let linhaPix = '';
  if (orc.descontoPix > 0) {
    linhaPix = `
      <div class="linha"><span>Desconto Pix (5%)</span><span>- ${formatarMoeda(orc.descontoPix)}</span></div>`;
  }

  resultadoEl.innerHTML = `
    <div class="linha"><span>Banho e tosa (${orc.porte})</span><span>${formatarMoeda(orc.precoPorte)}</span></div>
    ${linhasExtras}
    <div class="linha"><span>Subtotal</span><span>${formatarMoeda(orc.subtotal)}</span></div>
    ${linhaPix}
    <div class="linha total"><span>Total</span><span>${formatarMoeda(orc.total)}</span></div>
  `;
  resultadoEl.classList.add('visivel');
}

function limparErroGeral() {
  const erroGeral = document.getElementById('erroGeral');
  erroGeral.textContent = '';
  erroGeral.classList.remove('visivel');
}

function mostrarErroGeral() {
  const erroGeral = document.getElementById('erroGeral');
  erroGeral.textContent = 'Corrija os campos destacados em vermelho antes de calcular o orçamento.';
  erroGeral.classList.add('visivel');
}

// ---------- 5) Histórico via manipulação do DOM (Parte 5) ----------
// Regra da prova (v2): cada item novo é criado com document.createElement
// (NÃO pode usar innerHTML aqui) e inserido com appendChild, sem apagar
// os anteriores. Não há mais exigência de botão de remover.

const listaHistorico = document.getElementById('historico');
const historicoVazioEl = document.getElementById('historicoVazio');

function atualizarVisibilidadeHistoricoVazio() {
  // Mostra a mensagem "nenhum agendamento" só quando a lista está vazia.
  historicoVazioEl.style.display = listaHistorico.children.length === 0 ? 'block' : 'none';
}

function adicionarAoHistorico(orc) {
  // 1) cria o <li> que vai representar esse agendamento
  const item = document.createElement('li');

  // 2) cria o texto com as informações (sem innerHTML)
  const nomeForte = document.createElement('strong');
  nomeForte.textContent = orc.nomePet;

  item.appendChild(nomeForte);
  item.appendChild(document.createTextNode(
    ` — porte ${orc.porte} — ${formatarMoeda(orc.total)}`
  ));

  // 3) insere na lista (appendChild = mantém os itens anteriores)
  listaHistorico.appendChild(item);

  atualizarVisibilidadeHistoricoVazio();
}

// ---------- 6) Envio do formulário ----------

form.addEventListener('submit', function (evento) {
  evento.preventDefault(); // nunca recarrega a página

  const resultadoEl = document.getElementById('resultado');
  resultadoEl.classList.remove('visivel');

  const formularioValido = validarFormulario();

  if (!formularioValido) {
    mostrarErroGeral();
    return;
  }

  limparErroGeral();
  const orcamento = calcularOrcamento();
  exibirResultado(orcamento);
  adicionarAoHistorico(orcamento);
});

atualizarVisibilidadeHistoricoVazio();
