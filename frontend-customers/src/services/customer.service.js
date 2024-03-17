import createApiClient from "./api.service";
class CustomerService {
    constructor(baseUrl = "/api/datas/") {
        this.api = createApiClient(baseUrl);
    }
    async login(data) {
        return (await this.api.post("/customer/login",data)).data;
    }
    async create(data) {
        return (await this.api.post("/customer", data)).data;
    }
    // async deleteAll() {
    //     return (await this.api.delete("/admin")).data;
    // }
    // async get(id) {
    //     return (await this.api.get(`/admin/${id}`)).data;
    // }
    // async update(id, data) {
    //     return (await this.api.put(`/admin/${id}`, data)).data;

    // }
    // async delete(id) {
    //     return (await this.api.delete(`/admin/${id}`)).data;
    // }
}
export default new CustomerService()