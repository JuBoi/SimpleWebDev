var infoDict = {};
infoDict.normal = "Normal";
infoDict.fire = "Fire";
infoDict.water = "Water";
infoDict.electric = "Electric";
infoDict.grass = "Grass";
infoDict.ice  = "Ice";
infoDict.fighting = "#Fighting";
infoDict.poison = "#Poison";
infoDict.ground = "Ground";
infoDict.flying = "Flying";
infoDict.psychic = "Psychic";
infoDict.bug = "Bug";
infoDict.rock = "Rock";
infoDict.ghost  = "Ghost";
infoDict.dragon = "Dragon";
infoDict.dark = "Dark";
infoDict.steel = "Steel";
infoDict.fairy = "Fairy";

var essayButton = document.getElementById('essay');
var modal =document.getElementById('Modal');
var span = document.getElementsByClassName("close")[0];
var next = document.getElementById('next');
var back = document.getElementById('back');
back.style.background = "#8D8282";
var dataDiv = document.getElementById('dataDiv');
var check = true;

var colorDict = {};
colorDict.normal = "#A8A77A";
colorDict.fire = "#EE8130";
colorDict.water = "#6390f0";
colorDict.electric = "#F7D02C";
colorDict.grass = "#7ac74c";
colorDict.ice  = "#96d9d6";
colorDict.fighting = "#c22e28";
colorDict.poison = "#a33ea1";
colorDict.ground = "#e2bf65";
colorDict.flying = "#a98ff3";
colorDict.psychic = "#f95587";
colorDict.bug = "#a6b91a";
colorDict.rock = "#b6a136";
colorDict.ghost  = "#735797";
colorDict.dragon = "#6f35fc";
colorDict.dark = "#705746";
colorDict.steel = "#b7b7ce";
colorDict.fairy = "#d685ad";

var typeDict = ["bug", "dark", "dragon", "electric", "fairy", 
		"fighting", "fire" , "flying", "ghost", "grass", "ground", "ice", "normal", 
		"poison", "psychic", "rock", "steel", "water"];

essayButton.onclick = function() {
	modal.style.display = "block";
}

span.onclick = function() {
	modal.style.display = "none";
}

window.onclick = function(event) {
	if(event.target == modal) {
		modal.style.display = "none";
	}
}

next.onclick = function() {
	if(check) {
		removeStuff();
		d3.select("div").append("svg").attr("width", 800).attr("height", 600);
		var textDiv = document.createElement("div");
		textDiv.id = "textDiv";
		dataDiv.appendChild(textDiv);
		firstChart();
		check = false;
		next.disabled = true;
		next.style.background = "#8D8282";
		back.disabled = true;
		back.style.background = "#8D8282";
	}
}

back.onclick = function() {
	firstChart();
	back.disabled = true;
	back.style.background = "#8D8282";
}

function removeStuff() {
	if(check) {
		$('#heading').remove();
		$('#pokeball').remove();
		$('#first').remove();
		$('#second').remove();
	}
	essayButton.style.visibility = "hidden";
}

function subChart(type) {

	d3.selectAll("svg > *").remove();

	var barWidth = 100;
	var barOffset = 20;
	var margin = {top: 50, right: 50, bottom: 50, left: 50};
	var height = 600 - margin.top - margin.bottom;
	var width = 800 - margin.left - margin.right;

	var svg = d3.select("svg").append("g").attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

	var x = d3.scaleBand().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	d3.csv("./data/typestats.csv", function(data) {
		var i;
		var row = null;
		for(i = 0; i < data.length; i++){
			if(type === data[i]["Type1"]) {
				row = data[i];
			}
		}
		var numData = [];
		numData.push(row["Avg Attack"]);
		numData.push(row["Avg Defense"]);
		numData.push(row["Avg Hp"]);
		numData.push(row["Avg Sp Attack"]);
		numData.push(row["Avg Sp Defense"]);
		numData.push(row["Avg Speed"]);
		var max = 0.0;
		for(var i = 0; i < 6; i++) {
			numData[i] = parseFloat(numData[i]);
			if(max < numData[i]) {
				max = numData[i];
			}
		}

		subDiv(type, numData);

		var color = d3.scaleOrdinal(["Avg Attack", "Avg Defense", "Avg Hp", "Avg Sp Attack", "Avg Sp Defense", "Avg Speed"]);

		x.domain(["Avg Attack", "Avg Defense", "Avg Hp", "Avg Sp Attack", "Avg Sp Defense", "Avg Speed"]);
		y.domain([0, max])

		var barChart = svg.selectAll('rect').data(numData)
			.enter().append('rect').style('fill', colorDict[type])
			.attr('width', barWidth)
			.attr('height', function(d) {
				return height - y(d);
			})
			.attr('x', function(d, i) {
				return i * (barWidth + barOffset);
			})
			.attr('y', function(d) {
				return y(d);
			});

		svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
		svg.append("g").call(d3.axisLeft(y));
	});
}

function firstChart() {
	firstText();

	d3.selectAll("svg > *").remove();

	var svg = d3.select("svg");
	width = +svg.attr("width");
	height = +svg.attr("height");
	radius = Math.min(width, height) / 2;
	g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var color = d3.scaleOrdinal([colorDict.bug, colorDict.dark, colorDict.dragon, colorDict.electric,
		colorDict.fairy, colorDict.fighting, colorDict.fire, colorDict.flying, colorDict.ghost, 
		colorDict.grass, colorDict.ground, colorDict.ice, colorDict.normal, colorDict.poison, colorDict.psychic,
		colorDict.rock, colorDict.steel, colorDict.water]);

	var types = d3.scaleOrdinal(["bug", "dark", "dragon", "electric", "fairy", 
		"fighting", "fire" , "flying", "ghost", "grass", "ground", "ice", "normal", 
		"poison", "psychic", "rock", "steel", "water"]);

	var pie = d3.pie().sort(null).value(function(d) { return d.Count; });

	var path = d3.arc().outerRadius(radius - 10).innerRadius(0);

	var label = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

	var wat = 0;

	d3.csv("./data/typecount.csv", function(d) {
		//parse data
	  	d.Count = +d.Count;
	  	return d;
	}, function(error, data) {
	  	if (error) throw error;

	  	// append g elements (arc)
	  	var arc = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc").attr("id", function(d) { return types(d.data.Type); });

	  	// append path of the arc
	  	arc.append("path").attr("d", path).attr("fill", function(d) { return color(d.data.Type); })
	  	.on("click", function(d, clicked_id) {
	  		back.disabled = false;
			back.style.background = "#4CAF50";
	  		subChart(typeDict[clicked_id]);
	  	});

	  	arc.append("text")
	      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
	      .attr("dy", "0.35em")
	      .text(function(d) { return d.data.Type + "(" + d.data.Count + ")"; });
	});

}

function subDiv(type, numData) {
	var textDiv = document.getElementById("textDiv");
	textDiv.innerHTML = "<p id='type'>" + infoDict[type] + "</p>" + 
	"<p>" + "Average Attack: " + numData[0] + "</p>" + 
	"<p>" + "Attack is an offensive stat used to determine the power of attacks that come in physical contact with the opponent." + "</p>" + 
	"<p>" + "Average Defense: " + numData[1] + "</p>" + 
	"<p>" + "Defense is the direct defensive counterpart to the Attack stat." + "</p>" + 
	"<p>" + "Average Hp: " + numData[2] + "</p>" + 
	"<p>" + "Hp determines how much health a Pokemon has." + "</p>" + 
	"<p>" + "Average Special Attack: " + numData[3] + "</p>" + 
	"<p>" + "Special Attack is similar to the attack stat, focusing on abilities that don't make direct contact with an opponent." + "</p>" + 
	"<p>" + "Average Special Defense: " + numData[4] +"</p>" + 
	"<p>" + "Special Defense is the direct defensive counterpart to the Special Attack stat." + "</p>" + 
	"<p>" + "Average Speed: " + numData[5] +"</p>" + 
	"<p>" + "Speed determines which Pokemon goes first in a battle." + "</p>";
	var typeHeader = document.getElementById("type");
	typeHeader.style.fontSize = "26px";
	typeHeader.style.color = colorDict[type];

}

function firstText() {
	var textDiv = document.getElementById("textDiv");
	textDiv.innerHTML = 
	"<p id='annotation'> You can click on any of the slices on the chart to view more information about that type! </p>" + 
	"<p id='description'>This pie chart includes ALL of the Pokemon in the Pokemon universe," + 
	" and gives an accurate overview of the the number of one type versus the overall number of types." +
	" You might notice that all types aren't created equal. There are a large number of water " + 
	"types compared to the others, and there are a smaller number of dragon types, for example. Water Pokemon " + 
	"are fairly abundant due to the large bodies of water in the game. Almost all Pokemon found in the water is going " +
	"to be water type, so there will be a fairly large amount of them. Dragon types are one of the coolest types " +
	"in the game, modeled after dragons, of course. They are fairly rare and only Pokemon found near the end of the game" +
	" have this type. You can make your own assumptions based off of this pie chart. </p>"
}


