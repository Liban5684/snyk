const express = require('express');
const _ = require('lodash');
const axios = require('axios');
const minimist = require('minimist');
const Handlebars = require('handlebars');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const args = minimist(process.argv.slice(2));
const app = express();
const PORT = args.port || 3000;

// Vulnerable lodash usage - prototype pollution in 4.17.15
app.get('/merge', (req, res) => {
  const userInput = req.query.data ? JSON.parse(req.query.data) : {};
  const result = _.merge({}, userInput);
  res.json(result);
});

// Vulnerable axios usage - old 0.21.1
app.get('/fetch', async (req, res) => {
  const url = req.query.url || 'http://example.com';
  // SSRF risk + old axios vuln demo
  const response = await axios.get(url);
  res.send(response.data);
});

// Vulnerable Handlebars usage - RCE in 4.0.11
app.get('/template', (req, res) => {
  const source = req.query.template || '<h1>Hello {{name}}</h1>';
  const template = Handlebars.compile(source);
  res.send(template({ name: 'Snyk Demo' }));
});

// Vulnerable JWT usage - old 8.3.0
app.get('/token', (req, res) => {
  const token = jwt.sign({ user: 'demo' }, 'insecure-secret');
  res.json({ token });
});

app.get('/', (req, res) => {
  res.send('Snyk vulnerable demo - do not deploy to production');
});

app.listen(PORT, () => {
  console.log(`Demo listening on ${PORT}`);
});
