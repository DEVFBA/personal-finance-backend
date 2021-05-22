const mongoose = require('mongoose')
const Investment = mongoose.model('Investment')

function createInvestment(req, res, next) {
    var investment = new Investment(req.body)
    investment.userID = req.user.id
    investment.save().then(investment => {
      res.status(201).send(investment)
    }).catch(next)
}

function getInvestments(req, res, next) {
    if(req.params.id){
      Investment.findById(req.params.id)
              .populate('userID', 'userName userLastName').then(investments => {
            res.send(investments)
          }).catch(next)
    } else {
      Investment.find( { userID: req.user.id } ).then(investments =>{
        res.send(investments)
      }).catch(next)
    }
}

function deleteInvestment(req, res) {
  // únicamente borra a su propio usuario obteniendo el id del token
  Investment.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
    res.status(200).send(`Investment ${req.params.id} deleted: ${r}`);
  })
}

function updateInvestment(req, res, next) {
  //console.log(req.user)
  Investment.findById({ _id: req.params.id }).then(investment => {
    if (!investment) { return res.sendStatus(401); }
    let newInfo = req.body
    if (typeof newInfo.investedAmount !== 'undefined')
      investment.investedAmount = newInfo.investedAmount
    if (typeof newInfo.total !== 'undefined')
      investment.total = newInfo.total
    investment.save().then(updatedInvestment => { 
      res.status(201).json(updatedInvestment.publicData())
    }).catch(next)
  }).catch(next)
}

module.exports = {
    createInvestment,
    getInvestments,
    deleteInvestment,
    updateInvestment
}