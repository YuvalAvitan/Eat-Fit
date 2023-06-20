import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: {
      type: String,
      required: false,
    },
    passwordResetExpires: {
      type: Date,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDietitian: {
      type: Boolean,
      required: false,
      default: false,
    },
    gender: {
      type: String,
      required: false,
    },
    health: {
      type: Boolean,
      required: false,
      default: false,
    },
    age: {
      type: Number,
      required: false,
      default: 0,
    },
    weight: {
      type: Number,
      required: false,
      default: 0,
    },
    height: {
      type: Number,
      required: false,
      default: 0,
    },
    purpuse: {
      type: String,
      required: false,
      default: "",
    },
    userWeight: [
      {
        weight: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Menu",
      },
    ],
    RecipesMenus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "RecipesMenu",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

export default User;
