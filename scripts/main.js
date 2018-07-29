
var essayButton = document.getElementById('essay');
var last = document.querySelector('#potato');
var modal =document.getElementById('Modal');
var span = document.getElementsByClassName("close")[0];

essayButton.onclick = function() {
	modal.style.display = "block";
}

span.onClick = function() {
	modal.style.display = "none";
}

window.onclick = function(event) {
	if(event.target == modal) {
		modal.style.display = "none";
	}
}