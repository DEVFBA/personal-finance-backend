const mongoose = require('mongoose')
const BankTransaction = mongoose.model('BankTransaction')

function createBankTransaction(req, res, next) {
    var bankTransaction = new BankTransaction(req.body)
    bankTransaction.userID = req.user.id
    bankTransaction.save().then(bankTransaction => {
      res.status(201).send(bankTransaction)
    }).catch(next)
}

function getBankTransactions(req, res, next) {
    if(req.params.id){
      BankTransaction.findById(req.params.id)
              .populate('userID', 'userName userLastName').then(bankTransaction => {
            res.send(bankTransaction)
          }).catch(next)
    } else {
      BankTransaction.find( { userID: req.user.id } ).then(bankTransaction =>{
        res.send(bankTransaction)
      }).catch(next)
    }
}

function deleteBankTransaction(req, res) {
  // únicamente borra a su propio usuario obteniendo el id del token
  BankTransaction.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
    res.status(200).send(`Bank Transaction ${req.params.id} deleted: ${r}`);
  })
}

function updateBankTransaction(req, res, next) {
  //console.log(req.user)
  BankTransaction.findById({ _id: req.params.id }).then(bankTransaction => {
    if (!bankTransaction) { return res.sendStatus(401); }
    let newInfo = req.body
    if (typeof newInfo.bankTransaction !== 'undefined')
      bankTransaction.accountNumber = newInfo.accountNumber
    if (typeof newInfo.date !== 'undefined')
    bankTransaction.date = newInfo.date
    if (typeof newInfo.transactionType !== 'undefined')
    bankTransaction.transactionType = newInfo.transactionType
    if (typeof newInfo.amount !== 'undefined')
    bankTransaction.amount = newInfo.amount
    if (typeof newInfo.categorized !== 'undefined')
    bankTransaction.categorized = newInfo.categorized
    if (typeof newInfo.description !== 'undefined')
    bankTransaction.description = newInfo.description
    if (typeof newInfo.accountType !== 'undefined')
    bankTransaction.accountType = newInfo.accountType
    bankTransaction.save().then(updatedBankTransaction => { 
      res.status(201).json(updatedBankTransaction.publicData())
    }).catch(next)
  }).catch(next)
}

module.exports = {
    createBankTransaction,
    getBankTransactions,
    deleteBankTransaction,
    updateBankTransaction
}