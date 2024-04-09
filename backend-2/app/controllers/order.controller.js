const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const OrderService = require("../services/order.service");

exports.create = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create(req.body);
        res.send(document);
    }
    catch (error) 
    {
        return next(
            new ApiError(500, "An error occurred while creating the order")
        );
    }
}
exports.getAll = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.getAllOrders();
        res.send(document);
    }
    catch (error) 
    {
        return next(
            new ApiError(500, "An error occurred while creating the order")
        );
    }
}
exports.getUserOrder = async (req,res,next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.getUserOrder(req.params.username);
        res.send(document);
    }
    catch (error) 
    {
        return next(
            new ApiError(500, "An error occurred while creating the order")
        );
    }
}