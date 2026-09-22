function adicionarPaciente(){
    var tbl = document.getElementById("tablePaciente");
    var row = tbl.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();

    var peso = document.getElementById("txtPeso").value;
    var altura = document.getElementById("txtAltura").value;
    var imc = peso / (altura * altura);

    cell1.innerHTML = document.getElementById("txtNome").value;
    cell2.innerHTML = document.getElementById("txtPeso").value;
    cell3.innerHTML = document.getElementById("txtAltura").value;
    cell4.innerHTML = document.getElementById("txtGordura").value;
    cell5.innerHTML = imc;
}