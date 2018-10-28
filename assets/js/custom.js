function ieetshow(lnk) {
  var div=lnk.parentNode.nextElementSibling;
  if(div.className!=null && div.className.indexOf('hidden')>=0) {
    var section=document.getElementById('besoins').childNodes;
    var nb=section.length;
    for(var i=0;i<nb;i++) {
      if(section[i].nodeType!=1 || section[i].tagName.toUpperCase()!='DIV') continue;
      
      section[i].className='hidden';
    }
    div.className='';
    addHashToUrl(lnk.parentNode.id);
  } else {
    div.className='hidden';
  }
  return false;
} 

function addHashToUrl(targetid) {
  var elt=document.getElementById(targetid);
  var y=window.pageYOffset;
  if(typeof y == 'undefined') y = (r.scrollTop || b.scrollTop || 0);
  var dispinit=elt.style.display;
  elt.style.display='hidden';
  elt.style.position='absolute';
  elt.style.top=(y-18)+'px';
  document.location.hash = targetid;
  elt.style.position='relative';
  elt.style.top=0;  
  elt.style.display=dispinit;
}

function readydoc() {
  // ajouter la target blank sur les liens vers l'exterieur (les ouvrir dans un nouvel onglet)
  var links=document.getElementById('besoins').getElementsByTagName('A');
  for(var i=0;i<links.length;i++) links[i].setAttribute('target','_blank');
  links=document.getElementById('alternativelist').getElementsByTagName('A');
  for(var i=0;i<links.length;i++) links[i].setAttribute('target','_blank');

  // ajouter les actions sur les questions + masque les réponses
  var anchor=document.location.hash;
  var section=document.getElementById('besoins').childNodes;
  var nb=section.length;
  for(var i=0;i<nb;i++) {
    if(section[i].nodeType!=1) continue;
    if(section[i].tagName.toUpperCase()=='H3') {
      section[i].innerHTML='<a href="#'+section[i].id+'" onclick="return ieetshow(this);">'+section[i].innerHTML+'</a>';
    }
    if(section[i].tagName.toUpperCase()=='DIV') {
      var id='#'+section[i].previousElementSibling.id;
      if(anchor==null || anchor!=id) section[i].className='hidden noanim';
    }
  }
  
}
