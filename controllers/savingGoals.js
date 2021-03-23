const mongoose = require('mongoose')
const SavingGoal = mongoose.model('SavingGoal')

function createSavingGoal(req, res, next) {
    var savingGoal = new SavingGoal(req.body)
    savingGoal.userID = req.user.id
    savingGoal.save().then(savingGoal => {
      res.status(201).send(savingGoal)
    }).catch(next)
}

function getSavingGoals(req, res, next) {
    if(req.params.id){
      SavingGoal.findById(req.params.id)
              .populate('userID', 'userName userLastName').then(savingGoals => {
            res.send(savingGoals)
          }).catch(next)
    } else {
      SavingGoal.find().then(savingGoals =>{
        res.send(savingGoals)
      }).catch(next)
    }
}

module.exports = {
    createSavingGoal,
    getSavingGoals
}