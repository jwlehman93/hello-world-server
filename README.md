
# Server 101
## How to be a backend master

###You will need the following things before we begin

* NodeJS (6.*)

  * Linux:
    Use your package manager. Package name is most likely nodejs. 
    E.g. for Ubuntu “sudo apt-get install nodejs”

  * Mac:
    If you don’t have [brew](http://brew.sh/index.html) installed yet, do so.
    Then just run “brew install nodejs” in your terminal.

  * Windows: Pick the appropriate Windows installer  from the [node download page](https://nodejs.org/en/download/)
    (During install make sure you select the npm package manager as a feature you would like to install)

  * Make sure the NPM was installed with node.
    Run “npm -v” in either your terminal or cmd. It should tell you what version of npm you currently are running.
    * If not…
      * Linux:
        Use your package manger to install package “npm”

     * Mac:
      If you haven’t installed brew yet, now would be a great time to do so.
      Run “brew install npm” in your terminal to get the most glorious of package mangers.

      * Windows:
        Reinstall nodejs, and make sure you select npm package manager. Like the picture shows you how to do.

* Install MongoDB
  * Linux:
    Use that package manager once more. The package name should be “mongodb”

  * Mac:
  “brew install mongodb”

  * Windows:
  Get mongo from [here](https://www.mongodb.com/download-center#community). Then run the installer.

* Postman: 
  [Get it here](https://www.getpostman.com/)
###First Things First
`git clone 
https://github.com/Purdue-ACM-SIGAPP/hello-world-server.git`


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

##MongoDB
https://www.mongodb.com/download-center?jmp=nav#community


###Create data directory
* mac
  * `mkdir /data/db`
  * `sudo chmod 0755 /data/db`
  * `sudo chown $USER /data/db`
* windows
  * `md /data/db`

###Starting the mongo service and connecting to it
* `mongod` in a terminal
* open new terminal and run `mongo`
* type `help` to see what you can do

###configs
* create file `.env`
* Add the following:

```
PORT=XXXX
MONGODB=localhost:XXXXX/DB
```

###Connect Mongo and the Server using mongoose
* `npm i -S mongoose dotenv bodyparser`
* Add the following to index.js

```javascript
require('dontenv').config();
/*other requires*/
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
/* express, routes, etc */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var connection = mongoose.connect(process.env.MONGODB).connection;

connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', function() {
  console.log('MongoDB is now connected');
})
/*app.listen, export*/
```

###Run it
`node server.js`

###Create message model
* `mkdir app/models`
* create file `Message.js`
* add the following: 

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  message: {type: String, required: true},
  room: {type: String, required: true},
  user: {type: String, required: true}
});

module.exports = mongoose.model('Message', messageSchema);
```


###Add messages
* open `routes/index.js`
* add the following

```javascript
router.post('/messages', function(req, res, next) {
  Message(req.body).save(function(err) {
    if (err) {
      res.send(err);
    }
    res.send('Message saved');
  })
});
```
###Test it out
* Download postman
* make a post request to `localhost:PORT/messages`
* in the body tab select raw and JSON
* add the following json data
```
{
  "message": "Hello",
  "user": "jeremy",
  "room": "Hello, World"
}
```

###Check in mongo
* open your mongo shell again
* type `use <DB>`
* type `db.messages.find()`

###Get messages
* open `routes/index.js` again
* add the following (also remove our old `/message` route)

```javascript
router.get('/messages', function(req, res, next) {
  Message.find(function(err, messages) {
    if (err) {
      res.send(err);
    }
    res.send(messages);
  })
});
```

###Check it out
* node `index.js`
* go to `localhost:PORT/messages`

###Last thing... Let's add a logger
* `npm i -S morgan`
* add the following to index.js

```javascript
var logger = require('morgan');
/*app stuff */
app.use(logger('dev'));
```

