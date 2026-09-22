
const precosDolar = [50.00, 120.50, 10.00, 450.00, 89.90];
const taxaConversao = 5.50;

// O .map() percorre cada 'preco' e já cria o novo array 'precosReal'
const precosReal = precosDolar.map(preco => {
    return (preco * taxaConversao).toFixed(2);
});

const precosReal2= precosDolar.map(function(preco)  {
    return (preco * taxaConversao).toFixed(2);
});

// Log para conferência
console.log("Original (USD):", precosDolar);
console.log("Convertido (BRL):", precosReal2);

