const express = require('express');
const uploadfile = require('../services/storage.service');
const Router = express.Router();
const ProductModel = require('../models/product.model');
const multer = require('multer');
const upload = multer({storage:multer.memoryStorage()})

Router.post('/products', upload.single('image'), async (req, res) => {
  const { name, category, price, description } = req.body;

  // Validate required fields
  if (!name || !category || !price || !description) {
    return res.status(400).json({ message: "All product fields are required" });
  }

  // Validate file
  if (!req.file) {
    return res.status(400).json({ message: "Product image is required" });
  }

  try {
    // Upload file (wrap in try to catch upload errors)
    const fileData = await uploadfile(req.file);

    // log payload to help debug validation errors
    console.log('Product payload:', { name, category, price, description, filePresent: !!req.file });

    const product = await ProductModel.create({
      name: name,
      category: category,
      price: price,
      image: fileData?.url || "",
      description: description,
    });

    res.status(200).json({ message: "Product Created Successfully", product });
  } catch (error) {
    console.error("Error in /products POST:", error);
    return res.status(500).json({ message: error?.message || "Server error" });
  }
});

// Router.get("/products", async (req, res) => {
//   try {
//     // Read _start and _limit from query params
//     const skip = parseInt(req.query._skip) || 0;
//     const limit = parseInt(req.query._limit) || 4;

//     // Fetch products with skip + limit
//     const products = await ProductModel.find()
//       .skip(skip)
//       .limit(limit);

//     res.status(200).json({
//       message: "Products fetched successfully",
//       products,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });




// Router.get("/products", async (req, res) => {
//   try {
//     const products = await ProductModel.find();
//     res.status(200).json(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }   
// }) 


Router.get("/products", async (req, res) => {
  try {
    // query params: ?_skip=0&_limit=4
    console.log(req)
    const skip = parseInt(req.query._skip) || 0;
    const limit = parseInt(req.query._limit) || 8; // jitna per page chahiye

    const [products, total] = await Promise.all([
      ProductModel.find().skip(skip).limit(limit),
      ProductModel.countDocuments(),
    ]);

    res.status(200).json({
      message: "Products fetched successfully",
      products,
      total,
      hasMore: skip + products.length < total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



Router.get("/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // MongoDB _id se product fetch
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching single product:", error);

    // invalid ObjectId case
    return res.status(400).json({
      message: "Invalid product id",
    });
  }
});


Router.patch("/products/:id" , async (req, res) => {
const id = req.params.id
const { name, category, price, image, description } = req.body;


try {
  const product = await ProductModel.findByIdAndUpdate(id, {
    name,
    category,
    price,
    image,
    description
  }, { new: true });
  // console.log(product)

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "Product updated successfully", product:product });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server error" });
}
});



Router.delete("/products/:id", async(req,res)=>{
  const id = req.params.id
  
  
  try {
    const product = await ProductModel.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
        
  
    res.status(200).json({ message: "Product Deleted Successfully", product:product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
  })
module.exports = Router