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
    },
    { timestamps: true }
);

ExpenseSchema.methods.publicData = function() {
    return {
        id: this.id,
        userID: this.userID,
        concept: this.concept,
        expenseAmount: this.expenseAmount,
        recurring: this.recurring,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('Expense', ExpenseSchema);