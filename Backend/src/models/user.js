const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "pharmacy"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// تشفير الباسورد تلقائياً قبل الحفظ في قاعدة البيانات
userSchema.pre("save", async function (next) {
  // لو الباسورد ماتعدلش، كمل حفظ عادي
  if (!this.isModified("password")) {
    return next();
  }
  
  // توليد مفتاح تشفير معقد ودمجه مع الباسورد
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// دالة جاهزة لمقارنة الباسورد وقت تسجيل الدخول
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);