function calcBase(kids){
    var baseResult = 0;
    var basePerKid = 25;
    var ontop1 = 12.5;
    var ontop2 = 7.5;
    for(var i=1; i <= kids;i++){
        baseResult += basePerKid;
        if (i > 2) {
            baseResult += ontop1;
            if(i > 4){
                baseResult += ontop2;
            }
        }
    }
    return baseResult;
}
function salaryAdjust(kidscash, salary){
    var adjResult = kidscash;
    if (salary <= 500){
        adjResult *= 1.25;
    }
    if (salary >= 2000){
        adjResult *= 0.65;
    }
    return adjResult;
}
function checkMinimum(kidscash, kids){
    var minResult = kidscash;
    var base = kids*25;
    if (minResult < base) {
        minResult = base;
    }
    return minResult;
}
function calculate(){
    //input elements
    var inputKinderen = document.getElementById('kinderen');
    var inputMaandloon = document.getElementById('maandloon');
    
    //values
    var kinderen = parseInt(inputKinderen.value);
    var loon = parseInt(inputMaandloon.value);
    
    //output element
    var output = document.getElementById('output');
    
    //logic
    var baseCash = 0;
    var adjustedCash = 0;
    var finalCash = 0;
    //check if input isn't zero
    if (kinderen > 0){
        if (loon > 0){
            //calculate base cash
            baseCash = calcBase(kinderen);
            console.log('base: '+baseCash);
            //adjust based on salary
            adjustedCash = salaryAdjust(baseCash, loon);
            console.log('salaryadjusted: '+adjustedCash);
            //check minimum
            finalCash = checkMinimum(adjustedCash, kinderen);
            //output
            output.innerHTML = 'Kindergeld = ' + finalCash + '€.';
        }else{
            alert('Maandloon is niet correct');
        }
    } else {
        alert('Aantal kinderen is niet correct');
    }
}
window.onload = function(){
    //button
    var button = document.getElementById('deKnop');
    button.onclick = calculate;
}
;