var mongoose = require('mongoose');
Schema = mongoose.Schema;
var schema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: false,
    index: false,
  },
  quantity: {
    type: Number,
    required: false,
    index: false,
  },
  unitOfMeasure: {
    type: String,
    required: false,
    index: false,
  },
  alertQuantity: {
    type: Number,
    required: false,
    index: false,
  },
  alertDate: {
    type: Date,
    required: false,
    index: false,
  },
  image: {
    type: String,
    required: false,
    index: false,
  },
  category: {
    type: String,
    required: false,
    index: false,
  }
  });
  var StockItem = mongoose.model('stockItems', schema);

  module.exports = {
    getStockItem : function(req, res){
      if(!req.user){
        return res.status(400).send("You must be logged in to search the database")
      }
      StockItem.find({"userId":req.user._id}, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    createStockItem : function(req, res){
      StockItem.create(req.body, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
    })
  },

    updateStockItem : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to update database")
      }
      StockItem.findByIdAndUpdate(req.params.id, req.body, function(err,response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    removeStockItem : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to delete an item")
      }
      StockItem.findByIdAndRemove(req.params.id, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
    })
  },
  }
