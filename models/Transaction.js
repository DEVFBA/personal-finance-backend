const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    type: {
        type: String,
        enum: ['Ingreso', 'Egreso']
    },
    concept: {
        type: String,
        enum: ['Salario', 'Honorarios', 'Rentas', 'Otros', 'Alimentos', 'Transporte', 'Alquiler', 'Hogar', 'Teléfono', 'Internet', 'Otros']
    },
    description: {
        type: String
    },
    amount: {
        type: Number
    },
    recurring: {
        type: Boolean
    },
    date: {
        type: Date
    }
    },
    { timestamps: true }
);

TransactionSchema.methods.publicData = function() {
    return {
        id: this.id,
        userID: this.userID,
        type: this.type,
        concept: this.concept,
        decription: this.description,
        amount: this.amount,
        recurring: this.recurring,
        date: this.date,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('Transaction', TransactionSchema);