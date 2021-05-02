const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    concept: {
        type: String
    },
    budgetedAmount: {
        type: Number
    },
    expendedAmount: {
        type: Number
    }
    },
    { timestamps: true }
);

BudgetSchema.methods.publicData = function() {
    return {
        id: this.id,
        userID: this.userID,
        concept: this.concept,
        budgetedAmount: this.budgetedAmount,
        expendedAmount: this.expendedAmount
    };
};

mongoose.model('Budget', BudgetSchema);