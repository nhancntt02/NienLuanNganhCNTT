<template>
    <h1 class="text-center">Doanh thu</h1>
    <hr/>
    <div class="my-2">
        <form >
            <label class="mr-1" for="day">Nhập ngày:</label>
            <input class="mx-1" type="date" v-model="date" id="day">
        </form>
        <button class="btn btn-outline-info mx-1" @click="totalDate">Doanh thu ngày</button>
        <button class="btn btn-outline-info mx-1" @click="totalMonth">Doanh thu tháng</button>
        <button class="btn btn-outline-info mx-1" @click="totalYear">Doanh thu năm</button>
    </div>
    <div style="height: 300px; overflow: auto;">
        <ul class="list-group">
            <li v-for="(item, index) in datas2" :key="item._id" class="list-group-item list-group-item-action">
                <div class="d-flex justify-content-between">
                    Mã đơn hàng: {{ item._id }} - Ngày đặt: {{ item.date }} - Tổng tiền: {{ item.total }}
                    <i v-if="isOrderDetailVisible(item._id)" class="fa-solid fa-chevron-up mt-1" @click="toggleOrderDetail(item._id)"></i>
                    <i v-else class="fa-solid fa-chevron-down mt-1" @click="toggleOrderDetail(item._id)"></i>
                </div>
                <div v-if="isOrderDetailVisible(item._id)">
                    <hr>
                    <ul class="list-group list-group-flush">
                        <OrderBookCard :books="item.bookId" :index="index" />
                    </ul>
                </div>
            </li>
        </ul>
    </div>
    <div>
        <p class="h4 mt-3">Tổng doanh thu: {{ total }}</p>
    </div>
</template>
<script>
    import OrderService from "@/services/order.service";
    import OrderBookCard from "@/components/OrderBookCard.vue";
    export default {
        components: {
            OrderBookCard,
        },
        data() {
            return {
                datas: [],
                datas2: [],
                total: 0,
                date: "",
                orderDetailsVisibility: {},
            }
        },
        methods: {  
            async fetchData(){
                try {                   
                    this.datas = await OrderService.getAll();
                } catch (error) {
                    console.log(error);
                }             
            },
            getM(data) {
                const d = new Date(data);
                const month = "" + (d.getMonth() + 1);
                return month;
            },
            getY(data) {
                const d = new Date(data);
                const year = d.getFullYear();
                return year;
            },
            totalDate() {
                this.total = 0;
                this.datas2 = [];
                for (let index = 0; index < this.datas.length; index++) {
                    if(this.date === this.datas[index].date){
                        this.total += this.datas[index].total;
                        this.datas2.push(this.datas[index]);
                    }
                }
                this.total = this.changeMoney(this.total);
            },
            totalMonth() {
                this.total = 0;
                this.datas2= [];
                for (let index = 0; index < this.datas.length; index++) {
                    const m = this.getM(this.datas[index].date);
                    const y = this.getY(this.datas[index].date);
                    if((this.getM(this.date) == m) && (this.getY(this.date) == y)){
                        this.total += this.datas[index].total;
                        this.datas2.push(this.datas[index]);
                    }
                }
                this.total = this.changeMoney(this.total);
            },
            totalYear() {
                this.total = 0;
                this.datas2= [];
                for (let index = 0; index < this.datas.length; index++) {
                    const y = this.getY(this.datas[index].date);
                    if((this.getY(this.date) == y)){
                        this.total += this.datas[index].total;
                        this.datas2.push(this.datas[index]);
                    }
                }
                this.total = this.changeMoney(this.total);
            },
            toggleOrderDetail(orderId) {
                this.orderDetailsVisibility[orderId] = !this.orderDetailsVisibility[orderId];
            },
            isOrderDetailVisible(orderId) {
                return this.orderDetailsVisibility[orderId];
            },
            changeMoney(money) {
                const VND = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });
                return  VND.format(money);
            }
        },
        created() {
            this.fetchData();
        }
    }
</script>