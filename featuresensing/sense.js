window.onload = function() {
  //check if aFeatures array is loaded
  if (typeof aFeatures == 'undefined') {
    throw new Error('aFeatures array not available');
  } else {
    //elements
    var eOutput = document.getElementById('container');
    var eList = document.createElement('ul');
    
    //cycle through aFeatures
    for (var i = 0; i < aFeatures.length; i++) {
      //create listitem
      var eItem = document.createElement('li');
      var featureSpan = document.createElement('span');
      var supportedSpan = document.createElement('span');
      featureSpan.className = 'col1';
      featureSpan.innerHTML = aFeatures[i][1];
      supportedSpan.className = 'col2';
      //add columns to eItem
      eItem.appendChild(featureSpan);
      eItem.appendChild(supportedSpan);
      //check feature
      if (aFeatures[i][0]) {
        //feature supported
        //add Yes to column 2
        supportedSpan.innerHTML = 'Yes';
        //add .support class to eItem
        eItem.className = 'support';
      } else {
        //feature not supported
        //add No to column 2
        supportedSpan.innerHTML = 'No';
        //add .nosupport class to eItem
        eItem.className = 'nosupport';
      }
      //add eItem to eList
      eList.appendChild(eItem);
    }
    //output eList
    eOutput.appendChild(eList);
  }
};