<template>
    <nav class="row navbar navbar-expand navbar-dark bg-primary py-3">
        <div class="col">
            <router-link :to="{ name: 'homeBook' }" class="navbar-brand border rounded border-dark p-2">
                H&N SHOP
            </router-link>
        </div>
        <div class="col-6"></div>
        <ul v-if="!mainUser.userName"  class="col navbar-nav d-flex justify-content-end">
                <li class="nav-item mx-1"><router-link :to="{name:'loginPage'}" class="nav-link">Đăng nhập</router-link></li>
                <li class="nav-item"><router-link :to="{name:'registerPage'}" class="nav-link">Đăng ký</router-link></li>
            <li class="nav-item"><a class="nav-link" href="">Giỏ hàng</a></li>
        </ul>
        <ul v-else class="col navbar-nav d-flex justify-content-end">
            <li class="nav-item"><a class="nav-link" @click="logout">Đăng xuất</a></li>
            <li class="nav-item"><a class="nav-link" href="">Giỏ hàng</a></li>
        </ul>
    </nav>
</template>

<script>
    import {useUser} from  "@/stores/main.vue";
    export default{
        setup(){
            const mainUser = useUser();
            return {mainUser};
        },
        methods:{
            logout()
            {
                if(confirm('Bạn có chắc muốn đăng xuất không?'))
                {
                    this.mainUser.logOut();
                }
            }
        },
    };
</script>