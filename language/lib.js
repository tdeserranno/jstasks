//^^^^LIB.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====GLOBALS===================================================================
var vandaag = new Date();
//====COOKIES===================================================================
/**Plaatst/schrijft een cookie
 * 
 * @param {type} naam , cookienaam
 * @param {type} waarde , inhoud van cookie
 * @param {type} dagen , optioneel, geldige periode van cookie
 *                        indien afwezig => session cookie
 */
function setCookie(naam, waarde, dagen) {
  var verval = '';
  if (dagen) {
    var vervalDatum = new Date(vandaag.getTime() + dagen * 24 * 60 * 60 * 1000);
    verval = vervalDatum.toUTCString();
  }
  document.cookie = naam + '=' + waarde + ';expires=' + verval;
}
/**Lees een cookie
 * 
 * @param {type} naam , cookienaam
 * @returns {string} inhoud van cookie
 */
function getCookie(naam) {
  var zoek = naam + '=';
  if (document.cookie.length > 0) {
    var begin = document.cookie.indexOf(zoek);
    if (begin !== -1) {
      begin += zoek.length;
      var einde = document.cookie.indexOf(';', begin);
      if (einde === -1) {
        einde = document.cookie.length;
      }
      return document.cookie.substring(begin, einde);
    }
  }
}
/**Wist een cookie
 * 
 * @param {type} naam , cookienaam
 */
function clearCookie(naam) {
  setCookie(naam,'',-1);
}
//====LANGUAGE FUNCTIONS========================================================
function langRedirect(language) {
  //check language and redirect to correct page
  switch(language) {
    case 'nl':
      //redirect to nederlands.html
      window.location = 'nederlands.html';
      break;
    case 'fr':
      //redirect to francais.html
      window.location = 'francais.html';
      break;
    case 'en':
      //redirect to english.html
      window.location = 'english.html';
      break;
    default:
      //redirect to english.html
      window.location = 'english.html';
      break;
  }
}
function langReset() {
  //check webstorage support
  if (localStorage) {
    //clear storage
    localStorage.clear();
  } else {
    //webstorage not supported, use cookies
    //clear cookie
    clearCookie('lang');
  }
}
function langSet(language) {
  //check webstorage support
  if (localStorage) {
    //set lang storage variable
    localStorage.lang = language;
  } else {
    //webstorage not supported, use cookies
    //set lang cookie
    setCookie('lang', language, 100);
  }
}