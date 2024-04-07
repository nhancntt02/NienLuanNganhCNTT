<template>
    <nav class="row navbar navbar-expand navbar-dark bg-primary py-3">
        <div class="col">
            <router-link :to="{ name: 'homeBook' }" class="navbar-brand border rounded border-dark p-2">
                H&N SHOP
            </router-link>
        </div>
        <div class="col-6"></div>
        <ul v-if="!getUserName"  class="col navbar-nav d-flex justify-content-end">
                <li class="nav-item mx-1"><router-link :to="{name:'loginPage'}" class="nav-link">Đăng nhập</router-link></li>
                <li class="nav-item"><router-link :to="{name:'registerPage'}" class="nav-link">Đăng ký</router-link></li>
            <li class="nav-item"><a class="nav-link" href="">Giỏ hàng</a></li>
        </ul>
        <ul v-else class="col navbar-nav d-flex justify-content-end">
            <li class="nav-item"><router-link :to="{name:'customerinfo'}" class="nav-link">Tài khoản</router-link></li>
            <li class="nav-item"><a class="nav-link" href="">Giỏ hàng</a></li>
            <li class="nav-item"><a class="nav-link" href="#" @click="logout">Đăng xuất</a></li>
        </ul>
    </nav>
</template>

<script>
    export default{
        data() {
            return{
                userName: '',
            }
        },
        computed: {
            getUserName() {
                this.userName = sessionStorage.getItem('userName');
                return this.userName;
            }
        },
        methods:{
            logout() {
            if (confirm('Bạn có chắc muốn đăng xuất không?')) {
                sessionStorage.removeItem("userName");
                this.userName = "";
                window.location.reload();
            }
        }
        },
    };
</script>