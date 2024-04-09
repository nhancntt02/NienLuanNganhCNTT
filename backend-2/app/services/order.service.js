class OrderService
{
    constructor(client) {
        this.Order = client.db().collection("order");
    }
    extractOderData(payload)
    {
        const datetime = new Date().toISOString();
        const order = {
            _id: datetime + payload.username,
            username: payload.username,
            bookId : payload.bookId.map((item) => ({
                bookId: item.id,
                price: item.price,
                quantity: item.quantity
              })),
            total: payload.total,
            status: "Chờ xác nhận",
            date: payload.date
        }
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }
    async getAllOrders() { 
        return await this.Order.find({}).toArray();  
    }
    async getUserOrder(username){
        return await this.Order.find(
            {"username": username},
        ).toArray()
    }
    async create(payload){
        const order = this.extractOderData(payload);
        const result = await this.Order.insertOne(order);
         return result.insertedId;
     };
}
module.exports = OrderService;