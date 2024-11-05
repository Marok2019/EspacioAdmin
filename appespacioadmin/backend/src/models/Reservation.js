const reservationSchema = new mongoose.Schema({
    commonArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CommonArea',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending'
    },
    amount: Number
  }, { timestamps: true });
  
  module.exports = {
    User: mongoose.model('User', userSchema),
    Condominium: mongoose.model('Condominium', condominiumSchema),
    CommonExpense: mongoose.model('CommonExpense', commonExpenseSchema),
    Reservation: mongoose.model('Reservation', reservationSchema)
  };