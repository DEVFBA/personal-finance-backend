const mongoose = require('mongoose')
const Income = mongoose.model('Income')

function createIncome(req, res, next) {
    var income = new Income(req.body)
    income.userID = req.user.id
    income.save().then(income => {
      res.status(201).send(income)
    }).catch(next)
}

function getIncomes(req, res, next) {
    if(req.params.id){
      Income.findById(req.params.id)
              .populate('userID', 'userName userLastName').then(income => {
            res.send(income)
          }).catch(next)
    } else {
      Income.find( { userID: req.user.id } ).then(incomes =>{
        res.send(incomes)
      }).catch(next)
    }
}

function deleteIncome(req, res) {
  // únicamente borra a su propio usuario obteniendo el id del token
  Income.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
    res.status(200).send(`Income ${req.params.id} deleted: ${r}`);
  })
}

function updateIncome(req, res, next) {
  //console.log(req.user)
  Income.findById({ _id: req.params.id }).then(income => {
    if (!income) { return res.sendStatus(401); }
    let newInfo = req.body
    if (typeof newInfo.concept !== 'undefined')
      income.concept = newInfo.concept
    if (typeof newInfo.incomeAmount !== 'undefined')
    income.incomeAmount = newInfo.incomeAmount
    if (typeof newInfo.recurring !== 'undefined')
    income.recurring = newInfo.recurring
    income.save().then(updatedIncome => { 
      res.status(201).json(updatedIncome.publicData())
    }).catch(next)
  }).catch(next)
}

module.exports = {
    createIncome,
    getIncomes,
    deleteIncome,
    updateIncome
}