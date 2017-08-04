define(function(require) {
  var message = require('app/components/message'),
      tabs = require('app/components/tabs'),
      timeline = require('app/components/timeline'),
      wave = require('app/animation/wave'),
      flow = require('app/animation/flow');

  tabs.init();
  timeline.init();
  message.init();

  wave.init();
  flow.init();
});
