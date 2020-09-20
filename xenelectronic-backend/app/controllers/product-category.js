const response = require("../helpers/response");
const responseError = require("../helpers/response-error");
const ProductCategory = require("../models/productCategory")
const Product = require("../models/product")
const mongoose = require("mongoose")

module.exports = {
    view: async (req, res) => {
        try {
            const productCategory = await ProductCategory.find({})
            return res.status(200).json(response(productCategory));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    create: async (req, res) => {
        try {
            if (!req.body.name) return res.status(200).json(responseError(400, 'INVALID VALUE'))
            const inputValue = req.body
            const newProductCategory = await ProductCategory.create(inputValue)
            return res.status(200).json(response(newProductCategory));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    update: async (req, res) => {
        try {
            if (!req.body.name) return res.status(200).json(responseError(400, 'INVALID VALUE'))
            const updateValue = req.body
            const updatedProductCategory = await ProductCategory.findByIdAndUpdate(req.body.id, updateValue, {new: true})
            return res.status(200).json(response(updatedProductCategory));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    delete: async (req, res) => {
        try {
            if (!req.body.id) return res.status(200).json(responseError(400, 'INVALID VALUE'))
            const deletedProductCategory = await ProductCategory.findByIdAndUpdate(req.body.id, {isDeleted:true}, {new: true})
            await Product.updateMany({category: mongoose.Types.ObjectId(req.body.id)},{isDeleted:true})
            return res.status(200).json(response(deletedProductCategory));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    reactivate: async (req, res) => {
        try {
            if (!req.body.id) return res.status(200).json(responseError(400, 'INVALID VALUE'))
            const activatedProductCategory = await ProductCategory.findByIdAndUpdate(req.body.id, {isDeleted:false}, {new: true})
            await Product.updateMany({category: mongoose.Types.ObjectId(req.body.id)},{isDeleted:false})
            return res.status(200).json(response(activatedProductCategory));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    }

}