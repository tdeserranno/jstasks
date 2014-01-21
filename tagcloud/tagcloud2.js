//=========GLOBALS==============================================================
////het array met de tags
//elk item is zelf een Array met de naam, het huidig aantal stemmen en het vorig aantal stemmen die het kreeg
var arrTags = [
  ["Javascript", 1634, 987],
  ["jQuery", 1111, 34],
  ["PHP", 1024,1122],
  ["Asp.Net", 977, 1005],
  ["Photoshop", 594, 789],
  ["XML", 40, 666],
  ["Access", 55, 77],
  ["Java", 278, 277],
  ["MySQL", 155, 122]
];
//font classes
var aoFontClass = {
  xxsmall : 0.4,
  xsmall : 0.6,
  small : 0.8,
  medium : 1,
  large : 1.3,
  xlarge : 1.6,
  xxlarge : 1.9
}

//=========WINDOW.ONLOAD========================================================
window.onload = function() {
//  console.log(fnCalcBaseVoteCount(arrTags));
  //get tag container
  var eTagContainer = document.getElementById('tagContainer');
  //create tags inside container
  fnCreateTags(arrTags, eTagContainer, 20);
};
//=========FUNCTIONS============================================================
/**Calculate average vote count.
 * That will be used together with the global baseFontSize to calculate the
 * fontsize for each item
 * 
 * @param {type} aData , array of cloud tags
 * @returns {Number} , average votecount
 */
function fnCalcBaseVoteCount(aData) {
  var voteCount = 0;
  for (var i = 0; i < aData.length; i++) {
    if ((aData[i][1] !== 'undefined') && (!isNaN(aData[i][1]))) {
      voteCount += aData[i][1];
    }
  }
  voteCount = voteCount / aData.length;
  return parseInt(voteCount);
}
/**Create span elements for each item in aData array and position randomly
 * within eContainer
 * 
 * @param {type} aData , array of cloud tags
 * @param {type} eContainer , container where to create cloud tags
 * @returns {undefined}
 */
function fnCreateTags(aData, eContainer, nBaseFontSize) {
  //=======VARIABLES===========
  //average votecount, needed to calculate representational fontsize for each item
  var nBaseVoteCount = fnCalcBaseVoteCount(arrTags);
  //=======LOGIC===============
  //set container basefontsize
  eContainer.style.fontSize = nBaseFontSize;
  //create tags
  for (var i = 0; i < aData.length; i++) {
    //create span
    var eTagSpan = document.createElement('span');
    //set span class
    eTagSpan.className = 'tag';
    //set span content
    eTagSpan.innerHTML = aData[i][0];
    //set span fontclass
    eTagSpan.className += ' ' + fnCalcTagFontClass(aData[i], nBaseVoteCount);
    //set span color
    eTagSpan.style.color = fnCalcTagColor(aData[i]);
    //position span in container
    fnPositionTag(eTagSpan, eContainer);
    //add span to container
    eContainer.appendChild(eTagSpan);
  }
}
/**Determine the fontsize class for a given cloud item based on the ratio between 
 * item votecount and basevotecount and the basefontsize
 * 
 * @param {type} aTag , tag data
 * @param {type} nBaseFontSize
 * @param {type} nBaseVoteCount
 * @returns {Number|fnCalcTagFontsize.fontRatio}
 */
function fnCalcTagFontClass(aTag, nBaseVoteCount) {
  var fontClass = 'medium';
  var voteRatio = parseInt(aTag[1]) / nBaseVoteCount;
  voteRatio.toFixed(1);
  console.log(voteRatio);
  console.log(voteRatio.toFixed(1));
  if (voteRatio <= aoFontClass.xxsmall) {
    fontClass = 'xxsmall';
  } else if (voteRatio <= aoFontClass.xsmall) {
    fontClass = 'xsmall';
  } else if (voteRatio <= aoFontClass.small) {
    fontClass = 'small';
  } else if (voteRatio <= aoFontClass.medium) {
    fontClass = 'medium';
  } else if (voteRatio <= aoFontClass.large) {
    fontClass = 'large';
  } else if (voteRatio <= aoFontClass.xlarge) {
    fontClass = 'xlarge';
  } else if (voteRatio <= aoFontClass.xxlarge) {
    fontClass = 'xxlarge';
  }
//  console.log(nBaseFontSize + ' , ' + fontRatio + ' , ' + fontSize);
//  console.log(fontSize);
  return fontClass;
}
/**Determines tag color based on current votes and previous votes stored in 
 * data array
 * 
 * @param {type} aTag , tag data
 * @returns {String} , tag color
 */
function fnCalcTagColor(aTag) {
  var color = 'black';
  if (!isNaN(aTag[1]) || !isNaN(aTag[2])) {
    if (aTag[1] !== aTag[2]) {
      if (aTag[1] < aTag[2]) {
//        console.log('down');
        color = 'red';
      } else {
//        console.log('up');
        color = 'green';
      }
    } else {
//      console.log('steady');
    }
  }
  return color;
}
/**Position tag randomly within container
 * 
 * @param {type} eTag , tag element
 * @param {type} eContainer , container element
 * @returns {undefined}
 */
function fnPositionTag(eTag, eContainer) {
  var nContainerHeight = parseInt(getComputedStyle(eContainer).getPropertyValue('height'));
  var nContainerWidth = parseInt(getComputedStyle(eContainer).getPropertyValue('width'));

  eTag.style.top = fnRandomPos(nContainerHeight) + 'px';
  eTag.style.left = fnRandomPos(nContainerWidth) + 'px';
}
/**Generate a random position based nLimit
 * 
 * @param {type} nMaxPos
 * @returns {Number}
 */
function fnRandomPos(nLimit) {
  var pos = Math.round(Math.random() * nLimit);
  return pos;
}