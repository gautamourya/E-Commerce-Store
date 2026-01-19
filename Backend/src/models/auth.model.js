const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    // store a reference to the product; make it an ObjectId (not strictly required)
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
}

)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "buyer",
    },

  },
  { timestamps: true }
);


const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel;