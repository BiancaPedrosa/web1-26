function sortear() {
            
   const quantidade = parseInt(document.getElementById('quantidade').value);
   const inicio = parseInt(document.getElementById('inicio').value);
   const fim = parseInt(document.getElementById('fim').value);

   
   if (isNaN(quantidade) || isNaN(inicio) || isNaN(fim) || quantidade <= 0 || inicio >= fim) {
       alert("Por favor, preencha todos os campos corretamente.");
       return;
   }

   //inserir os números no array
   let numerosSorteados = [];
   for (let i = 0; i < quantidade; i++) {
       const numero = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
       //verificar se o número já foi sorteado
       if (numerosSorteados.includes(numero)) { 
              i--;
              continue;
       }
       numerosSorteados.push(numero);
   }
   
   //ordenar o aray
   numerosSorteados.sort((a,b)=>a-b);

   //exibir o resultado
   let txt = "";
   numerosSorteados.forEach(function(value) {
      txt += "<li>"+ value + "</li>"; 
   });
   document.getElementById("numerosSorteados").innerHTML = txt;
}