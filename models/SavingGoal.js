const mongoose = require('mongoose');

const SavingGoalSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    goal: {
        type: String
    },
    amountSaved: {
        type: Number
    },
    targetAmount: {
        type: Number
    },
    targetDate: {
        type: Date
    }
    },
    { collection: "savingGoals", timestamps: true }
);

SavingGoalSchema.methods.publicData = function() {
    return {
        id: this.id,
        userID: this.userID,
        goal: this.goal,
        amountSaved: this.amountSaved,
        targetAmount: this.targetAmount,
        targetDate: this.targetDate
    };
};

mongoose.model('SavingGoal', SavingGoalSchema);