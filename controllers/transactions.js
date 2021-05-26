const mongoose = require('mongoose')
const Transaction = mongoose.model('Transaction')

function createTransaction(req, res, next) {
    var transaction = new Transaction(req.body)
    transaction.userID = req.user.id
    transaction.save().then(transaction => {
      res.status(201).send(transaction)
    }).catch(next)
}

function getTransactions(req, res, next) {
    if(req.params.id){
      Transaction.findById(req.params.id)
              .populate('userID', 'userName userLastName').then(transaction => {
            res.send(transaction)
          }).catch(next)
    } else {
      Transaction.find( { userID: req.user.id } ).then(transactions =>{
        res.send(transactions)
      }).catch(next)
    }
}

function deleteTransaction(req, res) {
  // únicamente borra a su propio usuario obteniendo el id del token
  Transaction.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
    res.status(200).send(`Transaction ${req.params.id} deleted: ${r}`);
  })
}

function updateTransaction(req, res, next) {
  //console.log(req.user)
  Transaction.findById({ _id: req.params.id }).then(transaction => {
    if (!transaction) { return res.sendStatus(401); }
    let newInfo = req.body
    if (typeof newInfo.origin !== 'undefined')
    transaction.origin = newInfo.origin
    if (typeof newInfo.accountNumber !== 'undefined')
    transaction.accountNumber = newInfo.accountNumber
    if (typeof newInfo.type !== 'undefined')
    transaction.type = newInfo.type
    if (typeof newInfo.concept !== 'undefined')
      transaction.concept = newInfo.concept
    if (typeof newInfo.description !== 'undefined')
    transaction.description = newInfo.description
    if (typeof newInfo.amount !== 'undefined')
    transaction.amount = newInfo.amount
    if (typeof newInfo.recurring !== 'undefined')
    transaction.recurring = newInfo.recurring
    if (typeof newInfo.date !== 'undefined')
    transaction.date = newInfo.date
    transaction.save().then(updatedTransaction => { 
      res.status(201).json(updatedTransaction.publicData())
    }).catch(next)
  }).catch(next)
}

module.exports = {
    createTransaction,
    getTransactions,
    deleteTransaction,
    updateTransaction
}