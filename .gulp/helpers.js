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
    dataMerged = _.merge(dataMerged, yaml.safeLoad(fs.readFileSync('./data/pages/internet/cards.yml', 'utf8')));
    return dataMerged;
  }

  _public.notifyError = function(err) {
    err.$filename = err.path || err.filename ;
    if(err.$filename){
      err.$filename = err.$filename.split('/').slice(-1);
    }
    err.$lineno = err.lineno || '';
    notify.onError({
      title:    "Error on <%= error.plugin.split('-')[1].toUpperCase() %>",
      subtitle: "File: <%= error.$filename %> | Line: <%= error.$lineno %>",
      // message:  "<%= error.message.split('\\n').slice(-2)[0] %>",
      message:  "<%= error.message %>",
      sound:    "Beep"
    })(err);
    this.emit('end');
  };
    
  _public.notifyAlert = function(message) {
    notify(message);
    this.emit('end');
  };


  _public.filterPartials = function(file) {
    return !/\/_/.test(file.path);
  }

  _public.filterJade = function(file) {
    return /\.jade/.test(file.path);
  }

  return _public;

}());

module.exports = helpers;
