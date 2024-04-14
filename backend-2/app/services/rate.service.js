class RateService {
    constructor(client) {
        this.Rate = client.db().collection("rate");
    }
    extractRateData(payload){
        const rate = {
            username:payload.username,
            bookId : payload.bookId,
            rating : Number(payload.rating),
            review : payload.review || ""
        };
        Object.keys(rate).forEach(
            (key) => rate[key] === undefined && delete rate[key]
        );
        return rate;
    }
    async create(payload) {
        const newRate = this.extractRateData(payload);
        const document = await this.Rate.insertOne(
            newRate,
            { returnDocument: "after", upsert: true },
        );
        return document;
    }

}