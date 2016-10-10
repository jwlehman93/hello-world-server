# Using MongoDB with express

##MongoDB
https://www.mongodb.com/download-center?jmp=nav#community


###Create data directory
This is where all your MongoDB data will be stored.

* Mac
  * `mkdir /data/db`
  * `sudo chmod 0755 /data/db`
  * `sudo chown $USER /data/db`
* Windows
  * `md /data/db`

###Starting the mongo service and connecting to it
Now we will start a MongoDB instance locally.

* `mongod` in a terminal
* open new terminal and run `mongo`
* type `help` to see what you can do

###configs
Next, we will create an environment variable file. In this file, we will identify what port we want to be opened up for the server, and what the address of our MongoDB will be. Normally, you will not want to place this file in a version control repository. These should all be secrets, that are only know in the environment where they are run.

* create file `.env`
* Add the following:

```
PORT=XXXX
MONGODB=localhost:XXXXX/DB
```

###Connect Mongo and the Server using mongoose
First, we will install some dependencies. 
* `npm i -S mongoose dotenv bodyparser`
  * Mongoose: This will help us connect to our MongoDB, and create objects that resemble the data in our database.
  * dotenv: this allows us to use the environment variables store in the .env file
  * bodyparser: This will allow us to parse data more easily when users make requests to our server.
* Add the following to index.js (the previous code is represented as comments)

```javascript
require('dontenv').config();
/*other requires*/
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
/* express, router, etc */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var connection = mongoose.connect(process.env.MONGODB).connection;
connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', function() {
  console.log('MongoDB is now connected');
});
/*app.listen, export app*/
```

###Run it
Run `node server.js` at the root of the project again, and check it out at `localhost:PORT` where `PORT` is the port you saved in your `.env` file.
You should also now see an additonal log in your terminal letting you know your MongoDB instance is now running.

###Create message model
Now we will create an object that will represent a message in our database.
We will represent the actual message, the room it was sent from, and who the user was.

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


###Create an add message route
Now edit the router again, adding a new route, a POST route that will create a new message in our data base using the `save` function provided by mongoose. 

* open `routes/index.js`
* add the following

```javascript
/* previous requires */
var Message = require('../models/Message');
/* get root route */
router.post('/messages', function(req, res, next) {
  Message(req.body).save(function(err) {
    if (err) {
      res.send(err);
    }
    res.send('Message saved');
  })
});

module.exports = router;
```
###Test it out
* Download postman if you haven't already. 
* Change the request type dropdown to POST(it should initially say GET) * 
* set the address to `localhost:PORT/messages`
* Navigate to the body tab (below the address bar) 
* select the raw radio button
* change the data type dropdown to JSON (Originally, it should say Text)
* add the following json data to the text input box
```
{
  "message": "Hello",
  "user": "jeremy",
  "room": "Hello, World"
}
```
* Finally, hit the blue send button

###Check in mongo
* open your mongo shell again
* type `use DB` 
* type `db.messages.find()`

###Get messages
* open `routes/index.js` again
* add the following (also remove our old `/message` route)

```javascript
/* previous routes (remove the get('/message' route))
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
* `node index.js` at the project root
* go to `localhost:PORT/messages`
* 
 You should now be able to see the json data for the message we just sent. 
 
###Last thing... Let's add a logger
* `npm i -S morgan`
* add the following to index.js

```javascript
var logger = require('morgan');
/*app stuff */
app.use(logger('dev'));
```

Now, send another post request, and you will be able to see better output for what exactly is happening in our server.
