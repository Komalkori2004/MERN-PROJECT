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

router.get("/",async(req,res)=>{
    const products= await Products.find()
    res.json(products)
})

router.get("/:slug",async(req,res)=>{
    const product=await Products.findOne({slug:req.params.slug})

    if(!product){
        return res.status(404).json({message:"NOT FOUND"})
    }

    res.json(product)
})

module.exports=router
