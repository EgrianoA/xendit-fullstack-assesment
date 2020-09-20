const response = require("../helpers/response");
const responseError = require("../helpers/response-error");
const Product = require("../models/product")

module.exports = {
    view: async (req, res) => {
        try {
            let query = {isDeleted:false}
            if (req.body.category && req.body.category.length > 0) {
                query.category = req.body.category
            }
            const productValue = await Product.find(query).populate({path:"category"})
            return res.status(200).json(response(productValue));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    create: async (req, res) => {
        try {
            if (!req.body.name) return res.status(200).json(responseError(400, 'NAME CANNOT BE EMPTY'))
            if (!req.body.category) return res.status(200).json(responseError(400, 'CATEGORY CANNOT BE EMPTY'))
            const inputValue = req.body
            const newProduct = await Product.create(inputValue)
            return res.status(200).json(response(newProduct));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    update: async (req, res) => {
        try {
            if(!req.body.id) return res.status(200).json(responseError(400, 'INVALID VALUE'))
            const updateValue = req.body
            const updatedProduct = await Product.findByIdAndUpdate(req.body.id, updateValue, { new: true })
            return res.status(200).json(response(updatedProduct));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    delete: async (req, res) => {
        try {
            if(!req.body.id) return res.status(200).json(responseError(400, 'INVALID VALUE'))
            const deletedProduct = await Product.findByIdAndUpdate(req.body.id, { isDeleted: true }, { new: true })
            return res.status(200).json(response(deletedProduct));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    reactivate: async (req, res) => {
        try {
            if(!req.body.id) return res.status(200).json(responseError(400, 'INVALID VALUE'))
            const activatedProduct = await Product.findByIdAndUpdate(req.body.id, { isDeleted: false }, { new: true })
            return res.status(200).json(response(activatedProduct));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    }

}