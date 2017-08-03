define(['animation/flow'], function(flowBuilder) {

  function init() {
    flowBuilder.init({
      id: 'flow-canvas',
      width: window.innerWidth,
      height: document.getElementById('fullscreen-banner').offsetHeight,
      strokeStyle: '#7FEBD3',
      num_lg: 17,
      num_md: 13,
      num_sm: 8
    });

    window.addEventListener('resize', flowBuilder.resize(window.innerWidth, document.getElementById('fullscreen-banner').offsetHeight), false);
  }

  return {
    init: init
  }
});
