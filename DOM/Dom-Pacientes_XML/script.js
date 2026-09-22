function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            myFunction(this);
        }
    };

    xmlhttp.open("GET", "pacientes.xml", true);
    xmlhttp.send();
}

function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = document.getElementById("tbPacientes");
    var x = xmlDoc.getElementsByTagName("CD");
    for (i = 0; i < x.length; i++) {
        tr = document.createElement("tr");
        tr.innerHTML += "<td>" +
            x[i].getElementsByTagName("NOME")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("PESO")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("ALTURA")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("GORDURA")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("IMC")[0].childNodes[0].nodeValue +
            "</td>";
        table.appendChild(tr);
    }
}

// Cria a tabela
var tbPacientes = document.getElementById('tbPacientes');

// Função para inserir linha na tabela
function inserirLinha(tbPacientes, nome, peso, altura, gordura, imc) {
    var tr = document.createElement('tr');
    tr.innerHTML = `<td>${nome}</td><td>${peso}</td><td>${altura}</td><td>${gordura}</td><td>${imc}</td>`;
    tbPacientes.appendChild(tr);
}

// Função para calcular e adicionar dados à tabela
function calcular() {
    var inputNome = document.getElementById('name').value;
    var inputPeso = document.getElementById('peso').value;
    var inputAltura = document.getElementById('altura').value;
    var inputGordura = document.getElementById('gordura').value;
    var peso = parseFloat(inputPeso);
    var altura = parseFloat(inputAltura);
    var gordura = parseFloat(inputGordura);
    var imc = Math.round(peso / (altura * altura));

    if (peso == "" || altura == "") {
        alert("Informe corretamente os dados");
        inputPeso.focus();
        return;
    }

    inserirLinha(tbPacientes, inputNome, peso, altura, gordura, imc);
    inputNome.value = "";
    inputPeso.value = "";
    inputAltura.value = "";
    inputGordura.value = "";
    inputNome.focus();
}