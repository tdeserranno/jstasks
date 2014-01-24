//^^^^DIVISION.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====WINDOW.ONLOAD=============================================================
window.onload = function(){
    //button
    var button = document.getElementById('deKnop');
    button.onclick = calculate;
};
//====FUNCTIONS=================================================================
function divide(deeltal, deler){
    var result = '';
    if (deler === 0){
        alert('Deling door nul - ABORT');
    } else {
        result = deeltal/deler;
    }
    return result;
}
function calculate(){
    //input elements
    var inputGetal1 = document.getElementById('getal1');
    var inputGetal2 = document.getElementById('getal2');
    
    //values
    var getal1 = parseInt(inputGetal1.value);
    var getal2 = parseInt(inputGetal2.value);
    
    //output element
    var output = document.getElementById('output');
    
    //logic
    //determine smaller number
    if (getal1 < getal2) {
        output.innerHTML = divide(getal2,getal1);
    } else {
        output.innerHTML = divide(getal1,getal2);
    }
}
