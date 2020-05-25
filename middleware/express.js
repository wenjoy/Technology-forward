var express = require('express');
var app = express();
console.log('express')

let body = 'i go through '

var myLogger = function (req, res, next) {
  console.log('middleware 1 start');
  body += 'middleware 1 start '
  next();
  body += 'middleware 1 end '
  console.log('middleware 1 end');
};

var myLogger2 = function (req, res, next) {
  console.log('middleware 2 start');
  body += 'middleware 2 start '
  next();
  body += 'middleware 2 end '
  console.log('middleware 2 end');
};

app.use(myLogger);
app.use(myLogger2);

app.get('/', function (req, res) {
  console.log('set response ')
  body += 'set response '
  res.send(body);
});

app.listen(3000);

