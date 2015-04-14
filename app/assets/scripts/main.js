requirejs.config({
    baseUrl: '/assets/scripts'
});

require([], function() {

  // Crossroads?

  var path = window.location.pathname.split('/').slice(1);

  require( ['pages/' + path[0]], function(page){
    page.init();
  });

});
