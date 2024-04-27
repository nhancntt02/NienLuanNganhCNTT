<template>
    <div>
        <div v-for="(row, index) in rows" :key="index" class="row">
            <div v-for="(book, j) in row" :key="book._id"
                class="book-container col-xl col-md-6 col-12 border rounded bg-light text-center">
                <router-link :to="{ name: 'bookinfo', params: { bookId: book._id } }"><img class="img-fluid"
                        style="height: 200px; width: 160px; margin: 0 auto;" :src="book.hinh"
                        alt="book_image"></router-link>
                <div class="book-info">
                    <div>
                        {{ book.tensach }}
                    </div>
                    <div class="text-danger">
                        {{ book.gia }}đ
                    </div>
                    <div class="d-flex justify-content-between  ">
                        <p v-if="book.soquyen != 0">Số lượng: {{ book.soquyen }}</p>
                        <p v-else class="text-danger">Đã hết hàng</p>
                        <p v-if="rating[index*4+j] > 0">Đánh giá: {{rating[index*4+j]}}/5</p>
                        <p v-else>Chưa có đánh giá</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <button class="btn btn-sm btn-outline-primary" @click="addToCart(book)">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success">
                        <router-link class="nav-link" :to="{ name: 'orderconfirm', params: { bookId: book._id } }">
                            Mua ngay
                        </router-link>
                    </button>
                </div>
            </div>
            <div v-for="k in 4 - row.length" :key="k" class="col-xl col-md-6 col-12"></div>
        </div>
    </div>
</template>
<style>
.book-container {
    display: flex;
    flex-direction: column;
}

.book-info {
    margin-top: auto;
}
</style>
<script>
import CartService from "@/services/cart.service";
import RateService from "@/services/rate.service";
export default {
    props: {
        books: { type: Array, default: () => [] }
    },
    data() {
        return {
            cartItem: {
                bookId: "",
                price: "",
                quantity: 1,
            },
            rating: [],
        }
    },
    computed: {
        rows() {
            const rowCount = Math.ceil(this.books.length / 4);
            const rows = [];
            for (let i = 0; i < rowCount; i++) {
                const start = i * 4;
                const end = Math.min(start + 4, this.books.length);
                rows.push(this.books.slice(start, end));
            }
            this.getRate();
            return rows;
        },
    },
    methods: {
        async getRate() {
            for (let i = 0; i < this.books.length; i++) {
                const rate= await RateService.getAverageRating(this.books[i]._id);
                this.rating.push(rate.avg_rating);
            }
        },
        goToBookDetail(id) {
            this.$router.push({ name: "bookinfo", params: { bookId: id } });
        },
        async addToCart(book) {
            const userName = sessionStorage.getItem("userName");
            this.cartItem.bookId = book._id;
            this.cartItem.price = book.gia;
            this.cartItem.hinh = book.hinh;
            this.cartItem.tensach = book.tensach;
            if (userName) {
                try {
                    await CartService.create(userName, this.cartItem);
                    alert('Thêm vào giỏ hàng thành công!');
                    location.reload();
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                const guest = sessionStorage.getItem("guest");
                await CartService.create(guest, this.cartItem);
                alert('Thêm vào giỏ hàng thành công!');
                location.reload();
            }
        }
    },
    created(){
        this.getRate();
    }
};
</script>
