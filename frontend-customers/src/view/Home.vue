<template>
    <form class="d-flex mt-2">
        <input type="text" class="form-control" style="width: 50%;">
        <button class="btn btn-sm btn-outline-primary px-3 mx-2"><i class="fa-solid fa-magnifying-glass"></i></button>
    </form>
    <Books :books="this.books"/>
</template>

<script>
import BookService from "@/services/book.service";
import Books from "@/components/Books.vue";
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
        };
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const {_id, tensach, hinh, theloai, sotrang, nxb, gia, soquyen, ngonngu } = book;
                return [_id, tensach, hinh, theloai, sotrang, nxb, gia, soquyen, ngonngu].join("");
            });
        },
        getUserName() {
            this.userName = sessionStorage.getItem('userName');
            return this.userName;
        },
        filteredBooks() {
            if (!this.searchText) {
                return this.books;
            }
            return this.books.filter((_book, index) => {
                return this.bookStrings[index].includes(this.searchText)
            });
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