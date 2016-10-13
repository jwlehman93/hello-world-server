# Creating an express server
###First
Create your Hello-World-Server directory and enter it
`mkdir Hello-World-Server`
`cd Hello-World-Server`
###Starting a Node project
Run `npm init` at the root of your project
It should look like this:
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
Create file `Hello-world-Server/index.js` and add the following:
```javascript
var express = require('express')

var app = express();

app.get('/', function(req, res) {
  res.send('Hello, World')
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
module.exports = app;
```
###Run your server!
run `node index.js` at the root of the project (`Hello-World-Server/`)

Check it out in your favorite browser at `localhost:3000`
###Creating a router
Create an `app` directory, and place a `routes` directory inside of it.
`mkdir -p app/routes`

Add the following to this **new** `index.js` file:

```javascript
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.send('Hey, I am the root route');
});

router.get('/message', function(req, res) {
  res.send('You asked for a message, so now you have got one!');
});

module.exports = router;
```
This is a router, which will specify what our server should be returning to a user when they ask for certain routes. In this example, if they request `/`, it will return the string `Hello, World` and if they request `/message`, it will return `You asked for a message, so now you have got one!`.

###Modify Hello-World-Server/index.js

Now we will add this new router to our root `index.js` file.

**Note:** This should not be the file you were just editing, but the `index.js` file at the root of your project.
```javascript
var express = require('express');
var routes = require('./app/routes');
var app = express();

app.use('/', routes)

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
module.exports = app;
```

###Run it!
yet again, run `node index.js` at the root of the project, and check out your brand new fancy, schmancy routes at `localhost:3000` and `localhost:3000/messages`