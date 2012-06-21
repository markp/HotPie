
/**
 * Module dependencies.
 */

require('coffee-script');

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){



  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('test', function () {
  app.set('port', 3001);
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

// Routes
require('./apps/authentication/routes')(app);
//app.get('/', routes.index);

app.listen(app.settings.port);
console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);

