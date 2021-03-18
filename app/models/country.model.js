// module.exports = mongoose => {
//     const Tutorial = mongoose.model(
//       "country",
//       mongoose.Schema(
//         {
//           title: String,
//           description: String,
//           published: Boolean
//         },
//         { timestamps: true }
//       )
//     );
  
//     return Tutorial;
//   };
  
const { Schema, model } = require('mongoose');

const localeSchema = new Schema({
    _id: false,
    lang: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    capital: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

  module.exports = mongoose => {
    const Country = mongoose.model(
      "country",
      mongoose.Schema(
        {
            imageUrl: String,
            videoUrl: String,
            currency: {
              type: String,
              required: true,
            },
            ISOCode: {
              type: String,
              uppercase: true,
              unique: true,
              required: true,
            },
            UTC: {
              type: String,
              required: true,
            },
            capitalLocation: {
              type: {
                type: String,
                enum: ['Point'],
                required: true,
              },
              coordinates: {
                type: [Number],
                required: true,
              },
            },
            localizations: [localeSchema],
        },
        { timestamps: true }
      )
    );
  
    return Country;
  };

//   const countrySchema = new Schema({
//     imageUrl: String,
//     videoUrl: String,
//     currency: {
//       type: String,
//       required: true,
//     },
//     ISOCode: {
//       type: String,
//       uppercase: true,
//       unique: true,
//       required: true,
//     },
//     capitalLocation: {
//       type: {
//         type: String,
//         enum: ['Point'],
//         required: true,
//       },
//       coordinates: {
//         type: [Number],
//         required: true,
//       },
//     },
//     localizations: [localeSchema],
//   });
  
//   const Country = model('Country', countrySchema);