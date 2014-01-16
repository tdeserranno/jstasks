window.onload = function() {
  //hoofdknop
  var mainButton = document.getElementById('hoofdknop');
  //hoofdknop eventhandler
  mainButton.addEventListener('click',function() {
    //get all screenshots
    eScreenshots = document.querySelectorAll('div.toggle');
    //check hide or show
    if (mainButton.innerHTML === 'Alle schermen verbergen') {
      //hide screenshots
      for (var i = 0; i < eScreenshots.length; i++) {
        eScreenshots[i].style.display = 'none';
      }
      //set button text
      mainButton.innerHTML = 'Alle schermen tonen';
    } else {
      //show screenshots
      for (var i = 0; i < eScreenshots.length; i++) {
        eScreenshots[i].style.display = 'block';
      }
      //set button text
      mainButton.innerHTML = 'Alle schermen verbergen';
    }
  });
  
  //add individual toggle option for each screenshot
  //get all dt elements
  var eDts = document.querySelectorAll('article dt');
  //add button to each dt
  for (var i = 0; i < eDts.length; i++) {
    var indivToggle = document.createElement('button');
    indivToggle.innerHTML = 'Screenshot';
    //eventhandler for indivToggle button
    indivToggle.addEventListener('click',function() {
      
    });
    eDts[i].appendChild(indivToggle);
    
  }
};