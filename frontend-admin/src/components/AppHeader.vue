<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý sách</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item d-flex">
                <router-link :to="{ name: 'homeBook' }" class="nav-link">
                    Danh sách Book
                    <i class="fas fa-book"></i>
                </router-link>
                <router-link :to="{ name: 'notification' }" class="nav-link">
                    Thông báo
                    <i class="fas fa-bell"></i>
                </router-link>
                <router-link :to="{ name: 'revenue' }" class="nav-link">
                    Doanh thu
                    <i class="fas fa-dollar"></i>
                </router-link>
                <router-link :to="{ name: 'orderconfirm' }" class="nav-link">
                    Đơn hàng
                    <i class="fa-solid fa-box"></i>
                </router-link>
                <router-link :to="{ name: 'support' }" class="nav-link">
                    Hỗ trợ
                    <i class="fa-regular fa-envelope"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>