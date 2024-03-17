const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
class CustomerService {
    constructor(client) {
        this.Customer = client.db().collection("customers");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    extractCustomerData(payload) {
        const customer = {
            _id: payload.username.toLowerCase(),
            password: payload.passwordtoLowerCase(),
            hoten: payload.name,
            diachi: payload.address,
            sdt: payload.phone,

        };
        Object.keys(customer).forEach(
            (key) => customer[key] === undefined && delete customer[key]
        );
        return customer;
    }
    extractLoginData(payload) {
        const user = {
            _id: payload.username.toLowerCase(),
            password: payload.password.toLowerCase(),
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }
    async create(payload) {
            const newUsername = await this.Customer.findOne({_id :payload.username});
            if(newUsername) {
                return null;
            }
            else {
                const customer = this.extractCustomerData(payload);
                const result = await this.Customer.insertOne(
                    customer,
                    { returnDocument: "after", upsert: true }
                );
                return result;
            }
    }

    async login(payload) {
        const user = this.extractLoginData(payload);
        const result = await this.Customer.findOne({username: user.username,password: user.password});
        return result;
    }
    async update(id,payload) {
        const user = this.extractCustomerData(payload);
        const  filter = {
            _id: id,
        };
        const result = await this.Customer.findOneAndUpdate(
            filter,
            {$set:user})
        return result;
    }
    async findOne(id){
        const result = await this.Customer.findOne({_id:id});
        return result;
    }
}
module.exports = CustomerService;
