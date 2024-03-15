const { ObjectId } = require("mongodb");
class CartService {
    constructor(client) {
        this.Cart = client.db().collection("cart");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    extractCartData(username, payload) {

        const cart = {
            username: username,
            bookId: payload.id,
            price: payload.price,
            quantily: payload.quantily,
            status: payload.status
        };
        
        // Remove undefined fields
        Object.keys(cart).forEach(
            (key) => cart[key] === undefined && delete cart[key]
        );
        return cart;
    }

    async create(username, payload) {
            const cart = this.extractCartData(username, payload);
            await this.Cart.insertOne(
                cart,
                { returnDocument: "after", upsert: true },
            );
            return "Tao gio hang thanh cong";
    }

    async find(username) {
        const  cursor = await this.Cart.find({username: username});
        return await cursor.toArray();
    }

    async update(username, payload) {
        const filter = {
            _id: username,
        };
        const update = this.extractCartData(username, payload);
        const result = await this.Cart.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(username, bookId) {
        const filter = {
            username: username,
            bookId: bookId       
        };
        const result = await this.Cart.deleteOne(filter);
        ;
        return result;
    }

    async deleteAll(username) {
        const result = await this.Cart.findOneAndDelete({
            username: username,
        });
        return result;
    }
}
module.exports = CartService;
