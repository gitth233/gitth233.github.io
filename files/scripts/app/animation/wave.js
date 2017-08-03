define(['animation/wave'], function(waveBuilder) {

  function init() {
    waveBuilder.init({
        id: 'wave-canvas',
        width: window.innerWidth,
        height: document.getElementById('fullscreen-banner').offsetHeight,
        wave_position: 450,
        fillStyle: '#7FEBD3'
    });

    window.addEventListener('resize', waveBuilder.resize(window.innerWidth, document.getElementById('fullscreen-banner').offsetHeight), false);
  }

  return {
    init: init
  }
});
