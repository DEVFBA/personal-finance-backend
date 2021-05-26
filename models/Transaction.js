const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    origin: {
        type: String,
        enum: ['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito']
    },
    accountNumber: {
        type: String
    },
    type: {
        type: String,
        enum: ['Ingreso', 'Egreso']
    },
    concept: {
        type: String,
        enum: ['Salario', 'Honorarios', 'Rentas', 'Otros', 'Alimentos', 'Transporte', 'Alquiler', 'Hogar', 'Teléfono', 'Internet']
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
    },
    bankTransId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'BankTransaction'
    }
    },
    { timestamps: true }
);

TransactionSchema.methods.publicData = function() {
    return {
        id: this.id,
        userID: this.userID,
        origin: this.origin,
        accounNumber: this.accountNumber,
        type: this.type,
        concept: this.concept,
        decription: this.description,
        amount: this.amount,
        recurring: this.recurring,
        date: this.date,
        bankTransId: this.bankTransId,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('Transaction', TransactionSchema);