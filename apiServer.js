var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var mongoose = require('mongoose');
mongoose.connect('mongodb://testUser:test@ds111876.mlab.com:11876/bookshop');
// mongoose.connect('mongodb://localhost:27017/bookshop');
var Books = require('./models/books');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '#MongoDB - connection error: '));
app.use(session({
  secret: 'cosmosSecrets',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 2 * 24 * 60 * 60},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

// API
app.post('/post/cart', function(req, res) {
 var cart = req.body;
 req.session.cart = cart;
 req.session.save(function(err) {
  if (err) {
    console.log(err);
  }
  res.json(req.session.cart);
 })
});

app.get('/get/cart', function(req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});

app.post('/post/books', function(req, res) {
  var book = req.body;

  Books.create(book, function(err, books) {
    if (err) {
      console.log(err);
    }
    res.json(books);
  });
});

app.get('/get/images', function(req, res) {
  var imgFolder = __dirname + '/public/images';
  const fs = require('fs');
  fs.readdir(imgFolder, function(err, files) {
    if (err) {
      console.error(err);
    }

    const filesArr = [];
    files.forEach(function(file) {
      filesArr.push({name : file});
    });

    res.json(filesArr)
  });
});

app.get('/get/books', function(req, res) {
  Books.find(function(err, books) {
    if (err) {
      console.log(err);
    }
    res.json(books);
  })
});

app.delete('/book/:_id', function(req, res) {
  Books.remove({'_id' : req.params._id}, function(err, books) {
    if (err) {
      console.log(err);
    }
    res.json(books);
  });
});

app.put('/book/:_id', function(req, res) {
  var book = req.body;
  var update = {
    '$set' : {
      'title' : book.title,
      'description' : book.description,
      'price' : book.price,
      'image' : book.image
    }
  };
  var options = {new : true};
  Books.findOneAndUpdate({'_id' : req.params._id}, update, options, function(err, books) {
    if (err) {
      console.log(err);
    }
    res.json(books);
  });
});

// End API

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API server is listening to port 3001');
});
