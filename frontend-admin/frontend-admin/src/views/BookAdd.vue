<template>
    <div class="page">
        <h4>Thêm sách </h4>
        <BookForm
            :book="book"
            :type="type"
            @submit:book = "addBook"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import BookService from "@/services/book.service.js";
    import BookForm from "@/components/BookForm.vue";

    export default {
        components: {
           BookForm,
        },
        data() {
            return{
                book: {     _id: "",
                            tensach: null ,
                            hinh: null,
                            theloai: null,
                            sotrang: null,
                            nxb: null,
                            gia: null,
                            soquyen: null,
                            ngonngu: null
                        },
                message: "",
                type: "add"
            };
            
        },
        methods: {
            async addBook(data) {
                try {
                    await BookService.create(data);
                    this.message = "Thêm sách thành công";
                } catch (error) {
                    console.log(error);
                }
            }
        },
    }
</script>