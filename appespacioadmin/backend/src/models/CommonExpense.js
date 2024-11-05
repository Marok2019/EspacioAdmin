const commonExpenseSchema = new mongoose.Schema({
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    month: {
      type: Date,
      required: true
    },
    details: [{
      concept: String,
      amount: Number
    }],
    status: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending'
    },
    paymentDate: Date,
    paymentProof: String,
    lateFee: Number
  }, { timestamps: true });