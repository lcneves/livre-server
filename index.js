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
  const PORT = options.port || 34567;
  const THEMES_DIR = options.themesDirectory || path.join(__dirname, '..');


  // Setup of utilities
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  // Router begins here
  for (let theme of options.themes) {

    app.get(theme.route, function (req, res) {
      res.render('index', { theme: theme.name });
    });
    
    app.use('/themes/' + theme.name, express.static(path.join(
      THEMES_DIR,
      theme.baseDirectory,
      theme.publicDirectory
    )));
  }

  // All set, let's listen!
  app.listen(PORT, function () {
    console.log('Livre listening on port ' + PORT);
  });
};
