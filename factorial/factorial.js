window.onload = function() {
  // Elements
  var button = document.getElementById('deKnop');
  var eNumber = document.getElementById('getal');
  var eOutput = document.getElementById('output');
  
  button.onclick = function() {
    var n = eNumber.value;
    if (n == '' || isNaN(n)) {
      alert('Deze functie werkt enkel met getallen');
    } else {
      n = parseInt(n);
      if (n < 0) {
        alert('Faculteit van een negatief getal bestaat niet')
      } else {
        eOutput.innerHTML = factorial(n);
      }
    }
  }
};
function factorial(number) {
  var result = 1;
  if (number !== 0) {
    for (var i = 1; i <= number; i++) {
      result *= i;
    }
  }
  return result;
}
