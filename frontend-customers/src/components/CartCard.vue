<template>
    <tr>
        <td>
            <img class="img-fluid p-2" :src="book.hinh" alt="" style="height: 100px; width: 100px; margin: 0 auto;">
        </td>
        <td>
            {{ book.tensach }}
        </td>
        <td>
            {{ book.gia }}
        </td>
        <td v-if="!change">
            {{ cart.quantity }}
        </td>
        <td v-else>
            <input type="number" class="form-control" inputmode="numeric" v-model="cartItem.quantity"  style="width: 60px;" min="1">
        </td>
        <td>
            {{ cart.quantity * cart.price}}
        </td>
        <td>
            <div v-if="!change">
                <button class="btn btn-sm btn-outline-danger me-2" @click="removeFromCart(cart.bookId)">Xóa</button>
                <button  class="btn btn-sm btn-outline-primary" @click="changeCart">Sửa</button>
            </div>
            <div v-else>
                <button  class="btn btn-sm btn-outline-primary me-2" @click="editCard(cart)">Lưu</button>
                <button  class="btn btn-sm btn-outline-danger" @click="cancelChange">Bỏ</button>
            </div>
        </td>
    </tr>
</template>
<script>
import BookService from "@/services/book.service";
import CartService from "@/services/cart.service";
export default {
    props:{
        cart:{ type: Object, required: true,},
        user:{type: String,required:true,}
    },
    data(){
        return{
            book : [],
            change:false,
            cartItem:{
                username:"",
                id:"",
                price:0,
                quantity:1,
            }
        }
    },
    methods:{
        async getBook(){
            try{
                this.book = await BookService.get(this.cart.bookId);
            }
            catch(error){
                console.log(error);
            }
        },
        changeCart()
        {
            this.change = true;
            this.cartItem.quantity = this.cart.quantity;
        },
        cancelChange(){
            if(confirm("Bạn có chắc muốn hủy bỏ lần sửa này?"))
            {
                this.change = false;
            }
        },
        async editCard(cart){
            try{
                this.cartItem.username = this.user,
                this.cartItem.id= cart.bookId,
                this.cartItem.price = cart.price,
                this.cartItem.quantity -= cart.quantity;
                const result = await CartService.update(this.user,this.cartItem);
                location.reload();
            }catch(error){
                alert("Cập nhật thất bại");
            }
            this.change = false;
        },
        async removeFromCart(id){
            if(confirm("Bạn có chắc muốn xóa sách này?"))
            {
                try
                {
                    const result = await CartService.delete(this.user,id);
                    console.log(result);
                    location.reload();
                }
                catch(error){
                    alert('Xóa không thành công');
                }
            }
        }
    },
    mounted(){
        this.getBook();
    }
}
</script>