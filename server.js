const express = require('express');
const path = require('path');

const app = express();

/* eslint-disable no-console */
/* eslint-disable global-require */

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
  const webpack = require('webpack'); // eslint-disable-line global-require
  const webpackConfig = require('./webpack.config.js'); // eslint-disable-line global-require
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));
