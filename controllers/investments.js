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

module.exports = {
    createInvestment,
    getInvestments
}