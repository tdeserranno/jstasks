//^^^^IMAGES.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====GLOBALS===================================================================
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
//====FUNCTIONS=================================================================
function addButtons() {
  //get all div.toggle elements
  var eScreenshotDivs = document.querySelectorAll('div.toggle');
  //add button to each related dd element
  for (var i = 0; i < eScreenshotDivs.length; i++) {
    //create button element
    var eIndivToggleButton = document.createElement('button');
    //set default button text
    eIndivToggleButton.innerHTML = buttonTexts[lang]['hide'];
    //set button index
    eIndivToggleButton.setAttribute('data-index', i);
    //set button event handler
    eIndivToggleButton.addEventListener('click', function(event) {
      toggleScreenshot(this.dataset['index']);
    });
    //add button to screenshot div before image
    eScreenshotDivs[i].insertBefore(eIndivToggleButton, eScreenshotDivs[i].firstChild);
    //bovenstaande kan eenvoudiger !? plaats button voor de image tag??
    //maar dan moet de image verborgen worden en niet de volledige div
  }
}
function toggleScreenshot(index) {
  //get all screenshot divs
  var eScreenshots = document.querySelectorAll('div.toggle img');
  //get all buttons
  var eScreenshotButtons = document.querySelectorAll('div.toggle button');
  //hide single screenshot based on index
  //check display state, hide when visible or show when hidden
  //change button text accordingly
  //TEST ONVOLLEDIG, moet getest worden of er effectief een inline style is voordat je test of die none is
  //Beter nog is testen op computed style met window.getcomputedstyle of element.currentstyle(IE8 down)
  var imgComputedStyle = window.getComputedStyle(eScreenshots[index]);
  if (imgComputedStyle.display === 'none' || eScreenshots[index].style.display === 'none') {
    eScreenshots[index].style.display = 'block';
    eScreenshotButtons[index].innerHTML = buttonTexts[lang]['hide'];
  } else {
    eScreenshots[index].style.display = 'none';
    eScreenshotButtons[index].innerHTML = buttonTexts[lang]['show'];
  }
}
//====WINDOW.ONLOAD=============================================================
window.onload = function() {
  //buttons
  //mainbutton
  var eMainButton = document.getElementById('hoofdknop');
  
  //set main button default button text
  eMainButton.innerHTML = buttonTexts[lang]['hideAll'];
  //individual buttons
  addButtons();
  
  //Eventhandlers
  //mainbutton eventhandler
  eMainButton.addEventListener('click',function() {
    //get all screenshot buttons
    var eScreenshotButtons = document.querySelectorAll('div.toggle button');
    //get all screenshots
    var eScreenshots = document.querySelectorAll('img.screenshot');
    //check hide or show
    if (eMainButton.innerHTML === buttonTexts[lang]['hideAll']) {
      //hide screenshots
      for (var i = 0; i < eScreenshots.length; i++) {
        eScreenshots[i].style.display = 'none';
        eScreenshotButtons[i].innerHTML = buttonTexts[lang]['show'];
      }
      //set button text
      eMainButton.innerHTML = buttonTexts[lang]['showAll'];
    } else {
      //show screenshots
      for (var i = 0; i < eScreenshots.length; i++) {
        eScreenshots[i].style.display = 'block';
        eScreenshotButtons[i].innerHTML = buttonTexts[lang]['hide'];
      }
      //set button text
      eMainButton.innerHTML = buttonTexts[lang]['hideAll'];
    }
  });
};