const express = require("express");
const router = express.Router();
const multer = require("multer")
const Products = require("../model/products");
const { protect, isAdmin } = require("../middlewere/protect")

// =====multer========

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage })

// ===========Router======


router.post("/", protect, isAdmin, upload.single("thumbnail"), async (req, res) => {
    const product = await Products.create({
        title: req.body.title,
        description: req.body.description,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        discountPercentage: req.body.discountPercentage,
        countInStock: req.body.countInStock,
        thumbnail: req.file ? req.file.path : "",
        createdBy: req.user.id
    })
    res.status(202).json(product)
})


// =======to Get products========

router.get("/", async (req, res) => {
    try {
        const keyword = req.query.keyword
        const query = keyword ? {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { brand: { $regex: keyword, $options: "i" } },
            ],
        } : {}
        const product = await Product.find(query)
        res.json(product)

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/:slug", async (req, res) => {
    const product = await Products.findOne({ slug: req.params.slug })

    if (!product) {
        return res.status(404).json({ message: "NOT FOUND" })
    }

    res.json(product)
})

module.exports = router
