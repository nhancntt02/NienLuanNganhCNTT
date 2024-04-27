<template>
    <form class="d-flex my-1 justify-content-center">
        <input type="text" class="form-control" style="width: 50%;" v-model="searchText" placeholder="Nhập vào tên sách cần tìm kiếm">
    </form>
    <Books :books="filteredBooks"/>
</template>

<script>
import BookService from "@/services/book.service";
import Books from "@/components/Books.vue";
import bookService from "@/services/book.service";
export default
{
    components:
    {
        Books,
    },
    data() 
    {
        return {
            books: [],
            searchText:'',
            searchBook:[],
        };
    },
    computed: {
        filteredBooks() {
            if (!this.searchText) {
                return this.books;
            }
            this.getSearchBook();
            return this.searchBook;
        },
    },
    methods:
    {
        async retrieveBooks() 
        {
            try 
            {
                this.books = await BookService.getAll();
            } 
            catch (error) 
            {
                console.log(error);
            }
        },
        async getSearchBook(){
            if(this.searchText)
            {
                this.searchBook = await bookService.getByName(this.searchText);
            }
        },
    },
    mounted() {
        
        if (localStorage.getItem('reloaded')) {
        } else {
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
        this.retrieveBooks();
    },
}
</script>