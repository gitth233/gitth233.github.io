define(function(require) {
  var message = require('./components/message'),
      tabs = require('./components/tabs'),
      timeline = require('./components/timeline'),
      wave = require('./animation/wave'),
      flow = require('./animation/flow');

  message.init();
  tabs.init();
  timeline.init();

  wave.init();
  flow.init();
});
