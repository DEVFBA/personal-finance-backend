const mongoose = require('mongoose')
const Budget = mongoose.model('Budget')

function createBudget(req, res, next) {
    var budget = new Budget(req.body)
    budget.userID = req.user.id
    budget.save().then(budget => {
      res.status(201).send(budget)
    }).catch(next)
}

function getBudgets(req, res, next) {
    if(req.params.id){
      Budget.findById(req.params.id)
              .populate('userID', 'userName userLastName').then(budgets => {
            res.send(budgets)
          }).catch(next)
    } else {
      Budget.find( { userID: req.user.id } ).then(budgets =>{
        res.send(budgets)
      }).catch(next)
    }
}

module.exports = {
    createBudget,
    getBudgets
}