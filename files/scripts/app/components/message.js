define(['util'], function(util) {
  var messageClose = document.querySelectorAll('article.message button.delete');

  function init() {
    for(var i = 0; i < messageClose.length; i++) {
      messageClose[i].addEventListener('click', function(){
        this.parentNode.parentNode.classList.add('is-hidden');
      });
    }
    onPageLoad();
  }

  function onPageLoad() {
    var emailStatus = util.getParam('email');
    if(emailStatus === 'success') {
      document.getElementById('success-message').classList.remove('is-hidden');
    } else if(emailStatus === 'error') {
      document.getElementById('error-message').classList.remove('is-hidden');
    }
    if(emailStatus) {
      document.querySelector('li[data-target="contact"]').click();
      util.jump('contact');
    }
  }

  return {
    init: init
  }
});
