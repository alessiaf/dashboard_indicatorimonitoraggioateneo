var config, configB;
var myChartS, myChartB;
var ctx, ctxB;
var chart, chartB;
var desc_num_list = [];
var desc_den_list = [];

$(document).ready(function() {
	
	var sorgente_dati = JSON.parse(getSorgenteDati());
	popolaComboIndicatori(sorgente_dati);
	popolaComboAnni(sorgente_dati);
	aggiornaValoriSingoli(sorgente_dati);

	popolaListaDenominatore();
	popolaListaNumeratore();

	$('#desc_numeratore').text(desc_num_list[0]);
	$('#desc_denominatore').text(desc_den_list[0]);

	config = costruisciGraficoSerie(sorgente_dati);
	myChartS = document.getElementById('grafico-serie');
	ctx = myChartS.getContext('2d');
	chart = new Chart(ctx, config);
	
	chart.options.scales.yAxes[0].ticks.min = 50;
	
	configB = costruisciGraficoBar(sorgente_dati);
	myChartB = document.getElementById('grafico-bar');
	ctxB = myChartB.getContext('2d');
	chartB = new Chart(ctxB, configB);
	
	chart.canvas.parentNode.style.width = '700px';
	chart.canvas.parentNode.style.height = '400px';
	
	chartB.canvas.parentNode.style.width = '700px';
	chartB.canvas.parentNode.style.height = '400px';
	
	$( "#ind-select" ).change(function() {
		
		popolaComboAnni(sorgente_dati);	
		aggiornaValoriSingoli(sorgente_dati);
		
		var elem_sel_ind = $('#ind-select').val();

		$('#desc_numeratore').text(desc_num_list[elem_sel_ind]);
		$('#desc_denominatore').text(desc_den_list[elem_sel_ind]);
	
		var anni = [];
		var dataset = [];
		
		for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
			anni.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
			dataset.push(sorgente_dati[elem_sel_ind]['anni'][i]['indicatore']);
		}
		
		chart.data.labels = anni;
		
		if (elem_sel_ind == 2 || elem_sel_ind == 6) {
			chart.options.scales.yAxes[0].ticks.min = 0;
			chart.options.scales.yAxes[0].ticks.max = 50;
		} else {
			chart.options.scales.yAxes[0].ticks.min = 50;
			chart.options.scales.yAxes[0].ticks.max = 100;
		}	
		
		chart.data.datasets[0].data = dataset;
		chart.update();
		
		var elem_sel_anni = $('#anni-select').val();
	
		var datasetNum = [];
		var datasetDen = [];
	
		if (elem_sel_anni == "-1") {
			for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
			datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][i]['numeratore']);
			datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][i]['denominatore']);
			}
		} else {
			datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['numeratore']);
			datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['denominatore']);
		}
			
		chartB.data.labels = anni;
		chartB.data.datasets[0].data = datasetNum;
		chartB.data.datasets[1].data = datasetDen;
		chartB.update();
	});
	
	$( "#anni-select" ).change(function() {
		aggiornaValoriSingoli(sorgente_dati);
		
		var elem_sel_ind = $('#ind-select').val();
	
		var anni = [];
		var dataset = [];
		
		for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
			anni.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
			dataset.push(sorgente_dati[elem_sel_ind]['anni'][i]['indicatore']);
		}
		
		chart.data.labels = anni;
		chart.data.datasets[0].data = dataset;
		chart.update();
		
		var elem_sel_anni = $('#anni-select').val();
	
		var datasetNum = [];
		var datasetDen = [];
		var anniB = [];
	
		if (elem_sel_anni == "-1") {
			for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
			anniB.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
			datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][i]['numeratore']);
			datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][i]['denominatore']);
			}
		} else {
			anniB.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['value']);
			datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['numeratore']);
			datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['denominatore']);
		}
			
		chartB.data.labels = anniB;
		chartB.data.datasets[0].data = datasetNum;
		chartB.data.datasets[1].data = datasetDen;
		chartB.update();
		
	});
	
})

function popolaListaDenominatore() {
	desc_den_list.push("CFU da conseguire");
	desc_den_list.push("Immatricolati puri dal CdS nel x/x+1");
	desc_den_list.push("CFU conseguiti all\'estero dagli iscritti regolari a.a. x/x+1 nell\'a.s.x+1");
	desc_den_list.push("Totale rispondenti");
	desc_den_list.push("Totale laureati nell\'anno x");
	desc_den_list.push("Laureati magistrali x intervistati");
	desc_den_list.push("Totale ore di docenza");
	desc_den_list.push("Totale docenti di riferimento nel CdS");

}
	
function popolaListaNumeratore() {
	desc_num_list.push("CFU conseguiti");
	desc_num_list.push("Immatricolati puri in x/x+1 che entro x+1 hanno acquisito 2/3 di CFU");
	desc_num_list.push("CFU conseguiti dagli iscritti regolari a.a.x/x+1 nell\'a.s.x+1");
	desc_num_list.push("Nnumero soddisfatti (ALMALAUREA o indagine ateneo)");
	desc_num_list.push("Numero laureati regolari nell\'anno x");
	desc_num_list.push("Laureati magistrali x occupati ad 1 e tre anni");
	desc_num_list.push("Ore docenza tempo indeterminato");
	desc_num_list.push("Docenti di ruolo e di riferimento nel CdS con SSD caratterizzante CdS");

}

function costruisciGraficoSerie(sorgente_dati) {
	var elem_sel_ind = $('#ind-select').val();
	
	var anni = [];
	var dataset = [];
	
	for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
		anni.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
		dataset.push(sorgente_dati[elem_sel_ind]['anni'][i]['indicatore']);
	}
	
	return {
		type : 'line',
		data : {
			labels : anni,
			datasets : [ {
				label : 'Indicatore',
				data : dataset,
				type : 'line',
				fill : false,
				backgroundColor : 'rgb(237, 125, 49)',
				borderColor : 'rgb(117, 192, 59)',
				pointBackgroundColor: 'rgb(117, 192, 59)',
				pointStyle: 'circle'
			}]
		},

		options : {
			responsive: true,
			legend: {
				display: false,
				reverse: true,
				position: 'right'
			},
			title: {
				display: true,
				fontSize: 18,
				fontColor: '#000',
				fontFamily: 'Arial', 
				position: 'top',
				text: 'Trend indicatore ANVUR'
			},
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Anno accademico"
					}
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Indicatore ANVUR"
					},
					ticks: {
						callback: function(value, index, values) {
							if ($('#ind-select').val() == 2) {
								return value + "\u2030";	
							} else {
								return value + "%";
							}
						}
					}
				}]
			},
			elements : {
				line : {
					tension : 0
				}
			}
		}
	}
}

function costruisciGraficoBar(sorgente_dati) {
	var elem_sel_ind = $('#ind-select').val();
	var elem_sel_anni = $('#anni-select').val();
	
	var anni = [];
	var datasetNum = [];
	var datasetDen = [];
	
	if (elem_sel_anni == "-1") {
		for (var i=0; i<sorgente_dati[elem_sel_ind]['anni'].length; i++) {
		anni.push(sorgente_dati[elem_sel_ind]['anni'][i]['value']);
		datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][i]['numeratore']);
		datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][i]['denominatore']);
		}
	} else {
		anni.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['value']);
		datasetNum.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['numeratore']);
		datasetDen.push(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['denominatore']);
	}
	
	
	
	return {
		type : 'bar',
		data : {
			labels : anni,
			datasets : [ {
				label : 'Numeratore',
				data : datasetNum,
				type : 'bar',
				backgroundColor : 'rgb(81, 136, 52)',
				borderColor : 'rgb(65, 65, 65)',
				pointBackgroundColor: 'rgb(237, 125, 49)'
			},
			{
				label : 'Denominatore',
				data : datasetDen,
				type : 'bar',
				backgroundColor : 'rgb(0, 131, 208)',
				borderColor : 'rgb(65, 65, 65)',
				pointBackgroundColor: 'rgb(237, 125, 49)'
			}
			]
		},

		options : {
			responsive: true,
			legend: {
				display: true,
				reverse: true,
				position: 'right'
			},
			title: {
				display: true,
				fontSize: 18,
				fontColor: '#000',
				fontFamily: 'Arial', 
				position: 'top',
				text: 'Numeratore & Denominatore'
			},
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Anno accademico"
					}
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: "Valore assoluto"
					}
				}]
			}
		}
	}
}


function popolaComboIndicatori(sorgente_dati) {
	var x = document.getElementById("ind-select");
	var option;
	
	for (var i = 0; i < sorgente_dati.length; i++) {
		option = document.createElement("option");
		option.text = sorgente_dati[i]['value'];
		option.value = sorgente_dati[i]['id'];
		x.add(option);
	}
		
}

function popolaComboAnni(sorgente_dati) {
	var elem_selected = $('#ind-select').val();
	var x = document.getElementById("anni-select");
	
	for (var k = x.options.length-1; k >= 0; k--) {
		x.remove(k);
	}
		
	var option = document.createElement("option");
	option.text = "Tutti gli anni accademici";
	option.value = "-1";
	x.add(option);
	
	for (var i = 0; i < sorgente_dati[elem_selected]['anni'].length; i++) {
		option = document.createElement("option");
		option.text = sorgente_dati[elem_selected]['anni'][i]['value'];
		option.value = sorgente_dati[elem_selected]['anni'][i]['id'];
		x.add(option);
	}
}

function aggiornaValoriSingoli(sorgente_dati) {
	var elem_sel_ind = $('#ind-select').val();
	var elem_sel_anni = $('#anni-select').val();
	
	if (elem_sel_anni != '-1') {
		$('#container-ind').addClass('show').removeClass('hide');
		$('#container-trend').addClass('show').removeClass('hide');
		
		$('#table-custom-id').addClass('hide').removeClass('show');
		
		if (elem_sel_ind == 2) {
			$('#val-ind').text(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['indicatore'] + "\u2030");
		} else {
			$('#val-ind').text(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['indicatore'] + "%");
		}
		
		if (elem_sel_anni == 0) {
			$('#val-trend').text("-");
		} else if (elem_sel_ind == 2) {
			$('#val-trend').text(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['trend'] + "\u2030");
		} else {
			$('#val-trend').text(sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['trend'] + "%");
		}
		
		if (elem_sel_anni != 0 && sorgente_dati[elem_sel_ind]['anni'][elem_sel_anni]['trend'] < 0) {
			$('#freccia-rossa').addClass('show').removeClass('hide');
			$('#freccia-verde').addClass('hide').removeClass('show');
		} else if (elem_sel_anni != 0){
			$('#freccia-rossa').addClass('hide').removeClass('show');
			$('#freccia-verde').addClass('show').removeClass('hide');
		} else {
			$('#freccia-rossa').addClass('hide').removeClass('show');
			$('#freccia-verde').addClass('hide').removeClass('show');
		}
		
	} else {
		$('#container-ind').addClass('hide').removeClass('show');
		$('#container-trend').addClass('hide').removeClass('show');
		$('#table-custom-id').addClass('show').removeClass('hide');
		
		var anno, indicatore, trend;
		
		$('#content-body').empty();
		
		for (var k=0; k<sorgente_dati[elem_sel_ind]['anni'].length; k++) {
			anno = sorgente_dati[elem_sel_ind]['anni'][k]['value'];
			indicatore = sorgente_dati[elem_sel_ind]['anni'][k]['indicatore'];
			
			if (k == 0) {
				trend = '-';
			} else {
				trend = sorgente_dati[elem_sel_ind]['anni'][k]['trend'];	
			}
			
			$('#content-body').append('<tr>');
			$('#content-body').append('<td>'+anno+'</td>');
			
			if (elem_sel_ind == 2) {
				$('#content-body').append('<td>'+indicatore+'\u2030 </td>');
			} else {
				$('#content-body').append('<td>'+indicatore+'% </td>');
			}
			
			if (k == 0) {
				$('#content-body').append('<td>'+trend+'</td>');
			} else if (elem_sel_ind == 2) {
				$('#content-body').append('<td>'+trend+'\u2030</td>');	
			} else {
				$('#content-body').append('<td>'+trend+'%</td>');	
			}
			
			if (k != 0 && trend < 0) {
				$('#content-body').append('<td><img style="width:20px; height:20px;" src="resources/freccia rossa.png"></img></td>');	
			} else if (k != 0) {
				$('#content-body').append('<td><img style="width:20px; height:20px;" src="resources/freccia verde.png"></img></td>');	
			}
						
			$('#content-body').append('</tr>');
		}
		
	}
}


function getSorgenteDati() {
	return `
	[
		{
			"id" : "0",
			"value": "Percentuale dei CFU conseguiti al I anno su CFU da conseguire",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "44.05",
					"denominatore": "60",
					"indicatore": "73.42",
					"trend": "73"
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "44.29",
					"denominatore": "60",
					"indicatore": "73.82",
					"trend": "0.4"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "47.09",
					"denominatore": "60",
					"indicatore": "78.48",
					"trend": "4.67"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "45.41",
					"denominatore": "60",
					"indicatore": "75.68",
					"trend": "-2.8"
				}
			]
		},
		{
			"id" : "1",
			"value": "Percentuale di studenti che proseguono al II anno nella stessa classe di laurea avendo acquisito almeno 2/3 dei CFU previsti al I anno",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "1296",
					"denominatore": "1925",
					"indicatore": "67.32",
					"trend": "67.32"
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "1449",
					"denominatore": "2119",
					"indicatore": "68.38",
					"trend": "1.06"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "1681",
					"denominatore": "2261",
					"indicatore": "74.35",
					"trend": "5.97"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "1591",
					"denominatore": "2349",
					"indicatore": "67.73",
					"trend": "-6.62"
				}
			]
		},
		{
			"id" : "2",
			"value": "Proporzione di CFU conseguiti all'estero dagli studenti \(ivi inclusi quelli acquisiti durante periodi di 'mobilita' virtuale'\)",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "2838",
					"denominatore": "239727",
					"indicatore": "11.84",
					"trend": "11.84"
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "4746",
					"denominatore": "262629",
					"indicatore": "18.07",
					"trend": "6.23"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "5013",
					"denominatore": "300420",
					"indicatore": "16.69",
					"trend": "-1.38"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "2133",
					"denominatore": "314685",
					"indicatore": "6.78",
					"trend": "-9.91"
				}
			]
		},
		{
			"id" : "3",
			"value": "Percentuale dei laureandi complessivamente soddisfatti del Corso di Studio",
			"anni": [
				{
					"id": "0",
					"value": "2018",
					"numeratore": "1246",
					"denominatore": "1335",
					"indicatore": "93.33",
					"trend": "93.33"
				},
				{
					"id": "1",
					"value": "2019",
					"numeratore": "1281",
					"denominatore": "1367",
					"indicatore": "93.71",
					"trend": "0.38"
				},
				{
					"id": "2",
					"value": "2020",
					"numeratore": "1280",
					"denominatore": "1361",
					"indicatore": "94.05",
					"trend": "0.34"
				}
			]
		},
		{
			"id" : "4",
			"value": "Percentuale di laureati (L; LM; LMCU), rispettivamente entro la durata normale e entro un anno oltre la durata normale del corso",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "1037",
					"denominatore": "1413",
					"indicatore": "73.39",
					"trend": "73.39"
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "1195",
					"denominatore": "1624",
					"indicatore": "73.58",
					"trend": "0.19"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "1387",
					"denominatore": "1784",
					"indicatore": "77.75",
					"trend": "4.16"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "1534",
					"denominatore": "1991",
					"indicatore": "77.05",
					"trend": "-0.7"
				}
			]
		},
		{
			"id" : "5",
			"value": "Percentuale di Laureati occupati a uno e tre anni dal Titolo (LM; LMCU) \(distinti per area medico-sanitaria, area scientifico-tecnologica e area umanistico-sociale\)",
			"anni": [
				{
					"id": "0",
					"value": "2018",
					"numeratore": "176",
					"denominatore": "197",
					"indicatore": "89.34",
					"trend": "89.34"
				},
				{
					"id": "1",
					"value": "2019",
					"numeratore": "181",
					"denominatore": "199",
					"indicatore": "90.95",
					"trend": "1.61"
				},
				{
					"id": "2",
					"value": "2020",
					"numeratore": "177",
					"denominatore": "201",
					"indicatore": "88.06",
					"trend": "-2.9"
				},
				{
					"id": "3",
					"value": "2021",
					"numeratore": "149",
					"denominatore": "176",
					"indicatore": "84.66",
					"trend": "-3.4"
				}
			]
		},
		{
			"id" : "6",
			"value": "Percentuale di ore di docenza erogata da docenti a tempo indeterminato sul totale delle ore di docenza erogata",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "9166",
					"denominatore": "26166",
					"indicatore": "35.03",
					"trend": "35.03"
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "10006",
					"denominatore": "28890",
					"indicatore": "34.63",
					"trend": "-0.4"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "9782",
					"denominatore": "31010",
					"indicatore": "31.54",
					"trend": "-3.09"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "10194",
					"denominatore": "46849",
					"indicatore": "21.76",
					"trend": "-9.79"
				},
				{
					"id": "4",
					"value": "2021",
					"numeratore": "9942",
					"denominatore": "36492",
					"indicatore": "27.24",
					"trend": "5.49"
				}
			]
		},
		{
			"id" : "7",
			"value": "Percentuale dei docenti di ruolo indicati come docenti di riferimento che appartengono a settori scientifico-disciplinari (SSD) di base e caratterizzanti nei Corsi di Studio (L, LMCU, LM) attivati",
			"anni": [
				{
					"id": "0",
					"value": "2017",
					"numeratore": "69",
					"denominatore": "77",
					"indicatore": "89.61",
					"trend": "89.61"
				},
				{
					"id": "1",
					"value": "2018",
					"numeratore": "72",
					"denominatore": "86",
					"indicatore": "83.72",
					"trend": "-5.89"
				},
				{
					"id": "2",
					"value": "2019",
					"numeratore": "66",
					"denominatore": "81",
					"indicatore": "81.48",
					"trend": "-2.24"
				},
				{
					"id": "3",
					"value": "2020",
					"numeratore": "61",
					"denominatore": "71",
					"indicatore": "85.92",
					"trend": "4.43"
				},
				{
					"id": "4",
					"value": "2021",
					"numeratore": "71",
					"denominatore": "84",
					"indicatore": "84.52",
					"trend": "-1.39"
				}
			]
		}
	]
`;
}
