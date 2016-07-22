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
  ingredients: {
    type: Schema.Types.Mixed,
    required: false,
    index: false,
  },
  instructions: {
    type: String,
    required: false,
    index: false,
  },
  price: {
    type: Number,
    required: false,
    index: false,
  },
  image: {
    type: String,
    required: false,
    index: false,
  }
  });
  var Recipes = mongoose.model('recipes', schema);
  module.exports = {
    getRecipes : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to search the database")
      }
      Recipes.find({"userId":req.params.id}, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    createRecipes : function(req, res){
      Recipes.create(req.body, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
    })
  },

    findIndividualRecipes : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to search the database")
      }
      Recipes.findById(req.params.id, function(err, response){
        console.log(req.params.id)
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    updateRecipes : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to update database")
      }
      Recipes.findByIdAndUpdate(req.params.id, req.body, function(err,response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    removeRecipes : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to delete an item")
      }
      Recipes.findByIdAndRemove(req.params.id, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
    })
  },
  }
