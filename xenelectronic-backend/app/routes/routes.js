const express = require("express")
const router = express.Router()
const checkRequest = require("../helpers/check-request")
const userAuthController = require("../controllers/userAuth")
const productCategoryController = require("../controllers/product-category")
const productController = require("../controllers/product")
const orderController = require("../controllers/order")

//user
router.post("/signup", userAuthController.signup)
router.post("/login", userAuthController.login)

//productCategory
router.get("/productCategory/view", productCategoryController.view)
router.post("/productCategory/create", productCategoryController.create)
router.post("/productCategory/update", productCategoryController.update)
router.post("/productCategory/delete", productCategoryController.delete)
router.post("/productCategory/reactivate", productCategoryController.reactivate)

//product
router.post("/product/view", productController.view)
router.post("/product/create", productController.create)
router.post("/product/update", productController.update)
router.post("/product/delete", productController.delete)
router.post("/product/reactivate", productController.reactivate)

//order
router.get("/order/view", checkRequest.headers, orderController.view)
router.get("/order/viewMyCart", checkRequest.headers, orderController.viewMyCart)
router.get("/order/viewMyOrderHistory", checkRequest.headers, orderController.viewMyOrderHistory)
router.post("/order/addToCart", checkRequest.headers, orderController.addToCart)
router.post("/order/updateCart", checkRequest.headers, orderController.updateCart)
router.post("/order/removeFromCart", checkRequest.headers, orderController.removeFromCart)
router.post("/order/viewPaymentDetailByOrder", checkRequest.headers, orderController.viewPaymentDetailByOrder)
router.get("/order/submitToPayment", checkRequest.headers, orderController.submitToPayment)
router.post("/order/confirmPayment", checkRequest.headers, orderController.confirmPayment)



module.exports = router
