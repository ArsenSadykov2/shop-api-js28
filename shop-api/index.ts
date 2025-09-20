import express from "express";
import productRouter from "./routers/products";
import categoriesRouter from "./routers/categories";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use('/products', productRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/shop');

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    })
};

run().catch(console.error);
