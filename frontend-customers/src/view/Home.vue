<template>
    <Books :books="this.sach"/>
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
        return
        {
            sach: [];
        };
    },
    computed: {
        bookToStrings() {
            return this.sach.map((book) => {
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
                this.sach = await BookService.getAll();
            } 
            catch (error) 
            {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveBooks();
    },
};
</script>
<style scoped>
.page {
   text-align: left;
   max-width: 750px;
}
</style>