const express = require('express');
const { inventoryRouter } = require('./v1/index');

const app = express();

app.use('/inventory', inventoryRouter);

module.exports = app;