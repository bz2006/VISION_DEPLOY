import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js"
import multer from "multer";
import productModel from "../models/productModel.js";



const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'video/mp4':'mp4'
}

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'client/public/uploads')
    },
    filename: function (req, file, cb) {
        const newfile = file.originalname.split(" ").join("_")
        cb(null, newfile)
    }
})




export const createProductController = async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category')
    const file = req.file;
    let imagesPaths = [];
    const basePath = "public/uploads"
    const files = req.files
    if (files) {
        files.map(file => {
            imagesPaths.push(file.filename);
        })
    }

    if (!files) return res.status(400).send('No image in the request')

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        images: imagesPaths,
        mrp: req.body.mrp,
        category: req.body.category,
        InStock: req.body.InStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if (!product)
        return res.status(500).send('The product cannot be created')

    res.send(product);

}



export const getSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({product });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const productList = await productModel.find({});
        if (!productList) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        return res.status(200).json({ productList });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const categoryId = req.params.id; 
        
        const productList = await productModel.find({ category: categoryId });
        
        if (!productList) {
            return res.status(404).json({ success: false, message: 'No products found for the specified category' });
        }
        console.log("haii console")
        return res.status(200).json({ success: true, productList });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const updateProducts = async (req, res) => {
    const file = req.file;
    let imagesPaths = [];
    const files = req.files
    const img = req.body.images

    try {
        for (let pic of img) {
            imagesPaths.push(pic)
        }

        if (files) {
            files.map(file => {
                if (!imagesPaths.includes(file.filename)) {
                    imagesPaths.push(file.filename);
                }
            })
        }
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            {

                name: req.body.name,
                description: req.body.description,
                images: imagesPaths,
                mrp: req.body.mrp,
                category: req.body.category,
                InStock: req.body.InStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found or cannot be updated.' });
        }
        res.json({ message: 'Product updated successfully', updatedProduct: product });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteproduct = async (req, res) => {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the product is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "product not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
}