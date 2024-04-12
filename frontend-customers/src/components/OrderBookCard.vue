<template>
    <li v-for="item in books" :key="item.bookId" class="list-group-item ms-5 d-flex justify-content-between">
        <router-link :to="{ name: 'bookinfo', params: { bookId: item.bookId } }"><img class="img-fluid"
                style="height: 50px; width: 50px; margin: 0 auto;" :src="item.hinh" :alt="item.tensach"></router-link>
        <p>{{ item.tensach }}</p>
        <p>{{ item.price }}</p>
        <p>{{ item.quantity }}</p>
        <p>{{ item.price * item.quantity }}</p>
    </li>
</template>
<script>
export default {
    props: {
        books: { type: Array, required: true },
        index: { type: Number, required: true }
    },
}
</script>