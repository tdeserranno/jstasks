window.onload = function() {
    
    //change title
    var title = document.getElementById('kop');
    title.innerHTML = 'De document tree';
    
    //change text of second <li>
    var allListItems = document.getElementsByTagName('li');
    var listItems = allListItems.length; //whats the point ???
    var secondItem = allListItems[1];//index starts at 0
    secondItem.removeChild(secondItem.childNodes[0]);
    var text = document.createTextNode('C#');
    secondItem.appendChild(text);
    
    //add new item to list
    var list = document.getElementsByTagName('ul')[0];
    var newItem = document.createElement('li');
    var text = document.createTextNode('Perl');
    newItem.appendChild(text);
    list.appendChild(newItem);
    
    /*taskitem 1 : use innerHTML to change
     *  "De meeste programmeurs leven op koffie"
     *  to
     *  "De meeste programmeurs leven op koffie en chocolade"*/
    var firstP = document.getElementsByTagName('p')[0];
    var pContent = firstP.innerHTML;
    pContent += ' en <em>chocolade</em>';
    firstP.innerHTML = pContent;
    
    /*taskitem 2 : add a div (id=footer) to the bottom of div#container with
     * the following text (including VDAB link and < >)
     * < je vindt een job op de VDAB website >*/
    var container = document.getElementById('container');
    var footer = document.createElement('div');
    footer.setAttribute('id', 'footer');
    footer.innerHTML = '< Je vindt een job op de <a href="http://www.vdab.be">VDAB</a> website >';
    container.appendChild(footer);
    
    /*taskitem 3 : show message in JS console
     * "dit document bevat in totaal X div elementen" where X is the number of
     * divs in the entire document*/
    var divs = document.getElementsByTagName('div');
    var msg = 'dit document bevat in totaal ' + divs.length + ' div elementen';
    console.log(msg);
    
    /*taskitem 4 : change hyperlink "science-fiction" to a google image search
     * on science-fiction */
    var googleSearchUrl = 'https://www.google.be/search?hl=en&site=imghp&tbm=isch&source=hp&biw=1280&bih=898&q=science-fiction&oq=science-fiction&gs_l=img.3..0j0i24l9.3812.7578.0.7968.17.10.1.6.7.0.141.968.8j2.10.0....0...1ac.1.32.img..0.17.1016.bk9pq-AQXDQ';
    var secondP = document.getElementsByTagName('p')[1];
    var scifiLink = secondP.getElementsByTagName('a')[0];
    scifiLink.setAttribute('href', googleSearchUrl);
    scifiLink.setAttribute('target', '_blank');
}
;