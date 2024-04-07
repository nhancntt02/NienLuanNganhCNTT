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
    async get(id) {
        return (await this.api.get(`/customer/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/customer/${id}`, data)).data;
    }
}
export default new CustomerService()