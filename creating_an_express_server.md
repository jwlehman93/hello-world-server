# Creating an express server

###Starting a Node project
Run `npm init`
It should look similar to this:
![npm init](tutorial/npm_init.png "npm init")
Just keep pressing enter, edit fields as you feel necessary

###package.json
`cat package.json`

It should look like this:
```
{
  "name": "hello-world-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Purdue-ACM-SIGAPP/hello-world-server.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Purdue-ACM-SIGAPP/hello-world-server/issues"
  },
  "homepage": "https://github.com/Purdue-ACM-SIGAPP/hello-world-server#readme"
}
```
###Install express
`npm i -S express`

###Create your first server!
create file `index.js` and add the following:
```javascript
var express = require('express')

var app = express();

app.get('/'), function(req, res) {
  res.send('Hello, World')
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
module.exports = app;
```
###Run your server!
`node index.js`

###Adding routes
* `mkdir -p app/routes`
* create file `index.js` and add the following:

```javascript
var express = require('express')

var app = express();

app.get('/'), function(req, res) {
  res.send('Hello, World')
});

router.get('/message', function(req, res) {
  rese.send('You asked for a message, so now you have got one!');
});
```

###Add to index.js
```javascript
var express = require('express')
var routes = require('./app/routes');
var app = express();

app.use('/', routes)

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
module.exports = app;
```

