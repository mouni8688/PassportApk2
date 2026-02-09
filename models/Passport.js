const mongoose = require("mongoose");

const passportSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    applicationNumber: {
      type: String,
      required: true,
      unique: true
    },

    department: {
      type: String,
      required: true
    },

    year: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending"
    },

    passportNumber: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Passport", passportSchema);
