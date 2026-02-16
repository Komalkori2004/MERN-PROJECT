const mongoose = require("mongoose");
const slugify = require("slugify");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    slug: { type: String, unique: true },

    description: { type: String, required: true },

    brand: { type: String, required: true },

    category: { type: String, required: true },

    thumbnail: { type: String, required: true },

    price: { type: Number, required: true },

    discountPercentage: { type: Number, default: 0 },

    finalPrice: Number,

    countInStock: { type: Number, required: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  
  { timestamps: true }
);

// ✅ Proper async middleware
ProductSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  this.finalPrice =
    this.price - (this.price * this.discountPercentage) / 100;
});

module.exports = mongoose.model("Product", ProductSchema);
