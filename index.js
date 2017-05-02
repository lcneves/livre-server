/*
 * index.js
 * Node.js entry-point for the Livre server.
 *
 * Copyright 2017 Lucas Neves <lcneves@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0:
 *   http://www.apache.org/licenses/LICENSE-2.0
 */

'use strict';

module.exports = function (options) {

  // Requirements
  const path = require('path');
  var express = require('express');
  var app = express();

  // Constant definitions
  const PORT = 34567;

  var staticPaths = [];
  for (let theme of options.themes) {
    staticPaths.push({
      get: '/themes/' + theme,
      dir: path.join(
        __dirname,
        '..',
        'livre-' + theme,
        'resources'
      )
    });
  }

  // Setup of utilities
  app.set('view engine', 'pug');

  // Router begins here
  app.get('/', function (req, res) {
    res.render('index', {});
  });

  for (let path of staticPaths) {
    app.use(path['get'], express.static(path['dir']));
  }

  // All set, let's listen!
  app.listen(PORT, function () {
    console.log('Livre listening on port ' + PORT);
  });
};
