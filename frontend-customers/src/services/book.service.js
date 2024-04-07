import createApiClient from "./api.service";
class BookService {
    constructor(baseUrl = "/api/datas") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/find")).data;
    }
    async getByName(tensach) {
        return (await this.api.get("/find?tensach=" + tensach)).data;
    }
    async get(id) {
        return (await this.api.get(`/find/${id}`)).data;
    }
}
export default new BookService()