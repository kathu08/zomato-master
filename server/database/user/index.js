import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ detail: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.findByEmailAndPhone = async (email, phoneNumber) => {
  // check whether email exist
  const checkUserByEmail = await UserModel.findOne({ email });
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User already exist");
  }
  return false;
};

UserSchema.pre("save", function (next) {
  const user = this;

  if(!user.isModified("password")) return next();
});

export const UserModel = mongoose.model("Users", UserSchema);
