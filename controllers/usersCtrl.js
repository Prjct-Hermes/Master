var User = require('./../models/User');
  module.exports = {
    //Don't need to get all users
    // getUsers : function(req, res){
    //   User.find().exec(function(err, response) {
    //     return err ? res.status(500).json(err) : res.json(response);
    //   });
    // },
    createUser : function(req, res){
      User.create(req.body, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    findIndividual : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to search the database")
      }
      User.find({"email":req.params.id, "password": req.params.password}, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    updateUser : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to update database")
      }
      User.findByIdAndUpdate(req.params.id, req.body, function(err,response){
        return err ? res.status(500).json(err) : res.json(response);
      })
    },

    removeUser : function(req, res){
      if(!req.params.id){
        return res.status(400).send("id required to delete an item")
      }
      User.findByIdAndRemove(req.params.id, function(err, response){
        return err ? res.status(500).json(err) : res.json(response);
    })
  },

    logout : function(req, res, next){
      req.logout();
      return res.status(200).send('logged out');
    },

    isAuthed : function(req, res, next){
      if(!req.user) {
          return res.status(401).send("Current user not defined");
        }
        else{
          req.user.password = null;
          return res.status(200).json(req.user);
        }
    }
}
