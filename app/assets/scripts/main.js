requirejs.config({
    baseUrl: '/assets/scripts'
});

require([], function() {

  // Crossroads?

  require(['channel-addons'], function(addons){
    addons.init();
  });

});
