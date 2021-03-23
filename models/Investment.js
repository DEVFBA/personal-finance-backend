const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    investingCompany: {
        type: String
    },
    investingInstrument: {
        type: String
    },
    investedAmount: {
        type: Number
    },
    total: {
        type: Number
    }
    },
    { timestamps: true }
);

InvestmentSchema.methods.publicData = function() {
    return {
        id: this.id,
        userID: this.userID,
        investingCompany: this.investingCompany,
        investingInstrument: this.investingInstrument,
        investedAmount: this.investedAmount,
        total: this.total
    };
};

mongoose.model('Investment', InvestmentSchema);