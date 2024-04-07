<template>
    <form class="d-flex mt-2 justify-content-center">
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
            userName: "",
            searchText:'',
            searchBook:[],
        };
    },
    computed: {
        getUserName() {
            this.userName = sessionStorage.getItem('userName');
            return this.userName;
        },
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
        refreshList() {
            this.retrieveBooks();
        },
        async getSearchBook(){
            if(this.searchText)
            {
                this.searchBook = await bookService.getByName(this.searchText);
            }
        },
    },
    mounted() {
        this.refreshList();
        if (localStorage.getItem('reloaded')) {
            localStorage.removeItem('reloaded');
        } else {
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
    },
}
</script>