//^^^^LANGRESET.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====WINDOW.ONLOAD=============================================================
window.onload = function() {
  var eResetLink = document.getElementById('resetlang');
  eResetLink.addEventListener('click', function(event) {
    //prevent default behavior
    event.preventDefault();
    //custom link behavior
    langReset();
    window.location = 'index.html';
  });
};