
const { Schema, model } = require('mongoose');

const placeLocaleSchema = new Schema({
  _id: false,
  lang: {
    type: String,
    required: true,
  },
  name: String,
  description: String,
});

  module.exports = mongoose => {
    const Place = mongoose.model(
      "place",
      mongoose.Schema(
        {
          countryId: {
            type: Schema.Types.ObjectId,
            require: true,
          },
          imageUrl: {
            type: String,
            require: true,
          },
          localizations: [placeLocaleSchema]
        },
        { timestamps: true }
      )
    );
  
    return Place;
  };
