<template>
    <div v-if="!success">
        <h2 class="text-center mt-3">Xác nhận đơn hàng</h2>
        <hr>
        <table class="table w-50 text-center mx-auto">
            <thead>
                <tr>
                    <th colspan="2">Thông tin khách hàng: </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Họ và tên:</td>
                    <td>{{ user.hoten }}</td>
                </tr>
                <tr>
                    <td>Địa chỉ:</td>
                    <td>{{ user.diachi }}</td>
                </tr>
                <tr>
                    <td>Số điện thoại:</td>
                    <td>{{ user.sdt }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table w-75 mx-auto">
            <thead>
                <tr>
                    <th colspan="6" class="text-center">Thông tin sản phẩm: </th>
                </tr>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thành tiền</th>
                </tr>
            </thead>
            <tbody>
                <OrderConfirmCard v-if="bookId == 0" v-for="(item, index) in carts" :key="item.bookId" :order="item"
                    :index="index" />
                <OrderConfirmCard v-else :order="book" :index="0" :quantity="quantity" />
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4"></td>
                    <td><b>Tổng giá trị đơn hàng:</b></td>
                    <td>{{ total }} VNĐ</td>
                </tr>
            </tfoot>
        </table>
        <div class="mx-auto w-75 bg-light p-2">
            <p>Phương thức thanh toán</p>
            <select v-model="paymentMethod" id="paymentMethod" class="form-select">
                <option value="0" selected>Thanh toán khi nhận hàng</option>
                <option value="1">Thẻ ngân hàng nội địa</option>
                <option value="2">Thẻ Visa/Mastercard</option>
            </select>
            <hr />
            <div v-if="paymentMethod == 1" class="d-flex justify-content-around">
                <li class="list-group-item border border-2 rounded p-1">
                    <a href="#" @click.prevent="bankPay('CTG')"><img src="../assets/vietinbank.jpg" width="70"
                            height="70"></a>
                </li>
                <li class="list-group-item border border-2 rounded p-1">
                    <a href="#" @click.prevent="bankPay('VARB')"><img src="../assets/Agribank.jpg" width="70"
                            height="70"></a>
                </li>
                <li class="list-group-item border border-2 rounded p-1">
                    <a href="#" @click.prevent="bankPay('BIDV')"><img src="../assets/BIDV.png" width="70"
                            height="70"></a>
                </li>
                <li class="list-group-item border border-2 rounded p-1">
                    <a href="#" @click.prevent="bankPay('VCB')"><img src="../assets/VCB.jpg" width="70" height="70"></a>
                </li>
            </div>

        </div>
        <div class="w-50 bg-white px-5 py-4 position-absolute top-50 start-50 translate-middle
        z-3 border rounded border-3 border-dark shadow-lg" v-if="showCardModal">
            <button class="position-absolute top-0 end-0 btn" @click="closeCardModal"><i
                    class="fa-solid fa-x"></i></button>
            <div class="text-center fs-4 mb-4">
                Nhập thông tin thẻ
            </div>
            <div>
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" id="bank" v-model="bank" placeholder="Ngân hàng">
                    <label for="bank">Ngân hàng</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="number" inputmode="numeric" v-model="bankCard.cardNum" class="form-control"
                        id="cardNumber" placeholder="Số thẻ">
                    <label for="cardNumber">Số thẻ</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" v-model="bankCard.cardName" id="cardName"
                        placeholder="Tên chủ thẻ">
                    <label for="cardName">Tên chủ thẻ</label>
                </div>
                <div class="input-group">
                    <label for="cardName" class="form-label mt-auto">Ngày hiệu lực:</label>
                    <div class="d-flex w-25 ms-2">
                        <input type="number" inputmode="numeric" v-model="bankCard.validM" class="form-control"
                            placeholder="MM">
                        <div class="fs-4 mx-1">/</div>
                        <input type="number" inputmode="numeric" v-model="bankCard.validY" class="form-control"
                            placeholder="YY">
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary" @click="addOrder">Thanh toán</button>
            </div>
        </div>
        <div class="w-50 bg-white px-5 py-4 position-absolute top-50 start-50 translate-middle
        z-3 border rounded border-3 border-dark shadow-lg" v-if="paymentMethod == 2">
            <button class="position-absolute top-0 end-0 btn" @click="closeCardModal"><i
                    class="fa-solid fa-x"></i></button>
            <div class="text-center fs-4 mb-4">
                Nhập thông tin thẻ
            </div>
            <div>
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" id="bank" v-model="bank" placeholder="Ngân hàng">
                    <label for="bank">Ngân hàng</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="number" inputmode="numeric" v-model="visaCard.cardNum" class="form-control"
                        id="cardNumber" placeholder="Số thẻ">
                    <label for="cardNumber">Số thẻ</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" v-model="visaCard.cardName" id="cardName"
                        placeholder="Tên chủ thẻ">
                    <label for="cardName">Tên chủ thẻ</label>
                </div>
                <div class="row">
                    <div class="col-8 my-auto">
                        <div class="input-group">
                            <label for="cardName" class="form-label my-auto me-3">Ngày hết hạn:</label>
                            <div class="d-flex w-50">
                                <div class="form-floating">
                                    <input type="number" inputmode="numeric" v-model="visaCard.expiryM"
                                        class="form-control" id="MM" placeholder="MM">
                                    <label for="MM">MM</label>
                                </div>
                                <div class="fs-4 mx-1">/</div>
                                <div class="form-floating">
                                    <input type="number" inputmode="numeric" v-model="visaCard.expiryM"
                                        class="form-control" id="YY" placeholder="YY">
                                    <label for="YY">YY</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-floating">
                            <input type="number" inputmode="numeric" v-model="visaCard.cvv" class="form-control"
                                id="cvv" placeholder="CVV">
                            <label for="cvv">CVV</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary" @click="addOrder">Thanh toán</button>
            </div>
        </div>
        <!-- <button class="btn btn-primary mx-auto mb-3" @click="addOrder">Đặt Hàng</button> -->
    </div>
    <div v-else class="text-center m-auto border border-2 border-primary rounded p-3">
        <h3>Đã đặt hàng thành công!</h3>
        <router-link :to="{ name: 'order' }"><button class="btn btn-sm btn-primary mt-2">Đơn hàng</button></router-link>
    </div>
</template>
<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
<script>
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import CustomerService from "@/services/customer.service";
import OrderConfirmCard from "@/components/OrderConfirmCard.vue";
import BookService from "@/services/book.service";
import bookService from "@/services/book.service";
export default {
    props: {
        bookId: { type: String, default: '' }
    },
    data() {
        return {
            carts: [],
            user: {},
            total: 0,
            success: false,
            book: {},
            quantity: 0,
            paymentMethod: 0,
            showCardModal: 0,
            bank: "",
            bankCard: {
                username: sessionStorage.getItem("userName"),
                cardType: 2,
                bank: "",
                cardNum: null,
                cardName: "",
                validM: null,
                validY: null,
            },
            visaCard: {
                username: sessionStorage.getItem("userName"),
                cardType: 1,
                cardNum: null,
                cardName: "",
                expiryM: null,
                expiryY: null,
                cvv: null,
            }
        }
    },
    components:
    {
        OrderConfirmCard,
    },
    methods:
    {
        async getinfo() {
            this.user = await CustomerService.get(sessionStorage.getItem("userName"));
            this.carts = await CartService.get(this.user._id);
            this.carts.forEach(item => {
                this.total += item.price * item.quantity;
            });
        },
        async getBook() {
            try {
                this.user = await CustomerService.get(sessionStorage.getItem("userName"));
                this.book = await BookService.get(this.bookId);
                this.quantity = sessionStorage.getItem("quantity");
                sessionStorage.removeItem("quantity");
                if (!this.quantity) {
                    this.quantity = 1;
                }
                this.total = this.book.gia * this.quantity;
            } catch (error) {
                console.log(error);
            }
        },
        async addOrder() {
            var order;
            if (this.bookId == 0) {
                order = {
                    username: this.user._id,
                    bookId: this.carts.map((item) => ({
                        bookId: item.bookId,
                        price: item.price,
                        quantity: item.quantity,
                        hinh: item.hinh,
                        tensach: item.tensach,
                    })),
                    total: this.total,
                    date: new Date().toISOString().substr(0, 10),
                    rating: 0,
                };
                order.bookId.forEach((item) => {
                    this.quantityManager(item);
                })
            }
            else {
                order = {
                    username: this.user._id,
                    bookId: [{
                        bookId: this.book._id,
                        price: this.book.gia,
                        quantity: this.quantity,
                        hinh: this.book.hinh,
                        tensach: this.book.tensach,
                    }],
                    total: this.total,
                    date: new Date().toISOString().substr(0, 10),
                    rating: 0,
                };
                this.quantityManager(order.bookId[0]);
            }
            try {
                await OrderService.create(order);
                this.success = true;
                await CartService.deleteAll(this.user._id);
            } catch (error) {
                alert("Thêm thất bại!");
            }
        },
        async quantityManager(book) {
            console.log(book);
            var orderBook = await bookService.get(book.bookId);
            console.log(orderBook);
            if (orderBook) {
                orderBook.soquyen -= book.quantity;
                if (orderBook.soquyen < 0) {
                    alert('Sách bạn muốn mua đã bán hết!');
                    this.$router.push({ name: "homeBook" });
                }
                try {
                    await bookService.update(orderBook._id, orderBook);
                }
                catch (error) {
                    alert("Có lỗi xảy ra trong quá trình tạo đơn hàng");
                }
            }
        },
        bankPay(bank) {
            this.showCardModal = 1;
            switch (bank) {
                case "CTG":
                    this.bank = "Vietinbank";
                    break;
                case "VARB":
                    this.bank = "Agribank";
                    break;
                case "BIDV":
                    this.bank = "BIDV";
                    break;
                case "VCB":
                    this.bank = "Vietcombank";
                    break;
                default:
                    break;
            }
            console.log(bank);
        },
        closeCardModal() {
            this.showCardModal = 0;
            this.resetBankCard();
            if (this.paymentMethod == 2) {
                this.paymentMethod = 0;
                this.resetVisaCard();
            }
        },
        resetBankCard() {
            this.bankCard.bank = "";
            this.bankCard.cardNum = null;
            this.bankCard.cardName = "";
            this.bankCard.validM = null;
            this.bankCard.validY = null;
        },
        resetVisaCard() {
            this.visaCard.cardNum = null;
            this.visaCard.cardName = "";
            this.visaCard.expiryM = null;
            this.visaCard.expiryY = null;
            this.visaCard.cvv = null;
        },
        async checkCardInfo(){
            
        }
    },
    created() {
        if (this.bookId != 0) {
            this.getBook();
        }
        else {
            this.getinfo();
        }
    }
}
</script>