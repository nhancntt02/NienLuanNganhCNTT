const express = require("express");
const customer = require("../controllers/customer.controller");
const book =  require("../controllers/book.controller");
const order = require("../controllers/order.controller");
const cart = require("../controllers/cart.controller");
const router = express.Router();



router.route("/cart/:username")
    .post(cart.create)
    .get(cart.findAll)
    .put(cart.update)
    .delete(cart.deleteAll)
    
router.route("/cart/:username/:bookId")
    .delete(cart.delete)

router.route("/customer")
    .post(customer.create)
    .get(customer.getIP);
router.route("/customer/login")
    .post(customer.login);

router.route("/customer/:id")
     .put(customer.update)
     .get(customer.findOne)

router.route("/admin")
    .post(book.create)
    .delete(book.deleteAll)

router.route("/admin/:id")
    .put(book.update)
    .delete(book.delete)

router.route("/find")
    .get(book.findAll)

router.route("/find/:id")
    .get(book.findOne)

router.route("/order")
    .post(order.create)
    .get(order.getAll)
router.route("/order/:username")
    .post(order.getUserOrder)
module.exports = router;
