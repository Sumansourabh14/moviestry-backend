const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MediaModel = mongoose.model("media", mediaSchema);
module.exports = MediaModel;
