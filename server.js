var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    usersCtrl = require('./controllers/usersCtrl'),
    stockItemsCtrl = require('./controllers/stockItemsCtrl'),
    recipesCtrl = require('./controllers/recipesCtrl'),
    ordersCtrl = require('./controllers/ordersCtrl'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/hermes",  function (err, res) {
      if (err) {
        console.log ('ERROR connecting to Hermes. '  + err);
      } else {
        console.log ('Successfully connected to Hermes.');
      }
    });

var app = express();
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});
var corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

//User DB
app.get('/api/users/:id,:password',  usersCtrl.findIndividual)
app.post('/api/users',  usersCtrl.createUser)
app.put('/api/users/:id',  usersCtrl.updateUser)
app.delete('/api/users/:id',  usersCtrl.removeUser)

//stockItems
app.post('/api/stockItems', stockItemsCtrl.createStockItem)
app.get('/api/stockItems/:id', stockItemsCtrl.getStockItem)
app.put('/api/stockItems/:id', stockItemsCtrl.updateStockItem)
app.delete('/api/stockItems/:id', stockItemsCtrl.removeStockItem)

app.post('/api/recipes', recipesCtrl.createRecipes)
app.get('/api/recipes/:id', recipesCtrl.getRecipes)
app.put('/api/recipes/:id', recipesCtrl.updateRecipes)
app.delete('/api/recipes/:id', recipesCtrl.removeRecipes)

app.post('/api/orders', ordersCtrl.createOrders)
app.get('/api/orders/:id', ordersCtrl.getOrders)
app.put('/api/orders/:id', ordersCtrl.updateOrders)
app.delete('/api/orders/:id', ordersCtrl.removeOrders)

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on port", port)
})
