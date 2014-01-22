//^^^^LANGUAGE.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====WINDOW.ONLOAD=============================================================
window.onload = function() {
  //check webstorage support
  if (localStorage) {
    //check is storage variable is set
    if (localStorage.lang) {
      var sLang = localStorage.lang;
      langRedirect(sLang);
    } else {
      //storage var not set, stay on index.html
    }
  } else {
    //webstorage not supported, use cookies
    //check if cookie is set
    if (getCookie('lang')) {
      var sLang = getCookie('lang');
      langRedirect(sLang);
    } else {
      //cookie not set, stay on index.html
    }
  }
  //language links event handlers
  var eLangLinks = document.querySelectorAll('.langlist a');
  for (var i = 0; i < eLangLinks.length; i++) {
    var sLang = eLangLinks[i].lang;
    eLangLinks[i].addEventListener('click', function(event) {
      //prevent default behavior
      event.preventDefault();
      //custom behavior
      langSet(this.lang);
      langRedirect(this.lang);
    });
  }
};
