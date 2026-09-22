function calculapeso()
{	//variáveis
		let altura=ficha.altura.value;
		let sexo=ficha.sexo.value;
		let pesoideal=0;
	//lógica de cálculo
		if (sexo=='masculino')
				pesoideal= (72.7*altura)-58;
		else 
				pesoideal=(62.1*altura)- 44.7;
	//resultado
		ficha.pesoideal.value=Math.round(pesoideal);
}