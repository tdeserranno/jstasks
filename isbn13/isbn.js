
/**** OPLOSSING ISBN10 zonder taak -> met taak (ISBN13) zie JS_taakbasis_isbn13_afgewerkt.html ****/
//globals
var divOutput;
var isbnVeld;
var frm;
var arrISBN = [
  '978-90-209-7557-4',
  '978-2-87386-537-5',
  '0-596-00048-0',
  '0 9579218 4 3',
  '90-430-0508-8',
  '90-430-0779-X',
  '978-90-209-7455-3',
  '048629868X',
  '0_140009_930',
  '978-0552139823',
  '978-0-596-51774-8',
  '978-1-59059-908-2'
];

//*******************************
window.onload = function(){
  var divOutput = document.getElementById('output');
  var labelFout = document.getElementById('fout');
  var frm = document.frmISBN;
  var isbnVeld = frm.kw; //name kw noodzakelijk voor isbndb.com

  //lijst testwaarden
  var strNummers = "";
  for(var i = 0; i < arrISBN.length; i++){
    strNummers += arrISBN[i] + "<br />";
  }
  divOutput.innerHTML = strNummers;
  
  isbnVeld.onfocus = function() {
    labelFout.style.display = 'none';
  };

  //custom evenhandler voor form submit
  frm.onsubmit = function() {
    var isbn = isbnVeld.value;
    var geldig = isValidISBN(isbn);
    console.log('waarde is een geldig isbnnummer: ' + geldig);
    if (geldig === false) {
      labelFout.style.display = 'inline';
    }
    return geldig;
  };
};
//====FUNCTIONS=================================================================
function isValidISBN(isbn) {
  isbn = isbn.replace(/\s/gi, ''); //verwijder alle spaties
  isbn = isbn.replace(/\-/gi, ''); //verwijder alle koppeltekens
  var l = isbn.length;
  if (l === 10) {
    return validateISBN10(isbn);
  } else if (l === 13) {
    return validateISBN13(isbn);
  } else {
    return false;
  }
}
function validateISBN10(isbn) {
  var base9 = isbn.substr(0,9);
  var control = isbn.substr(9);
  if (!isNaN(base9)) {
    control = control.replace('X', '10', 'gi');
    control = parseInt(control);
    if (!isNaN(control)) {
      var sum = 0;
      for (var i = 0; i < base9.length; i++) {
        sum += parseInt(base9.charAt(i)) * (i + 1);
      }
      var modulo = sum % 11;
      return (control === modulo);
    } else {
    return false;
    }
  } else {
    return false;
  }
}
function validateISBN13(isbn) {
  var base12 = isbn.substr(0,12);
  var control = isbn.substr(12);
  if (!isNaN(base12)) {
    control = parseInt(control);
    if (!isNaN(control)) {
      var sumOdd = 0;
      var sumEven = 0;
      var i; //counter for odd numberposition
      var j; //counter for even numberposition
      for (i = 0, j = 1; i < base12.length; i += 2, j += 2) {
//        console.log(i + "," + j);
        sumOdd += parseInt(base12.charAt(i));
        sumEven += parseInt(base12.charAt(j));
      }
      var modulo = (10 - (sumOdd + (3 * sumEven)) % 10) % 10;
      return (control === modulo);
    } else {
    return false;
    }
  } else {
    return false;
  }
}