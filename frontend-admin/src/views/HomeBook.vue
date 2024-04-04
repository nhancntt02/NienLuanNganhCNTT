<template>
    <div class="page row">
        <div class="col-md-8">
            <SearchBook v-model="searchText"/>
        </div>
        <div class="mt-3 col-md-5">
            <h4>
                Danh Sach Book
                <router-link to="/" >
                    <i class="fas fa-book"></i>
                </router-link>
            </h4>
            <BookList
                v-if="filteredBooksCount > 0"
                :books="filteredBooks"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có sách nào.</p>
            
        
        <!-- ----------------------------------------------------------------- -->
            <div class="mt-3 row justify-content-around agign-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button 
                    class="btn btn-sm btn-success"
                    @click="goToAddBook"
                >
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button 
                    class="btn btn-sm btn-danger"
                    @click="removeAllBooks"
                >
                    <i class="fas fa-trash"></i>  Xóa tất cả
                </button>
            </div>
        </div>
        <!-- ----------------------------------------------------------------- -->
        <div class="mt-3 col-md-7">
            <div v-if="activeBook != null">
                <h4>
                    Thông tin chi tiết sách
                    <i class="fas fa-book"></i>
                </h4>
                <BookCard :book="activeBook"/>
                <router-link
                    :to="{
                        name: 'book-edit',
                        params: { id: activeBook._id }
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span
                    >
                </router-link>
            </div>
        </div>
    </div>
 </template>
 <script>

 import BookList from "@/components/BookList.vue";
 import BookCard from "@/components/BookCard.vue";
 import BookService from "@/services/book.service";
 import SearchBook from "@/components/InputSearch.vue";
 export default {
    components: {
        SearchBook,
        BookList,
        BookCard,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        bookStrings() {
            return this.books.map((book) => {
                const {tensach} = book;
                return [tensach].join();
            });
        },

        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredBooks() { 
            if(!this.searchText){
                return this.books;
            }
            return this.books.filter((_book, index) => {
                return this.bookStrings[index].includes(this.searchText)
            });

            
        },

        activeBook() {
            if (this.activeIndex < 0) {
                return null;
            }
            else {
                return this.filteredBooks[this.activeIndex];
            }
            
        },

        filteredBooksCount() {
            return this.filteredBooks.length;
            
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async removeAllBooks() {
            if(confirm("Bạn muốn xóa tất cả Sach?")) {
                try {
                    await BookService.deleteAll();
                    this.refreshList;
                } catch (error) {
                    console.log(error);
                }
            }
        },

        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },

        goToAddBook() {
            this.$router.push({ name: "book-add" });
        },
    },
    mounted() {
        this.refreshList();
    },
 };
 </script>

 <style scoped>
 .page {
    text-align: left;
    max-width: 1000px;
 }
 </style>