var mongoose = require('mongoose');
Schema = mongoose.Schema;
var schema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  date: {
    type: String,
    required: true,
    index: true,
  },
  order: {
    type: {},
    required: false,
    index: false,
  }
  });
  var Orders = mongoose.model('orders', schema);
  module.exports = {
    getOrders : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to search the database")
      }
      Orders.find({"userId":req.params.id}, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    createOrders : function(req, res){
      Orders.create(req.body, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
    })
  },

    findIndividualOrders : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to search the database")
      }
      Orders.findById(req.params.id, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    updateOrders : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to update database")
      }
      Orders.findByIdAndUpdate(req.params.id, req.body, function(err,response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    removeOrders : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to delete an item")
      }
      Orders.findByIdAndRemove(req.params.id, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
    })
  },
  }
