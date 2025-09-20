import express from "express";
import {ProductMutation} from "../types";
import {imagesUpload} from "../multer";
import Product from "../models/Product";
import mongoose from "mongoose";

const productRouter = express.Router();

productRouter.get('/',async (req, res) => {
    try{
        const products = await Product.find().populate('category', 'title description');
        res.send(products);
    } catch (e) {
        res.sendStatus(500);
    }
});

productRouter.get('/:id', async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).send({error: "Product not found"});
        }
        res.send(product);
    } catch (e) {
        res.sendStatus(500);
    }
});

productRouter.post('/',imagesUpload.single('image'), async (req, res) => {
    const newProduct: ProductMutation = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.file ? 'images/' + req.file.filename : null,
    };
    try{
        const product = new Product(newProduct);
        await product.save();
        res.send(product);
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send({error: e.message});
        }
        res.sendStatus(500);
    }
});

export default productRouter;