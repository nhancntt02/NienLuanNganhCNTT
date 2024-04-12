import createApiClient from "./api.service";
class OrderService{
    constructor(baseUrl = "/api/datas/") {
        this.api = createApiClient(baseUrl);
    }
    async create(data){
        return (await this.api.post("/order", data)).data;
    }
    async getAll(){
        return (await this.api.get("/order")).data;
    }
    async getUserOrder(id){
        return (await this.api.post(`/order/${id}`)).data; 
    }
    async update(id,data){
        return (await this.api.put(`/order/update/${id}`,data)).data; 
    }
}
export default new OrderService();