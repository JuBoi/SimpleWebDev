/*
 This is a comment
*/

//This is also a comment

/*
 This is how you write a function:

 function multiply(num1, num2) {
	var result = num1 * num2;
	return result
 }

 Then just call multiply, like this:
 multiply(4,7) should return 28
*/
var myImage = document.querySelector('#overwatch');

myImage.onclick = function() {
	var mySrc = myImage.getAttribute('src');
	var myHeading = document.querySelector('h1');
	if(mySrc === 'images/overwatch.png'){
		myImage.setAttribute('src', 'images/teemo.png');
		myHeading.textContent = 'SURPRISE TEEMO!';
	} else {
		myImage.setAttribute('src', 'images/overwatch.png');
		myHeading.textContent = 'Overwatch is for Cool Kids!';
		alert('topkek you have been memed by the badgo');
	}
}

var myButton = document.querySelector('button');
var last = document.querySelector('#potato');

function setUserName() {
  var myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  last.textContent = myName;
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  last.textContent = storedName;
}

myButton.onclick = function() {
  setUserName();
}