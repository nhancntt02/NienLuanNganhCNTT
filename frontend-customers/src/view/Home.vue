<template>
    <Books :books="thisBooks"/>
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
            books: []
        };
    },
    computed: {
        bookToStrings() {
            return this.books.map((book) => {
                const {_id, tensach, hinh, theloai, sotrang, nxb, gia, soquyen, ngonngu } = book;
                return [_id, tensach, hinh, theloai, sotrang, nxb, gia, soquyen, ngonngu].join("");
            });
        },

        thisBooks() {
            return this.books;
        }

    },
    methods:
    {
        async retrieveBooks() 
        {
            try 
            {
                this.books = await BookService.getAll();
                console.log(this.books);
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
    },
};
</script>
<style scoped>
.page {
   text-align: left;
   max-width: 750px;
}
</style>