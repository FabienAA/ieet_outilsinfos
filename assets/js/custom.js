function ieetshow(lnk) {
  var div=$(lnk).closest('h3').next();
  if(div.is(':hidden')) {
    $('div#besoins > div').hide(400);
    div.show(400);
  } else {
    div.hide(400);
  }
  addHashToUrl($(lnk).attr('href'));
  return false;
} 

function addHashToUrl($url)
{
  if ('' == $url || undefined == $url) {
    $url = '_'; // it is empty hash because if put empty string here then browser will scroll to top of page
  }
  $hash = $url.replace(/^.*#/, '');
  var $fx, $node = jQuery('#' + $hash);
  if ($node.length) {
    $fx = jQuery('<div></div>')
            .css({
                position:'absolute',
                visibility:'hidden',
                top: jQuery(window).scrollTop() + 'px'
            })
            .attr('id', $hash)
            .appendTo(document.body);
    $node.attr('id', '');
  }
  document.location.hash = $hash;
  if ($node.length) {
    $fx.remove();
    $node.attr('id', $hash);
  }
}


$(document).ready(function(){
  // ajouter les actions sur les questions
  var questions=$('#besoins > h3');
  var nb=(questions==null?0:questions.length);
  for(var i=0;i<nb;i++) {
    $(questions[i]).html(
      '<a href="#'+questions[i].id+'" onclick="return ieetshow(this);">' + $(questions[i]).html() + '</a>'  
    )                                                                                      
  }
  
  // ajouter la target blank sur les liens vers l'exterieur (les ouvrir dans un nouvel onglet)
  $('#besoins > div a').attr('target','_blank');
  $('#alternativelist a').attr('target','_blank');
  
  // ouvrir la reponse correspondant à l'ancre demandée en url
  var anchor=document.location.hash;
  if(anchor!=null && anchor.match(/^#/)) {
    $(anchor).next().show();
  }
});