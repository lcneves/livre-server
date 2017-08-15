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
  const vhost = require('vhost');
  const express = require('express');
  var app = express();

  // Constant definitions
  const HOSTNAME = options.hostname || '*.*';
  const PORT = options.port || 34567;
  const DEFAULT_TITLE = 'Livre';
  const THEMES_DIR = options.themesDirectory || path.join(__dirname, '..');
  const DEFAULT_STATIC_PATH = '/public';
  const DEFAULT_PUBLIC_DIR = 'public';


  var themeApps = {};
  for (let theme of options.themes) {
    // Default options
    let subdomain = theme.subdomain || theme.name,
        baseDirectory = theme.baseDirectory || theme.name,
        publicDirectory = theme.publicDirectory || DEFAULT_PUBLIC_DIR;
    let renderOptions = {
      staticPath: theme.staticPath || DEFAULT_STATIC_PATH,
      title: theme.title || DEFAULT_TITLE
    };



    themeApps[theme.name] = express();
    themeApps[theme.name]
      .set('views', path.join(__dirname, 'views'))
      .set('view engine', 'pug');

    // Routing begins here
    themeApps[theme.name].get('/', function (req, res) {
      res.render('index', renderOptions);
    });
    
    themeApps[theme.name].use(staticPath, express.static(path.join(
            THEMES_DIR, baseDirectory, publicDirectory
    )));

    app.use(vhost(subdomain + '.' + HOSTNAME, themeApps[theme.name]));
  }

  // All set, let's listen!
  app.listen(PORT, function () {
    console.log('Livre listening on port ' + PORT);
  });
};

