/*mudar a cor do butoes e acrescentar um checked
 */

// elementos selecionados
let btns = document.querySelectorAll("input.btns");
let index = "";
let rend = "";

//
let cor = (colorido) => {
	colorido.style.background = "var(--color2)";
	colorido.style.color = "white";
};
let reset = (resetado) => {
	resetado.style.background = "";
	resetado.style.color = "";
};
// rendimentos
function lqd(element) {
	cor(element);
	reset(btns[1]);
	return (rend = "liquido");
}
function brt(element) {
	cor(element);
	reset(btns[0]);
	return (rend = "bruto");
}
// tipos de indexação
function pRe(element) {
	cor(element);
	reset(btns[3]);

	reset(btns[4]);
	return (index = "pre");
}
function pOs(element) {
	cor(element);
	reset(btns[2]);
	reset(btns[4]);
	return (index = "pos");
}
function fXd(element) {
	cor(element);
	reset(btns[2]);
	reset(btns[3]);
	return (index = "ipca");
}
// chamando as simulações
function simulation() {
	const url = `http://localhost:3000/simulacoes`;

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			choice(data);
		});
}
//callback
let filtro = (filtrado) => {
	return filtrado.tipoIndexacao == index && filtrado.tipoRendimento == rend;
};
// escolhendo o objetos selecionados
let choice = (data) => {
	let objescolhido = data.filter(filtro);
	transfer(objescolhido);
};
// tranfirindo os dados para o front
let transfer = (objescolhido) => {
	let results = document.querySelectorAll(".result");
	let objt = objescolhido[0];
	// Valor Final Bruto
	valorFinalBruto(results[0], objt);
	// Aliquota
	aliquota(results[1], objt);
	// Valor Pago em IR
	valorPagoIR(results[2], objt);
	// Valor Final Liquido
	valorFinalLiquido(results[3], objt);
	// Valor Total Investido
	valorTotalInvestido(results[4], objt);
	// Ganho Liquido
	ganhoLiquido(results[5], objt);
};
let valorFinalBruto = (results, objescolhido) => {
	let value = objescolhido.valorFinalBruto.toLocaleString("pt-br", {
		style: "currency",
		currency: "BRL",
	});
	valorBruto = results;
	valorBruto.innerHTML = `<h3>Valor Final Bruto</h3>
	<p>${value}</p>`;
};
let aliquota = (results, objescolhido) => {
	let value = objescolhido.aliquotaIR;
	let valorAliquota = results;

	valorAliquota.innerHTML = `<h3>Aliquota do IR</h3>
	<p>${value}%</p>`;
};
let valorPagoIR = (results, objescolhido) => {
	let value = objescolhido.valorPagoIR.toLocaleString("pt-br", {
		style: "currency",
		currency: "BRL",
	});
	let pagoIR = results;
	pagoIR.innerHTML = `		<h3>Valor Pago em IR</h3>
	<p>${value}</p>

	`;
};
let valorFinalLiquido = (results, objescolhido) => {
	let value = objescolhido.valorFinalLiquido.toLocaleString("pt-br", {
		style: "currency",
		currency: "BRL",
	});
	let pagoIR = results;
	pagoIR.innerHTML = `<h3>Valor Final Líquido</h3>
	<p>${value}</p>

	`;
};
let valorTotalInvestido = (results, objescolhido) => {
	let value = objescolhido.valorTotalInvestido.toLocaleString("pt-br", {
		style: "currency",
		currency: "BRL",
	});
	let pagoIR = results;
	pagoIR.innerHTML = `<h3>Valor Total Investido</h3>
	<p>${value}</p>

	`;
};
let ganhoLiquido = (results, objescolhido) => {
	let value = objescolhido.ganhoLiquido.toLocaleString("pt-br", {
		style: "currency",
		currency: "BRL",
	});
	let pagoIR = results;
	pagoIR.innerHTML = `<h3>Ganho Líquido</h3>
	<p>${value}</p>

	`;
};

// validando os  inputs

function validar() {
	let input = document.getElementsByClassName("text");
	let label = document.getElementsByClassName("cont-inputs");

	let span = document.getElementsByTagName("span");

	aporteInicial(input[0], label[0], span[0]);
	prazo(input[1], label[1], span[1]);

	aporteMensal(input[2], label[2], span[2]);
}

let aporteInicial = (aporte, label, span) => {
	let aporteInicial = Number(aporte.value);

	if (aporteInicial > 1 || aporteInicial == "") {
		label.style = "";
		span.style.display = "";
		aporte.style = "";
	} else {
		label.style = "color:red;";
		span.style.display = "block";
		aporte.style = "border-color:red";
	}
};

let prazo = (prazo, label, span) => {
	let prazoNumber = Number(prazo.value);

	if (prazoNumber > 0 || prazoNumber == "") {
		label.style = "";
		span.style.display = "";
		prazo.style = "";
	} else {
		label.style = "color:red;";
		span.style.display = "block";
		prazo.style = "border-color:red";
	}
};
aporteMensal = (aporteM, label, span) => {
	let aporteMensal = Number(aporteM.value);

	if (aporteMensal > 1 || aporteMensal == "") {
		label.style = "";
		span.style.display = "";
		aporteM.style = "";
	} else {
		label.style = "color:red;";
		span.style.display = "block";
		aporteM.style = "border-color:red";
	}
};

///pegando os indicadores

let url = "http://localhost:3000/indicadores";
fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		// chama as funçoes
		ipca(data[1].valor);
		cdi(data[0].valor);
	});

let ipca = (valueIpca) => {
	let ipca = document.getElementById("ipca");
	ipca.value = `${valueIpca}%`;
};

let cdi = (valueCdi) => {
	let cdi = document.getElementById("cdi");
	cdi.value = `${valueCdi}%`;
};
