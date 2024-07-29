const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Webhook = new Schema(
  {
    body: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Webhook', Webhook);
