var buttonTexts = {
  en:{
    hide : 'Hide screenshot',
    show : 'Show screenshot',
    hideAll : 'Hide all screenshots',
    showAll : 'Show all screenshots'
  },
  nl:{
    hide : 'Screenshot verbergen',
    show : 'Screenshot tonen',
    hideAll : 'Alle screenshots verbergen',
    showAll : 'Alle screenshots tonen'
  },
  fr:{
    hide : 'Masquer l\'image',
    show : 'Montrer l\'image',
    hideAll : 'Masquer toutes les images',
    showAll : 'Montrer toutes les images'
  }
};
//set language
var lang = 'nl';
/*
 * add individual toggle option for each screenshot
 */
function addButtons() {
  //get all div.toggle elements
  var eScreenshotDivs = document.querySelectorAll('article dd div.toggle');
  //add button to each related dd element
  for (var i = 0; i < eScreenshotDivs.length; i++) {
    //create button element
    var eIndivToggleButton = document.createElement('button');
    //set default button text
    eIndivToggleButton.innerHTML = buttonTexts[lang]['hide'];
    //set button event handler
    eIndivToggleButton.setAttribute('onclick', 'hideScreenshot(' + i + ')');
    //add button to dd before screenshot div
    eScreenshotDivs[i].parentNode.insertBefore(eIndivToggleButton, eScreenshotDivs[i].parentNode.lastChild.previousSibling);
    //bovenstaande kan eenvoudiger !? plaats button voor de image tag??
    //maar dan moet de image verborgen worden en niet de volledige div
  }
}
function hideScreenshot(index) {
  //get all screenshots
  var eScreenshotDivs = document.querySelectorAll('article dd div.toggle');
  //get all buttons
  var eScreenshotButtons = document.querySelectorAll('article dd button');
  //hide single screenshot based on index
  //check display state, hide when visible or show when hidden
  //change button text accordingly
  //TEST ONVOLLEDIG, moet getest worden of er effectief een inline style is voordat je test of die none is
  //Beter nog is testen op computed style met window.getcomputedstyle of element.currentstyle(IE8 down)
  var computedStyle = window.getComputedStyle(eScreenshotDivs[index]);
  if (computedStyle.display === 'none' || eScreenshotDivs[index].style.display === 'none') {
    eScreenshotDivs[index].style.display = 'block';
    eScreenshotButtons[index].innerHTML = buttonTexts[lang]['hide'];
  } else {
    eScreenshotDivs[index].style.display = 'none';
    eScreenshotButtons[index].innerHTML = buttonTexts[lang]['show'];
  }
}
window.onload = function() {
  //buttons
  //mainbutton
  var mainButton = document.getElementById('hoofdknop');
  
  //set main button default button text
  mainButton.innerHTML = buttonTexts[lang]['hideAll'];
  //individual buttons
  addButtons();
  
  //Eventhandlers
  //mainbutton eventhandler
  mainButton.addEventListener('click',function() {
    //get all screenshot buttons
    var eScreenshotButtons = document.querySelectorAll('article dd button');
    //get all screenshot divs
    var eScreenshotDivs = document.querySelectorAll('article dd div.toggle');
    //check hide or show
    if (mainButton.innerHTML === buttonTexts[lang]['hideAll']) {
      //hide screenshots
      for (var i = 0; i < eScreenshotDivs.length; i++) {
        eScreenshotDivs[i].style.display = 'none';
        eScreenshotButtons[i].innerHTML = buttonTexts[lang]['show'];
      }
      //set button text
      mainButton.innerHTML = buttonTexts[lang]['showAll'];
    } else {
      //show screenshots
      for (var i = 0; i < eScreenshotDivs.length; i++) {
        eScreenshotDivs[i].style.display = 'block';
        eScreenshotButtons[i].innerHTML = buttonTexts[lang]['hide'];
      }
      //set button text
      mainButton.innerHTML = buttonTexts[lang]['hideAll'];
    }
  });
};