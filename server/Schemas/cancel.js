const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Cancel = new Schema(
  {
    body: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cancel', Cancel);
