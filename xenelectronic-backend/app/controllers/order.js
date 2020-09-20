const response = require("../helpers/response");
const responseError = require("../helpers/response-error");
const Order = require("../models/order")
const Payment = require("../models/payment")
const Product = require("../models/product")
const User = require("../models/user")
const mongoose = require("mongoose");

module.exports = {
    view: async (req, res) => {
        try {
            const orderValue = await Order.find().populate({ path: "products.products", populate: { path: 'category' } })
            return res.status(200).json(response(orderValue));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    viewMyCart: async (req, res) => {
        try {
            const userData = req.userData.user._id
            const cartValue = await Order.findOne({ user: userData, orderStatus: 'DRAFT' }).populate({ path: "products.products", populate: { path: 'category' } })
            return res.status(200).json(response(cartValue));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    viewMyOrderHistory: async (req, res) => {
        try {
            const userData = req.userData.user._id
            const historyValue = await Order.find({ user: userData, orderStatus: { $ne: 'DRAFT' } }).populate({ path: "products.products", populate: { path: 'category' } })
            return res.status(200).json(response(historyValue.reverse()));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    addToCart: async (req, res) => {
        try {
            const userData = req.userData.user._id
            const products = req.body.products
            const hasCart = await Order.findOne({ user: mongoose.Types.ObjectId(userData), orderStatus: 'DRAFT' })
            if (!hasCart) {
                let total = 0
                let productValue = await Product.findById(products.products)
                total += productValue.price * products.qty
                const newOrderValue = {
                    user: userData,
                    products: products,
                    address: req.body.address,
                    total: total
                }
                const newOrder = await Order.create(newOrderValue)
                return res.status(200).json(response(newOrder));
            }      
            let isAlreadyInCart = hasCart.products.findIndex(product => product.products == products.products)
            if (isAlreadyInCart < 0) {
                hasCart.products.push(products)
            } else { 
                hasCart.products[isAlreadyInCart].qty += products.qty
            }
            let total = 0
            for (var i = 0; i < hasCart.products.length; i++) {
                let productValue = await Product.findById(hasCart.products[i].products)
                total += productValue.price * hasCart.products[i].qty
            }
            const updateCart = await Order.findByIdAndUpdate(hasCart._id, { products: hasCart.products, total: total }, { new: true })
            return res.status(200).json(response(updateCart));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    updateCart: async (req, res) => {
        try {
            const userData = req.userData.user._id
            const products = req.body.products
            const hasCart = await Order.findOne({ user: userData, orderStatus: 'DRAFT' })
            if (!hasCart) return res.status(200).json(responseError(400, 'CART NOT FOUND'))
            const itemIdx = hasCart.products.findIndex(product => product.products == products.products)
            if (itemIdx < 0) return res.status(200).json(responseError(400, 'PRODUCT NOT FOUND'))
            hasCart.products[itemIdx].qty = products.qty
            let total = 0
            for (var i = 0; i < hasCart.products.length; i++) {
                let productValue = await Product.findById(hasCart.products[i].products)
                total += productValue.price * hasCart.products[i].qty
            }
            const updateCart = await Order.findByIdAndUpdate(hasCart._id, { products: hasCart.products, total: total }, { new: true })
            return res.status(200).json(response(updateCart));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const userData = req.userData.user._id
            const products = req.body.products
            const hasCart = await Order.findOne({ user: userData, orderStatus: 'DRAFT' })
            if (!hasCart) return res.status(200).json(responseError(400, 'CART NOT FOUND'))
            const deleteItem = hasCart.products.findIndex(product => product.products == products.products)
            if (deleteItem < 0) return res.status(200).json(responseError(400, 'PRODUCT NOT FOUND'))
            await hasCart.products.splice(deleteItem, 1)
            let total = 0
            for (var i = 0; i < hasCart.products.length; i++) {
                let productValue = await Product.findById(hasCart.products[i].products)
                total += productValue.price * hasCart.products[i].qty
            }
            const updateCart = await Order.findByIdAndUpdate(hasCart._id, { products: hasCart.products, total: total }, { new: true })
            return res.status(200).json(response(updateCart));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    viewPaymentDetailByOrder: async (req, res) => {
        try {
            const isPaymentFound = await Payment.findOne({ order: req.body.order })
            if (!isPaymentFound) return res.status(200).json(responseError(400, 'NO AWAITING PAYMENT FOUND'))
            return res.status(200).json(response(isPaymentFound));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    submitToPayment: async (req, res) => {
        try {
            const userData = req.userData.user._id
            const userDetail = await User.findById(userData, 'phoneNumber')
            const hasPayment = await Order.findOne({ user: userData, orderStatus: 'AWAITING PAYMENT' })
            if (hasPayment) return res.status(200).json(responseError(400, 'PLEASE COMPLETE PREVIOUS PAYMENT'))
            const orderDetail = await Order.findOne({user: userData, orderStatus: 'DRAFT'})
            await Order.findByIdAndUpdate(orderDetail._id, { orderStatus: 'AWAITING PAYMENT' }, { new: true })
            const createPaymentValue = {
                order: orderDetail._id,
                total: orderDetail.total,
                vaNumber: '12345' + userDetail.phoneNumber
            }
            const newPayment = await Payment.create(createPaymentValue)
            return res.status(200).json(response(newPayment));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    },

    confirmPayment: async (req, res) => {
        try {
            const isPaymentFound = await Payment.findOne({ vaNumber: req.body.vaNumber, paymentStatus: 'AWAITING PAYMENT' })
            if (!isPaymentFound) return res.status(200).json(responseError(400, 'PAYMENT NOT FOUND'))
            if (isPaymentFound.total !== req.body.total) return res.status(200).json(responseError(400, 'PAYMENT AMOUNT FALSE'))
            await Payment.findByIdAndUpdate(isPaymentFound._id, { paymentStatus: 'PAID' }, { new: true })
            const orderPaid = await Order.findByIdAndUpdate(isPaymentFound.order, { orderStatus: 'PAID' }, { new: true })
            return res.status(200).json(response(orderPaid));
        } catch (e) {
            console.log(e)
            return res.status(200).json(responseError(400, e.toString()));
        }
    }
}