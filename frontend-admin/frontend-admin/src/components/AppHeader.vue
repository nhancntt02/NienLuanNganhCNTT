<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý sách</a>
    <div class="mr-auto navbar-nav">
    <li class="nav-item">
    <router-link :to="{ name: 'homeBook' }" class="nav-link">
    Danh sách Book
    <i class="fas fa-book"></i>
    </router-link>
    </li>
    </div>
    </nav>
    </template>