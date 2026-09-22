function insert(num) {
  document.getElementById("display").innerHTML += num;
}
function clean() {
  document.getElementById("display").innerHTML = "";
}
function back() {
  let resultado = document.getElementById("display").innerHTML;
  document.getElementById("display").innerHTML = resultado.substring(
    0,
    resultado.length - 1
  );
}
function calculate() {
  let resultado = document.getElementById("display").innerHTML;
  if (resultado) {
    document.getElementById("display").innerHTML = eval(resultado);
  } else {
    clean();
  }
}
