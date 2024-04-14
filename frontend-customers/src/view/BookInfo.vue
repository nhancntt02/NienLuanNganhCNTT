<template>
    <h3 class="text-center border border-2 border-info py-2 mt-2">Chi tiết Sách</h3>
    <div class="card my-2" style="background: #f7eac3;">
        <div class="row g-0">
            <div class="col-md">
                <img :src="book.hinh" class="img-fluid rounded m-2" alt="book-image">
            </div>
            <div class="col-md">
                <div class="card-body">
                    <h3 class="card-title">{{ book.tensach }}</h3>
                    <h4 class="card-title text-danger">Giá: {{ book.gia }}đ</h4>
                    <p class="card-text fs-5">Thể loại: {{ book.theloai }}</p>
                    <p class="card-text fs-5">Số trang: {{ book.sotrang }}</p>
                    <p class="card-text fs-5">Nhà xuất bản: {{ book.nxb }}</p>
                    <p class="card-text fs-5">Số quyển: {{ book.soquyen }}</p>
                    <p class="card-text fs-5">Ngôn ngữ: {{ book.ngonngu }}</p>
                    <div class="d-flex">
                        <input type="number" inputmode="numeric" class="rounded mt-2 me-2 form-control" style="width: 80px; height: 35px;" min="1" v-model="quantity">
                        <button @click="addToCart(book)" class="btn btn-sm btn-success mt-2 me-2">Thêm vào giỏ hàng</button>
                        <button @click="buyNow()" class="btn btn-sm btn-primary mt-2">Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from "@/services/book.service";
import CartService from "@/services/cart.service";
export default {
    props: {
        bookId: { type: String, required: true }
    },
    data() {
        return {
            book: [],
            quantity: 1,
            cartItem: {
                bookId:"",
                price:"",
                quantity:1,
            },
        }
    },
    methods: {
        async getBook() {
            try {
                this.book = await BookService.get(this.bookId);
            }
            catch (error) {
                console.log(error);
            }
        },
        async addToCart(book){
            const userName = sessionStorage.getItem("userName");
            this.cartItem.bookId = book._id;
            this.cartItem.price = book.gia;
            this.cartItem.hinh = book.hinh;
            this.cartItem.tensach = book.tensach;
            this.cartItem.quantity = this.quantity;
            if(userName)
            {
                try{
                    const result = await CartService.create(userName,this.cartItem);
                    alert('Thêm vào giỏ hàng thành công!');
                    location.reload();
                }
                catch(error){
                    console.log(error);
                }
            }
            else{
                const guest = sessionStorage.getItem("guest");
                const result = await CartService.create(guest,this.cartItem);
                alert('Thêm vào giỏ hàng thành công!');
                location.reload();
            }
        },
        buyNow(){
            sessionStorage.setItem("quantity",this.quantity);
            this.$router.push({name: 'orderconfirm', params: { bookId: this.book._id }});
        }
    },
    created() {
        this.getBook();
    }
}
</script>