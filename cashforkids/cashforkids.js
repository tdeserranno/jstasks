//**** GLOBALS *****************************************************************
var baseAmountPerKid = 25;
//**** WINDOW.ONLOAD ***********************************************************
window.onload = function(){
    //button
    var button = document.getElementById('deKnop');
    button.onclick = calculate;
};
//**** FUNCTIONS ***************************************************************
function calcBase(kids){
    var baseAmount = 0;
    var amountOntop1 = 12.5;
    var amountOntop2 = 7.5;
    var numberOfKidsOntop1 = 3;
    var numberOfKidsOntop2 = 5;
    
    for(var i=1; i <= kids;i++){
        baseAmount += baseAmountPerKid;
        if (i >= numberOfKidsOntop1) {
            baseAmount += amountOntop1;
            if(i >= numberOfKidsOntop2){
                baseAmount += amountOntop2;
            }
        }
    }
    return baseAmount;
}
function salaryAdjust(kidscash, salary){
    var minSalary = 500;
    var minMultiplier = 1.25;
    var maxSalary = 2000;
    var maxMultiplier = 0.65;
    
    var adjResult = kidscash;
    
    if (salary <= minSalary){
        adjResult *= minMultiplier;
    }
    if (salary >= maxSalary){
        adjResult *= maxMultiplier;
    }
    return adjResult;
}
function checkMinimum(kidscash, kids){
    var minResult = kidscash;
    var base = kids * baseAmountPerKid;
    if (minResult < base) {
        minResult = base;
    }
    return minResult;
}
function calculate(){
    //
  
  
    //input elements
    var inputKinderen = document.getElementById('kinderen');
    var inputMaandloon = document.getElementById('maandloon');
    
    //values
    var kinderen = parseInt(inputKinderen.value);
    var loon = parseInt(inputMaandloon.value);
    
    //output element
    var output = document.getElementById('output');
    
    //logic
    var baseKindergeld = 0;
    var adjustedKindergeld = 0;
    var finalKindergeld = 0;
    //check if input isn't zero
    if (kinderen > 0){
        if (loon > 0){
            //calculate base cash
            baseKindergeld = calcBase(kinderen);
            console.log('base: '+baseKindergeld);
            //adjust based on salary
            adjustedKindergeld = salaryAdjust(baseKindergeld, loon);
            console.log('salaryadjusted: '+adjustedKindergeld);
            //check minimum
            finalKindergeld = checkMinimum(adjustedKindergeld, kinderen);
            //output
            output.innerHTML = 'Kindergeld = ' + finalKindergeld + '€.';
        }else{
            alert('Maandloon is niet correct');
        }
    } else {
        alert('Aantal kinderen is niet correct');
    }
}
