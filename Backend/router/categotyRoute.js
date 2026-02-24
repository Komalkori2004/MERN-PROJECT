const express=require("express")
const router=express.Router()
const Category=require("../model/categorySchema")


router.post("/", async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
});
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

module.exports = router;