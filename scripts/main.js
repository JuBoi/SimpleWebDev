
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

var textDict = {};
// textDict.normal = getDesc("normal");
// textDict.fire = getDesc("fire");
// textDict.water = getDesc("water");
// textDict.electric = getDesc("electric");
// textDict.grass = getDesc("grass");
// textDict.ice = getDesc("ice");
// textDict.fighting = getDesc("fighting");
// textDict.poison = getDesc("poison");
// textDict.ground = getDesc("ground");
// textDict.flying = getDesc("flying");
// textDict.bug = getDesc("bug");
// textDict.rock = getDesc("rock");
// textDict.ghost = getDesc("ghost");
// textDict.dragon = getDesc("dragon");
// textDict.dark = getDesc("dark");
// textDict.steel = getDesc("steel");
// textDict.fairy = getDesc("fairy");

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
		firstChart();
		check = false;
		// next.disabled = true;
		// next.style.background = "#8D8282";
	}
	else {
		subChart("normal");
	}
}

function removeStuff() {
	if(check) {
		$('#heading').remove();
		$('#pokeball').remove();
		$('#first').remove();
		$('#second').remove();
	}
	essayButton.style.visibility = "hidden";
	var textDiv = document.createElement("div");
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
	textDiv.id = "textDiv";
	dataDiv.appendChild(textDiv);
}

function subChart(type) {
	var height = 600;
	var width = 800;
	var barWidth = 35;
	var barOffset = 5;
	d3.csv("./data/type1stats.csv", function(data) {
		var i;
		console.log(data);
		// for(i = 0; i < data.length; i++){
		// 	//console.log(d[i]);
		// 	if(type == data[i][0]) {
		// 		console.log(d[i]);
		// 	}
		// }
	})
}

function firstChart() {
	d3.select("div").append("svg").attr("width", 800).attr("height", 600);
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
	  	arc.append("path").attr("d", path).attr("fill", function(d) { return color(d.data.Type); });

	  	arc.append("text")
	      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
	      .attr("dy", "0.35em")
	      .text(function(d) { return d.data.Type + "(" + d.data.Count + ")"; });
	});

}




