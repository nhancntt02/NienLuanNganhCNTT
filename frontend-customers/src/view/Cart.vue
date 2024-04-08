<template>
    <h3 class="text-center mt-3 border border-2 border-primary py-2 rounded">Giỏ hàng của bạn</h3>
    <div v-if="carts.length == 0" class="container text-center fs-3 pt-4 mt-auto">
        <p>Giỏ hàng của bạn không có gì cả!</p>
        <p>Mua hàng ngay nào!</p>
        <button class="btn btn-sm btn-outline-primary"><router-link class="nav-link fs-3" :to="{name: 'homeBook'}">Trang chủ</router-link></button>
    </div>
    <div v-else>
        <table id="myTable" class="table table-hover table-responsive w-75 mx-auto">
            <thead>
                <tr>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng cộng</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <CartCard v-for="cart in carts" :key="cart.username" :cart="cart" :user="user"/>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4">Tổng cộng</td>
                    <td colspan="2" class="fw-bold">{{ getTotal }} VNĐ</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
<script>
import CartService from "@/services/cart.service";
import CartCard from "@/components/CartCard.vue"
export default{
    data(){
        return {
            carts:[],
            total:0,
            user:"",
        }
    },
    components:{
        CartCard,
    },
    computed:{
        getTotal(){
            this.carts.forEach(cart => {
                let bookPrice = cart.quantity * cart.price;
                this.total += bookPrice;
            });
            return this.total.toLocaleString('vi-VN');
        }
    },
    methods:{
        async getCart(){
            this.user = sessionStorage.getItem("userName") ? sessionStorage.getItem("userName") : sessionStorage.getItem("guest");
            this.carts = await CartService.get(this.user);
        }
    },
    mounted(){
        this.getCart();
    }
}
</script>