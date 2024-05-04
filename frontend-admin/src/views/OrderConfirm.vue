<template>
    <h1>Quản lý đơn hàng</h1>
    <hr>
    <div>
        <div class="mb-3">
            <button @click="filerOrder" class="btn btn-outline-secondary">Đơn hàng chưa xác nhận</button>
            <button @click="complete" class="btn btn-outline-info mx-2">Đơn hàng đã xác nhận</button>
            <button @click="success" class="btn btn-outline-success">Đơn hàng đã thanh toán</button>
        </div>
        <ul class="list-group mb-2">
            <li v-for="item in ordersNotConfirm" :key="item._id" class="list-group-item d-flex justify-content-between">
                <div>
                   Mã đơn hàng: {{ item._id }} - Ngày đặt: {{ item.date }} - Tổng tiền: {{ item.total }} 
                </div>
                
                <button v-if="item.status=='Chờ xác nhận'" @click="confirmOrder(item._id)" class="btn btn-outline-secondary">Xác nhận đơn hàng</button>
                <p v-else-if="item.status=='Đã giao hàng thành công'" class="text-info">{{ item.status }}</p>
                <p v-else class="text-success">{{ item.status }}</p>
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
        complete() {
            this.ordersNotConfirm =  this.orders.filter(item => item.status == 'Đã giao hàng thành công');
        },
        success() {
            this.ordersNotConfirm =  this.orders.filter(item => item.status == 'Đã mua hàng thành công');
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