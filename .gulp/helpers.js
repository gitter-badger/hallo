var helpers = (function() {
  'use strict';

  var fs   = require('fs');
  var yaml = require('js-yaml');
  var _    = require('lodash');
  var notify    = require('gulp-notify');

  var _public = {};
  var _private = {};

  _private.listDataFiles = function() {
    var dataFiles = fs.readdirSync('./data');
    _.remove(dataFiles, function(item) {
      return item === '.DS_Store';
    });
    return dataFiles;
  }

  _public.loadData = function() {
    var dataFiles = _private.listDataFiles(),
        dataMerged = {};
    dataFiles.map(function(file, index){
      try {
        dataMerged = _.merge(dataMerged, yaml.safeLoad(fs.readFileSync('./data/' + file , 'utf8')));
      } catch (e) {
        console.log(e);
      }
    });
    return dataMerged;
  }

  _public.notifyError = function(err) {
    notify.onError({
      title:    "Gulp",
      subtitle: "Failure!",
      message:  "Error: <%= error.message %>",
      sound:    "Beep"
    })(err);
    this.emit('end');
  };


  _public.filterPartials = function(file) {
    return !/\/_/.test(file.path);
  }

  return _public;

}());

module.exports = helpers;
