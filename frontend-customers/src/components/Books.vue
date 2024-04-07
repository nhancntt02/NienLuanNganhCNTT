<template>
    <div>
        <div v-for="(row, index) in rows" :key="index" class="row">
            <div v-for="(book, j) in row" :key="book._id"
                class="book-container col-xl col-md-6 col-12 border rounded p-2 m-2 bg-light text-center">
                <router-link :to="{name:'bookinfo',params:{bookId:book._id}}"><img class="img-fluid" style="height: 200px; width: 180px; margin: 0 auto;" :src="book.hinh" alt="book_image"></router-link>
                <div class="book-info">
                    <div>
                        {{ book.tensach }}
                    </div>
                    <div class="text-danger">
                        {{ book.gia }}đ
                    </div>
                </div>
            </div>
            <div v-for="k in 4 - row.length" :key="k" class="col-xl col-md-6 col-12 p-2 m-2"></div>
        </div>
    </div>
</template>
<style>
.book-container {
    display: flex;
    flex-direction: column;
}

.book-info {
    margin-top: auto;
}
</style>
<script>
export default {
    props: {
        books: { type: Array, default: () => [] }
    },
    computed: {
        rows() {
            const rowCount = Math.ceil(this.books.length / 4);
            const rows = [];
            for (let i = 0; i < rowCount; i++) {
                const start = i * 4;
                const end = Math.min(start + 4, this.books.length);
                rows.push(this.books.slice(start, end));
            }
            return rows;
        }
    },
    methods: {
        goToBookDetail(id) {
            this.$router.push({name: "bookinfo",params:{bookId: id }});
        }
    }
};
</script>
