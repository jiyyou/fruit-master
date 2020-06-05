/**
 * Main index file
 */

// Dependencies
const http = require('http');
const url = require('url');
const PORT = process.env.PORT || 5000;
const { fruits, fruitFacts } = require('./data');

// Simple HTTP server
const server = http.createServer(function(req, res) {
  let parsedUrl = url.parse(req.url, true);
  let trimmedPath = parsedUrl.pathname.replace(/^\/|\/+$/g, '');
  if (!trimmedPath) trimmedPath = 'index';
  let chosenHandler;

  if (fruits.includes(trimmedPath)) {
    chosenHandler = handlers.fruit;
  } else {
    chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;
  }

  chosenHandler(trimmedPath, function(statusCode, payload) {
    statusCode = typeof statusCode === 'number' ? statusCode : 200;
    payload = typeof payload === 'object' ? payload : {};
    let payloadString = JSON.stringify(payload);
    // Send the response
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    res.end(payloadString);
  });
});

// Run the server
server.listen(PORT, function() {
  console.log('We have a server running on PORT:', PORT);
});

// Handlers and routes
var handlers = {};

handlers.index = function(slug, callback) {
  callback(200, {
    info: 'Fruit facts api. (C) Fruit Ninja®',
    tip: 'Type in a fruit name in the slug and see a fruit fact',
    example: `/${getRandomFruit()}`
  });
};

handlers.fruit = function(slug, callback) {
  let randomFact =
    fruitFacts[slug][Math.round(Math.random() * (fruitFacts[slug].length - 1))];
  callback(200, {
    fruit: slug,
    fact: randomFact,
    tip: `Next, try /${getRandomFruit()}`
  });
};

handlers.help = function(slug, callback) {
  callback(200, {
    info: 'Try searching fruits like /apple',
    fruits: fruits,
    tip: 'There are more than one fact per fruit'
  });
};

handlers.notFound = function(slug, callback) {
  callback(404, {
    info: `${slug} not found in the database`,
    tip: 'Try /help to see options'
  });
};

var router = {
  index: handlers.index,
  help: handlers.help
};

function getRandomFruit() {
  return fruits[Math.round(Math.random() * (fruits.length - 1))];
}
