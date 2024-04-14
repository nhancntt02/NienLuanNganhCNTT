<template>
    <nav class="row navbar navbar-expand navbar-dark bg-primary py-3">
        <div class="col">
            <router-link :to="{ name: 'homeBook' }" class="navbar-brand border rounded border-dark p-2">
                H&N SHOP
            </router-link>
        </div>
        <div class="col-6"></div>
        <ul v-if="!getUserName" class="col navbar-nav d-flex justify-content-end">
            <li class="nav-item mx-1"><router-link :to="{ name: 'loginPage' }" class="nav-link">Đăng nhập</router-link>
            </li>
            <li class="nav-item"><router-link :to="{ name: 'registerPage' }" class="nav-link">Đăng ký</router-link></li>
            <li class="nav-item">
                <router-link :to="{name: 'cart'}" class="nav-link position-relative" href="">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span v-if="cartCount != 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {{ cartCount }}
                    </span>
                </router-link>
            </li>
        </ul>
        <ul v-else class="col navbar-nav d-flex justify-content-end">
            <li class="nav-item">
                <router-link :to="{ name: 'order' }" class="nav-link">Đơn hàng</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'customerinfo' }" class="nav-link"><i class="fa-solid fa-user" title="Tài khoản"></i></router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'notify' }" class="nav-link position-relative">
                    <i class="fas fa-bell" title="Thông báo"></i>
                    <span v-if="notifyCount != 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {{ notifyCount }}
                    </span>
                </router-link> 
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'cart'}" class="nav-link position-relative" href="">
                    <i class="fa-solid fa-cart-shopping" title="Giỏ hàng"></i>
                    <span v-if="cartCount != 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {{ cartCount }}
                    </span>
                </router-link>
            </li>
            <li class="nav-item"><a class="nav-link" href="#" @click="logout"><i class="fa-solid fa-arrow-right-from-bracket" title="Đăng xuất"></i></a></li>
        </ul>
    </nav>
</template>

<script>
import CartService from "@/services/cart.service";
import CustomerService from "@/services/customer.service";
import NotifyService from "@/services/notify.service";
export default {
    data() {
        return {
            userName: '',
            cartCount: 0,
            notifyCount: 0,
            ipAddr:"",
        }
    },
    computed: {
        getUserName() {
            return this.userName;
        },
    },
    methods: {
        logout() {
            if (confirm('Bạn có chắc muốn đăng xuất không?')) {
                sessionStorage.removeItem("userName");
                this.userName = "";
                localStorage.removeItem('reloaded');
                this.$router.push({ name: "homeBook" });
            }
        },
        async getGuestIp(){
            this.ipAddr = await CustomerService.getIp();
            sessionStorage.setItem("guest",this.ipAddr);
            this.getCartCount();
            this.getNotifyCount();
        },
        async getCartCount(){
            if(this.userName)
            {
                const cart = await CartService.get(this.userName);
                this.cartCount = cart.length;
            }
            else
            {
                const cart = await CartService.get(sessionStorage.getItem("guest"));
                this.cartCount = cart.length;
            }
        },
        async getNotifyCount(){
            if(this.userName)
            {
                const cart = await NotifyService.getNotify(this.userName);
                this.notifyCount = cart.length;
            }
            else
            {
                
                this.notifyCount = 0;
            }
        }


    },
    mounted(){
        this.getGuestIp();
        this.userName = sessionStorage.getItem("userName");
    }
};
</script>