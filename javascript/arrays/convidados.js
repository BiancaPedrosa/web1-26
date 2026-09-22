// 1. Array Inicial
    let convidados = ["Ana", "Carlos", "Beatriz", "Daniel", "Elena", "Fabio"];

//2. Exemplo de .includes() no console para o aluno
    if (convidados.includes("Beatriz")) {
        console.log("Beatriz está na lista e confirmada!");
    }
// 3. Uso do .push() para adicionar um novo convidado
    if (!convidados.includes("Bianca")) {
        convidados.push("Bianca");
        console.log("Convidados após adicionar Bianca:", convidados);
    }

// 4. Uso do .filter() para criar uma sublista
    const vips = convidados.filter(nome => nome[0].toUpperCase() === 'A') 
    console.log("Convidados VIP encontrados:", vips);

// 5. Uso do .sort() para ordem alfabética
    convidados.sort();
    console.log("Convidados após ordenar:", convidados);
  