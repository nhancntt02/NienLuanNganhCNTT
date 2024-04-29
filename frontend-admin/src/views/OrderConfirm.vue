<template>
    <h1>Đơn hàng chờ xác nhận</h1>
    <hr>
    <div>
        <ul class="list-group mb-2">
            <li v-for="item in ordersNotConfirm" :key="item._id" class="list-group-item d-flex justify-content-between">
                <div>
                   Mã đơn hàng: {{ item._id }} - Ngày đặt: {{ item.date }} - Tổng tiền: {{ item.total }} 
                </div>
                
                <button @click="confirmOrder(item._id)" class="btn btn-outline-success ">Xác nhận đơn hàng</button>
            </li>
        </ul>
    </div>
</template>
<script>
import OrderService from "@/services/order.service";
export default {
    data() {
       return {
        orders: [],
        ordersNotConfirm: [],
       }
    },
    methods: {
        async getOrders(){
            this.orders = await OrderService.getAll();
            this.filerOrder();
            
        },
        filerOrder() {
            this.ordersNotConfirm =  this.orders.filter(item => item.status == 'Chờ xác nhận');
        },
        async confirmOrder(id) {
            try {
                const order = {
                    _id: id,
                    status: "Đã giao hàng thành công"
                }
                if (confirm("Bạn có muốn xác nhận đơn hàng này không?")) {
                    await OrderService.update(id,order);
                }
            this.refresh();
            } catch (error) {
               console.log(error) 
            }
            
        },
        refresh() {
            this.getOrders();
        }
    },
    created() {
        this.refresh();
    }
}
</script>