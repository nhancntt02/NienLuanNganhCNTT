<template>
    <nav class="row navbar navbar-expand navbar-dark bg-primary py-3">
        <div class="col">
            <router-link :to="{ name: 'homeBook' }" class="navbar-brand border rounded border-dark p-2">
                H&N SHOP
            </router-link>
        </div>
        <div class="col-6"></div>
        <ul class="col nav d-flex justify-content-end">
            <li class="nav-item"><a class="nav-link text-light" href="">Đăng nhập</a></li>
            <li class="nav-item"><a class="nav-link text-light" href="">Đăng ký</a></li>
            <li class="nav-item"><a class="nav-link text-light" href="">Giỏ hàng</a></li>
        </ul>
    </nav>
</template>