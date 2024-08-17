const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    mediaId: {
      type: Number,
      required: true,
    },
    original_title: {
      type: String,
    },
    title: {
      type: String,
    },
    overview: {
      type: String,
    },
    genre_ids: {
      type: Array,
    },
    backdrop_path: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    release_date: {
      type: String,
    },
    original_language: {
      type: String,
    },
    adult: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const MediaModel = mongoose.model("media", mediaSchema);
module.exports = MediaModel;
