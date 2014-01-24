//^^^^SHOP.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====GLOBALS===================================================================
var aoShops = [
  {naam:"de fruitmand",adres:"steenstraat 34", post:8000,gemeente:"Brugge",tel:"050342218",manager:"Francine Lapoule"},
  {naam:"Jos & Anneke",adres:"visserijstraat 1", post:8400,gemeente:"Oostende",tel:"059463689",manager:"Jos Leman"},
  {naam:"groene vingers",adres:"hoogstraat 108", post:9000,gemeente:"Gent",tel:"091342218"},
  {naam:"de buurtwinkel",adres:"die laene 22", post:2000,gemeente:"Antwerpen",tel:"0230342218",manager:"Bert Simoens"}
  ];
var aProducts = [
  ["aardappelen",0.95,"kg"],
  ["avocado",2.69,"stuk"],
  ["bloemkool",1.93,"stuk"],
  ["brocoli",1.29,"stuk"],
  ["champignons",0.89,"250g"],
  ["chinese kool",1.59,"stuk"],
  ["groene kool",1.69,"stuk"],
  ["knolselder",1.29,"stuk"],
  ["komkommer",2.49,"stuk"],
  ["kropsla",1.69,"stuk"],
  ["paprika",0.89,"net"],
  ["prei",2.99,"bundel"],
  ["princessenbonen",1,"250g"],
  ["rapen",0.99,"bundel"],
  ["kropsla",1.69,"stuk"],
  ["rode kool",1.39,"stuk"],
  ["sla iceberg",1.49,"stuk"],
  ["spinazie vers",1.89,"300g"],
  ["sjalot",0.99,"500g"],
  ["spruiten",1.86,"kg"],
  ["trostomaat",2.99,"500g"],
  ["ui",0.89,"kg"],
  ["witloof 1ste keus",1.49,"700g"],
  ["wortelen",2.59,"kg"],
  ["courgetten",1.5,"stuk"]
];
var aShoppingCart = [];
//====WINDOW.ONLOAD=============================================================
window.onload = function() {
  //DOM ELEMENTS
  var eShops = document.querySelector('#winkel');
  var eProducts = document.querySelector('#groente');
  var eQuantity = document.querySelector('#aantal');
  var eButtonAdd = document.querySelector('#toevoegen');

  //CREATE SHOP SELECT OPTIONS
  for (var i = 0; i < aoShops.length; i++) {
    var sTitle = aoShops[i].adres + ', ' + aoShops[i].post + ' ' + aoShops[i].gemeente;
    createSelectOption(eShops, i, aoShops[i].naam, sTitle);
  }
  
  //CREATE PRODUCT SELECT OPTIONS
  for (var i = 0; i < aProducts.length; i++) {
    var sText = '';
    sText += aProducts[i][0] + ' ';
    sText += '(' + aProducts[i][1] + ' €/' + aProducts[i][2] + ')';
    createSelectOption(eProducts, i, sText);
  }
  
  //EVENT HANDLER FOR BUTTONADD
  eButtonAdd.addEventListener('click', function(event) {
    if (validateForm(document.frmBestel) === true) {
      addItem(eProducts.value, eQuantity.value);
      showShoppingCart();
    }
  });
  
  //SHOW CURRENT SHOPPINGCART
  showShoppingCart();
};
//====FUNCTIONS=================================================================
/**Adds an item to the shoppingcart
 * 
 * @param {type} productIndex data array index of selected product
 * @param {type} quantity selected quantity
 * @returns {undefined}
 */
function addItem(productIndex, quantity) {
//  console.log('productid %s, aantal %s', productIndex, quantity);
  //CHECK IF ITEM ALREADY EXISTS IN CART
  var itemIndex = itemExists(productIndex);
  if (itemIndex !== null) {
    //UPDATE ITEM QUANTITY
    aShoppingCart[itemIndex][2] = parseInt(aShoppingCart[itemIndex][2]) + parseInt(quantity); 
  } else {
    //CREATE NEW ITEM
    /* Get length of shoppingcart array, that length will be the itemindex for the
   * item to be added
   */
    var itemIndex = aShoppingCart.length;
    console.log(itemIndex);
    var aItem = [
      itemIndex,
      productIndex,
      quantity
    ];
    aShoppingCart.push(aItem);
  }
}
/**Check if selected product already exists in shopping cart
 * 
 * @param {type} productIndex product data array identifier
 * @returns {Number} null if not found, aShoppingCart index if found
 */
function itemExists(productIndex) {
  var index = null;
  var nItems = aShoppingCart.length;
  if (nItems > 0) {
    var i = 0;
    while (aShoppingCart[i] && aShoppingCart[i][1] !== productIndex && i < nItems) {
      i++;
    }
    if (i < nItems) {
      index = i;
    }
  }
  return index;
}
/**Shows contents of aShoppingCart variable
 * 
 * @returns {undefined}
 */
function showShoppingCart() {
  var eShoppingCartDiv = document.querySelector('#winkelmandje');
  var eItemDivs = document.querySelectorAll('#winkelmandje .item');
  var nLastItemDiv = eItemDivs.length - 1;
  var eTotalDiv = eItemDivs[nLastItemDiv];
  
  //CHECK IF SHOPPINGCART CONTAINS ITEMS, CLEAR ITEMDIVS
  if (aShoppingCart.length > 0) {
    for (var i = 0; i < eItemDivs.length; i++) {
      if (eItemDivs[i].id !== 'totaal') {
        eShoppingCartDiv.removeChild(eItemDivs[i]);
      }
    }
  }
  //SHOW ALL SHOPPINGCART ITEMS, INSERT BEFORE TOTAL DIV
  var itemDf = document.createDocumentFragment();
  for (var i = 0; i < aShoppingCart.length; i++) {
    //create item container
    var eItemDiv = document.createElement('div');
    eItemDiv.setAttribute('class', 'item');
    //product name
    var eItemNameSpan = document.createElement('span');
    eItemNameSpan.innerHTML = aProducts[aShoppingCart[i][1]][0];
    eItemNameSpan.setAttribute('class', 'cel cellinks');
    eItemDiv.appendChild(eItemNameSpan);
    //quantity
    var eItemQuantitySpan = document.createElement('span');
    eItemQuantitySpan.innerHTML = aShoppingCart[i][2];
    eItemQuantitySpan.setAttribute('class', 'cel');
    eItemDiv.appendChild(eItemQuantitySpan);
    //unit price
    var eItemUPriceSpan = document.createElement('span');
    eItemUPriceSpan.innerHTML = aProducts[aShoppingCart[i][1]][1];
    eItemUPriceSpan.setAttribute('class', 'cel');
    eItemDiv.appendChild(eItemUPriceSpan);
    //subtotal
    var eItemSubTotalSpan = document.createElement('span');
    eItemSubTotalSpan.innerHTML = calculateItemTotal(
            parseFloat(aProducts[aShoppingCart[i][1]][1]),
            parseInt(aShoppingCart[i][2]));
    eItemSubTotalSpan.setAttribute('class', 'cel celrechts');
    eItemDiv.appendChild(eItemSubTotalSpan);
    //add item to docfrag
    itemDf.appendChild(eItemDiv);
  }
  eShoppingCartDiv.insertBefore(itemDf, eTotalDiv);
  
  //SHOW CART TOTAL
  var eTotalValueDiv = document.querySelector('#totNum');
  eTotalValueDiv.innerHTML = calculateCartTotal();
}
/**Calculate shoppingcart item subtotal
 * 
 * @param {type} price
 * @param {type} quantity
 * @returns {unresolved}
 */
function calculateItemTotal(price, quantity) {
  return (price * quantity).toFixed(2);
}
/**Calculate shoppingcart total
 * 
 * @returns {Number}
 */
function calculateCartTotal() {
  var total = 0;
  var eSubTotalSpans = document.querySelectorAll('span.celrechts');
  
  for (var i = 0; i < eSubTotalSpans.length; i++) {
    total += parseFloat(eSubTotalSpans[i].innerHTML);
  }
  return total.toFixed(2);
}
/**Create option element with given id and text in given select element
 * 
 * @param {SelectElement} elem parent select element for option element
 * @param {Int} optionIndex data array index for option element
 * @param {String} optionText text for option element
 * @param {String} optionTitle optional text for option title
 * @returns {undefined}
 */
function createSelectOption(elem, optionIndex, optionText, optionTitle) {
  var eOption = document.createElement('option');
  //set option value
  eOption.setAttribute('value', optionIndex);
  //set option title if present
  if (optionTitle) {
    eOption.setAttribute('title', optionTitle);
  }
  //set option text
  eOption.innerHTML = optionText;
  //append to select element
  elem.appendChild(eOption);
}
/**Form validation
 * 
 * @param {type} frm formname
 * @returns {undefined}
 */
function validateForm(frm) {
  hideErrors();
  var errors = [];
  var sShop = frm.winkel.value;
  var sProduct = frm.groente.value;
  var nQuantity = parseInt(frm.aantal.value);
  
  if (sShop === ''){
    errors.push('Geen winkel geselecteerd');
  }
  if (sProduct === '') {
    errors.push('Geen groente geselecteerd');
  }
  if (nQuantity <= 0 || isNaN(nQuantity)) {
    errors.push ('Aantal geen cijfer groter dan 0');
  }
  
  if (errors.length > 0) {
//    console.log(errors);
    showErrors(errors);
    return false;
  } else {  
    return true;
  }
}
function showErrors(errors) {
  var eErrorDiv = document.querySelector('#errors');
  var eList = document.createElement('ul');
  eList.setAttribute('class', 'fouten');
  for (var i = 0; i < errors.length; i++) {
    var eLi = document.createElement('li');
    eLi.innerHTML = errors[i];
    eList.appendChild(eLi);
  }
  eErrorDiv.appendChild(eList);
}
function hideErrors() {
  var eErrorDiv = document.querySelector('#errors');
//  console.log(eErrorDiv.childNodes.length);
  while (eErrorDiv.childNodes.length > 0 ) {
    eErrorDiv.removeChild(eErrorDiv.firstChild);
  }
}