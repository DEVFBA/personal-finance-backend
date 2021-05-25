const mongoose = require('mongoose')
const Expense = mongoose.model('Expense')

function createExpense(req, res, next) {
    var expense = new Expense(req.body)
    expense.userID = req.user.id
    expense.save().then(expense => {
      res.status(201).send(expense)
    }).catch(next)
}

function getExpenses(req, res, next) {
    if(req.params.id){
      Expense.findById(req.params.id)
              .populate('userID', 'userName userLastName').then(expense => {
            res.send(expense)
          }).catch(next)
    } else {
      Expense.find( { userID: req.user.id } ).then(expenses =>{
        res.send(expenses)
      }).catch(next)
    }
}

function deleteExpense(req, res) {
  // únicamente borra a su propio usuario obteniendo el id del token
  Expense.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
    res.status(200).send(`Expense ${req.params.id} deleted: ${r}`);
  })
}

function updateExpense(req, res, next) {
  //console.log(req.user)
  Expense.findById({ _id: req.params.id }).then(expense => {
    if (!expense) { return res.sendStatus(401); }
    let newInfo = req.body
    if (typeof newInfo.concept !== 'undefined')
        expense.concept = newInfo.concept
    if (typeof newInfo.expenseAmount !== 'undefined')
        expense.expenseAmount = newInfo.expenseAmount
    if (typeof newInfo.recurring !== 'undefined')
        expense.recurring = newInfo.recurring
    expense.save().then(updatedExpense => { 
      res.status(201).json(updatedExpense.publicData())
    }).catch(next)
  }).catch(next)
}

module.exports = {
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense
}