const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    concept: {
        type: String,
        enum: ['Alimentos', 'Transporte', 'Alquiler', 'Hogar', 'Teléfono', 'Internet', 'Otros']
    },
    expenseAmount: {
        type: Number
    },
    recurring: {
        type: Boolean
    }
    }
);

ExpenseSchema.methods.publicData = function() {
    return {
        id: this.id,
        userID: this.userID,
        concept: this.concept,
        expenseAmount: this.expenseAmount,
        recurring: this.recurring
    };
};

mongoose.model('Expense', ExpenseSchema);