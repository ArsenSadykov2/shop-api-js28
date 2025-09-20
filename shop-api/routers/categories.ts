import express from "express";
import Category from "../models/Category";
import {CategoryMutation} from "../types";
import mongoose from "mongoose";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res) => {
    try{
        const categories = await Category.find();
        res.send(categories);
    } catch (e) {
        res.sendStatus(500);
    }
});

categoriesRouter.post("/", async (req, res) => {
    try{
        const categoryDate: CategoryMutation = {
            title: req.body.title,
            description: req.body.description,
        };

        const category = new Category(categoryDate);
        await category.save();
        res.send(category);
    } catch(e) {
        if(e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send({error: e.message});
        }
        res.sendStatus(500);
    }
})

export default categoriesRouter;