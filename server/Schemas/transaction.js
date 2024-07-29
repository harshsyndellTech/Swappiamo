const { Schema, model } = require('mongoose');
const { statuses, types } = require('../transactionHistoryHelpers');

const transactionSchema = new Schema(
  {
    id: {
      type: String,
    },
    status: {
      type: String,
      // enum: [types.BONUS, types.REFUND, types.SUBSCRIPTION, types.ORDER],
      required: true,
    },
    type: {
      type: String,
      // enum: [statuses.PENDING, statuses.COMPLETED],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    user_joined_id: {
      type: String,
      // required: true,
      index: true,
    },
    user_joined_name: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('transaction', transactionSchema);
