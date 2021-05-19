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
      SavingGoal.find( { userID: req.user.id } ).then(savingGoals =>{
        res.send(savingGoals)
      }).catch(next)
    }
}

function deleteSavingGoal(req, res) {
  // únicamente borra a su propio usuario obteniendo el id del token
  SavingGoal.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
    res.status(200).send(`Saving Goal ${req.params.id} deleted: ${r}`);
  })
}

function updateSavingGoal(req, res, next) {
  //console.log(req.user)
  SavingGoal.findById({ _id: req.params.id }).then(savingGoal => {
    if (!savingGoal) { return res.sendStatus(401); }
    let newInfo = req.body
    if (typeof newInfo.amountSaved !== 'undefined')
      savingGoal.amountSaved = newInfo.amountSaved
    if (typeof newInfo.targetAmount !== 'undefined')
      savingGoal.targetAmount = newInfo.targetAmount
    if (typeof newInfo.targetDate !== 'undefined')
    savingGoal.targetDate = newInfo.targetDate
    savingGoal.save().then(updatedSavingGoal => { 
      res.status(201).json(updatedSavingGoal.publicData())
    }).catch(next)
  }).catch(next)
}

module.exports = {
    createSavingGoal,
    getSavingGoals,
    deleteSavingGoal,
    updateSavingGoal
}