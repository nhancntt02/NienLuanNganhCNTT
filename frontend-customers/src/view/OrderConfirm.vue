<template>
    <div v-if="!success">
        <h2 class="text-center mt-3">Xác nhận đơn hàng</h2>
        <hr>
        <table class="table w-50 text-center mx-auto">
            <thead>
                <tr>
                    <th colspan="2">Thông tin khách hàng: </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Họ và tên:</td>
                    <td>{{ user.hoten }}</td>
                </tr>
                <tr>
                    <td>Địa chỉ:</td>
                    <td>{{ user.diachi }}</td>
                </tr>
                <tr>
                    <td>Số điện thoại:</td>
                    <td>{{ user.sdt }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table w-75 mx-auto">
            <thead>
                <tr>
                    <th colspan="6" class="text-center">Thông tin sản phẩm: </th>
                </tr>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thành tiền</th>
                </tr>
            </thead>
            <tbody>
                <OrderConfirmCard v-if="bookId == 0" v-for="(item, index) in carts" :key="item.bookId" :order="item"
                    :index="index" />
                <OrderConfirmCard v-else :order="book" :index="0" />
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4"></td>
                    <td><b>Tổng giá trị đơn hàng:</b></td>
                    <td>{{ total }} VNĐ</td>
                </tr>
            </tfoot>
        </table>
        <button class="btn btn-primary mx-auto mb-3" @click="addOrder">Đặt Hàng</button>
    </div>
    <div v-else class="text-center m-auto border border-2 border-primary rounded p-3">
        <h3>Đã đặt hàng thành công!</h3>
        <router-link :to="{ name: 'order' }"><button class="btn btn-sm btn-primary mt-2">Đơn hàng</button></router-link>
    </div>
</template>
<script>
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import CustomerService from "@/services/customer.service";
import OrderConfirmCard from "@/components/OrderConfirmCard.vue";
import BookService from "@/services/book.service";
export default {
    props: {
        bookId: { type: String, default: '' }
    },
    data() {
        return {
            carts: [],
            user: {},
            total: 0,
            success: false,
            book: {},
        }
    },
    components:
    {
        OrderConfirmCard,
    },
    methods:
    {
        async getinfo() {
            this.user = await CustomerService.get(sessionStorage.getItem("userName"));
            this.carts = await CartService.get(this.user._id);
            this.carts.forEach(item => {
                this.total += item.price * item.quantity;
            });
        },
        async getBook() {
            try {
                this.user = await CustomerService.get(sessionStorage.getItem("userName"));
                this.book = await BookService.get(this.bookId);
                this.total = this.book.gia
            } catch (error) {
                console.log(error);
            }
        },
        async addOrder() {
            var order;
            if (this.bookId == 0) {
                order = {
                    username: this.user._id,
                    bookId: this.carts.map((item) => ({
                        bookId: item.bookId,
                        price: item.price,
                        quantity: item.quantity,
                        hinh: item.hinh,
                        tensach: item.tensach
                    })),
                    total: this.total,
                    date: new Date().toISOString().substr(0, 10)
                };
            }
            else{
                order = {
                    username: this.user._id,
                    bookId: [{
                        bookId: this.book._id,
                        price:this.book.gia,
                        quantity:1,
                        hinh:this.book.hinh,
                        tensach:this.book.tensach
                    }],
                    total: this.total,
                    date: new Date().toISOString().substr(0, 10)
                };
            }
            try {
                const orderId = await OrderService.create(order);
                this.success = true;
                await CartService.deleteAll(this.user._id);
            } catch (error) {
                alert("Thêm thất bại!");
            }
        },
    },
    created() {
        if (this.bookId != 0) {
            this.getBook();
            console.log(this.bookId);
        }
        else {
            this.getinfo();
        }
    }
}
</script>