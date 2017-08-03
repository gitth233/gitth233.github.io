define(function() {
  var messageClose = document.querySelectorAll('article.message button.delete');

  function init() {
    for(var i = 0; i < messageClose.length; i++) {
      messageClose[i].addEventListener("click", function(){
        this.parentNode.parentNode.classList.add("is-hidden");
      });
    }
  }

  return {
    init: init
  }
});
