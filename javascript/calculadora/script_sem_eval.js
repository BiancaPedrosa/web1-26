function getDisplay() {
  return document.getElementById("display");
}

function getDisplayValue() {
  return getDisplay().textContent;
}

function setDisplayValue(value) {
  getDisplay().textContent = value;
}

function insert(value) {
  setDisplayValue(getDisplayValue() + value);
}

function clean() {
  setDisplayValue("");
}

function back() {
  const expression = getDisplayValue();
  setDisplayValue(expression.slice(0, -1));
}

function calculate() {
  // 1) Lê a expressão atual mostrada no display.
  const expression = getDisplayValue();

  // 2) Se não houver expressão, apenas limpa e encerra.
  if (!expression) {
    clean();
    return;
  }

  try {
    // 3) Avalia a expressão com o parser seguro (sem eval).
    const result = evaluateExpression(expression);

    // 4) Mostra o resultado final no display.
    setDisplayValue(String(result));
  } catch (error) {
    // 5) Em qualquer erro (sintaxe/divisão por zero), exibe mensagem.
    setDisplayValue("Erro");
  }
}

function evaluateExpression(expression) {
  // 1) Remove espaços para facilitar o parsing.
  const parser = {
    input: expression.replace(/\s+/g, ""),
    index: 0,
  };

  // 2) Resolve a expressão completa respeitando precedência.
  const value = parseExpression(parser);

  // 3) Se sobrou caractere não lido, a expressão é inválida.
  if (parser.index !== parser.input.length) {
    throw new Error("Expressao invalida");
  }

  // 4) Retorna inteiro puro ou decimal limitado para evitar ruído de ponto flutuante.
  return Number.isInteger(value) ? value : Number(value.toFixed(10));
}

function parseExpression(parser) {
  let value = parseTerm(parser);

  while (parser.index < parser.input.length) {
    const operator = parser.input[parser.index];

    if (operator !== "+" && operator !== "-") {
      break;
    }

    parser.index += 1;
    const right = parseTerm(parser);
    value = operator === "+" ? value + right : value - right;
  }

  return value;
}

function parseTerm(parser) {
  let value = parseFactor(parser);

  while (parser.index < parser.input.length) {
    const operator = parser.input[parser.index];

    if (operator !== "*" && operator !== "/") {
      break;
    }

    parser.index += 1;
    const right = parseFactor(parser);

    if (operator === "/") {
      if (right === 0) {
        throw new Error("Divisao por zero");
      }
      value /= right;
    } else {
      value *= right;
    }
  }

  return value;
}

function parseFactor(parser) {
  const current = parser.input[parser.index];

  if (current === "+") {
    parser.index += 1;
    return parseFactor(parser);
  }

  if (current === "-") {
    parser.index += 1;
    return -parseFactor(parser);
  }

  return parseNumber(parser);
}

function parseNumber(parser) {
  const start = parser.index;
  let hasDot = false;

  while (parser.index < parser.input.length) {
    const char = parser.input[parser.index];

    if (char >= "0" && char <= "9") {
      parser.index += 1;
      continue;
    }

    if (char === "." && !hasDot) {
      hasDot = true;
      parser.index += 1;
      continue;
    }

    break;
  }

  if (start === parser.index) {
    throw new Error("Numero invalido");
  }

  const numberText = parser.input.slice(start, parser.index);
  const numberValue = Number(numberText);

  if (!Number.isFinite(numberValue)) {
    throw new Error("Numero invalido");
  }

  return numberValue;
}
/*
Se o aluno digitar 2 + 3 * 4:

parseExpression começa e chama parseTerm.

parseTerm percebe que há uma multiplicação (3 * 4) e resolve primeiro, resultando em 12.

parseExpression recebe o 12, soma com o 2 e retorna 14.
*/