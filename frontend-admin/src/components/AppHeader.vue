<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý sách</a>
    <div class="mr-auto navbar-nav">
    <li class="nav-item d-flex">
    <router-link :to="{ name: 'homeBook' }" class="nav-link">
    Danh sách Book
    <i class="fas fa-book"></i>
    </router-link>
    <router-link :to="{ name: 'notification'}" class="nav-link">
    Thông báo
    <i class="fas fa-bell"></i>
    </router-link>
    </li>
    </div>
    </nav>
    </template>