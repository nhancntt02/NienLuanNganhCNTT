
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(book, index) in books" :key="book._id">
            {{ book.tensach }}
        </li>
    </ul>
</template>
<script>
export default
    {
        props:
        {
            books: { type: Array, default: [] }
        },
        methods:
        {
            goToBookDetail(id) {
                this.$router.push({ name: 'book-detail', params: { id: id } });
            }
        }
    }
</script>