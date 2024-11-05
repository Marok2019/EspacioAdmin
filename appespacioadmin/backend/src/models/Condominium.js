const condominiumSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    units: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit'
    }],
    commonAreas: [{
      name: String,
      type: {
        type: String,
        enum: ['parking', 'bbq', 'sportsCourt', 'eventRoom']
      },
      capacity: Number,
      pricePerHour: Number
    }]
  }, { timestamps: true });