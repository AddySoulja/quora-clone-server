import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, `Please provide a username.`],
    },
    email: {
      type: String,
      required: [true, `Please provide a valid email address.`],
      unique: [true, `This email has already been taken!`],
    },
    password: {
      type: String,
      required: [true, `Please provide a password.`],
    },
    posts: {
      type: Array,
    },
  },
  {
    collection: "Users",
  },
  {
    timestamps: true,
  }
);

// Pre password encryption using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// custom method to match the provided password with the actual password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
