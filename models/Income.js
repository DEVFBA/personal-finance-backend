const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    concept: {
        type: String,
        enum: ['Salario', 'Honorarios', 'Rentas', 'Otros']
    },
    incomeAmount: {
        type: Number
    },
    recurring: {
        type: Boolean
    }
    },
    { timestamps: true }
);

IncomeSchema.methods.publicData = function() {
    return {
        id: this.id,
        userID: this.userID,
        concept: this.concept,
        incomeAmount: this.incomeAmount,
        recurring: this.recurring,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('Income', IncomeSchema);