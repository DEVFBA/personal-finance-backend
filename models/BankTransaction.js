const mongoose = require('mongoose');

const BankTransactionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    accountNumber: {
        type: String
    },
    date: {
        type: Date
    },
    transactionType: {
        type: String,
        enum: ['Cargo', 'Abono']
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    categorized: {
        type: Boolean
    },
    accountType: {
        type: String,
        enum: ['Débito', 'Crédito']
    }
    },
    { collection: 'bankTransactions', timestamps: true }
);

BankTransactionSchema.methods.publicData = function() {
    return {
        id: this.id,
        userID: this.userID,
        accountNumber: this.accountNumber,
        date: this.date,
        transactionType: this.transactionType,
        amount: this.amount,
        categorized: this.categorized,
        description: this.description,
        accountType: this.accountType,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('BankTransaction', BankTransactionSchema);