<template>
    <Books :books="this.books"/>
</template>

<script>
import BookService from "@/services/book.service";
import Books from "@/components/Books.vue";
import {useUser} from "@/stores/main.vue";
export default
{
    setup(){
        const mainUser = useUser();
        return {mainUser};
    },
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
    },
};
</script>
<style scoped>
.page {
   text-align: left;
   max-width: 750px;
}
</style>