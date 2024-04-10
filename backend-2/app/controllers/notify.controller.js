const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const NotifyService = require("../services/notify.service");

exports.create = async(req, res, next) => {
    try {
        const notifyService = new NotifyService(MongoDB.client);
        const document = await  notifyService.create(req.body);
        
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error ocurreed while creating the notify")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const notifyService = new NotifyService(MongoDB.client);
        documents = await notifyService.find({});
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while retrieving notify")
        );
    }
    return res.send(documents);
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const  notifyService = new NotifyService(MongoDB.client);
        await notifyService.deleteMany();
        return res.send("Delete successly");
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all notifys")
        );
    }
};