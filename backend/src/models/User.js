const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  mobile:    { type: String, required: true },
  password:  { type: String, required: true, minlength: 8 },
  gender:    { type: String, enum: ['male', 'female', 'other', ''] },
  addresses: [
    {
      label:    String,
      fullName: String,
      phone:    String,
      line1:    String,
      line2:    String,
      city:     String,
      state:    String,
      pincode:  String,
      isDefault:{ type: Boolean, default: false }
    }
  ],
  wishlist:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);
