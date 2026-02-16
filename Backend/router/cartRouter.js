const express = require("express");
const router = express.Router();
const Cart = require("../model/cartSchema");
const { protect } = require("../middlewere/protect");

router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
  }
  res.status(200).json(cart);
});

// add quantity
router.put("/update", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
  }

  res.json(cart);
});


router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
  );

  if (!cart) {
    return res.json({ items: [] });
  }

  res.json(cart);
});


// delete item 

router.delete("/remove/:productId", protect, async (req, res) => {

  const cart = await Cart.findOne({ user: req.user._id })

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  cart.items = cart.items.filter(
    item => item.product.toString() !== req.params.productId
  );

  await cart.save();

  res.json(cart);
})

module.exports = router;

