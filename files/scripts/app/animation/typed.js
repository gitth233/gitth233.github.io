define(['typed'], function(Typed) {
  function init() {
    var typed = new Typed(
      '#bio', {
        strings: ['Hello there, ',
          'I\'m not a Developer',
          'I\'m not a Designer^500',
          'I\'m just a Tech Enthusiast',
          'and a Student',
          '<span class="is-faded-out">at the </span>University of Waterloo'
        ],
        startDelay: 200,
        typeSpeed: 40,
        fadeOut: true
      }
    );
  }

  return {
    init: init
  }
});
