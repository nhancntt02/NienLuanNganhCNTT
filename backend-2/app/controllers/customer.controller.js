const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const CustomerService = require("../services/customer.service");

exports.create = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const document = await customerService.create(req.body);
        if(document == null)
        {
            return next(
                new ApiError(400, "Tên đăng nhập đã tồn tại")
            );
        }
        return res.send("Tài khoản đã được tạo thành công");
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the customer")
        );
    }
};

exports.login = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const document = await customerService.login(req.body);
        if(document){
            return res.send(document);
        }
        else
        {
            return next(
                new ApiError(400, `Tên đăng nhập hoặc mật khẩu sai`)
            );
        }
    } catch (error) {
        return next(
            new ApiError(500, `Error`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const customerService = new CustomerService(MongoDB.client);
        const document = await customerService.update(req.params.id, req.body);

        if(!document) {
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send({message: "Contact was update successfully"});
    } catch (error) {
        return next (
            new ApiError(500,  `Error  updating contact with id=${req.params.id}` )
        );
    }
};
exports.findOne = async (req,res,next) => {
    try 
    {
        const customerService = new CustomerService(MongoDB.client);
        const result = await customerService.findOne(req.params.id);
        return res.send(result);
    }
    catch (error) {
        return next (
            new ApiError(500,  `Error while searching id=${req.params.id}` )
        );
    }
}   