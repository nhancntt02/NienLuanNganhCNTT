<template>
    <li v-for="item in books" :key="item.bookId" class="list-group-item ms-5">
        <div class="d-flex justify-content-between">
            <router-link :to="{ name: 'bookinfo', params: { bookId: item.bookId } }"><img class="img-fluid"
                    style="height: 50px; width: 50px; margin: 0 auto;" :src="item.hinh"
                    :alt="item.tensach"></router-link>
            <p>{{ item.tensach }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.quantity }}</p>
            <p>{{ item.price * item.quantity }}</p>
            <button class="btn btn-sm btn-outline-success" style="height: 30px;" @click="showDanhGia(item.bookId)">Đánh giá</button>
        </div>
        <div v-if="danhgia == true && idDanhgia == item.bookId">
            <div class="d-flex justify-content-end">
                <input type="radio" class="form-check-input" name="star" value="1" id="1" v-model="star"
                    @input="getValueStar">
                <label for="star" class="form-check-lable">1<i class="fa-regular fa-star"></i></label>
                <input type="radio" class="form-check-input" name="star" value="2" id="2" v-model="star"
                    @input="getValueStar">
                <label for="star" class="form-check-lable">2<i class="fa-regular fa-star"></i></label>
                <input type="radio" class="form-check-input" name="star" value="3" id="3" v-model="star"
                    @input="getValueStar">
                <label for="star" class="form-check-lable">3<i class="fa-regular fa-star"></i></label>
                <input type="radio" class="form-check-input" name="star" value="4" id="4" v-model="star"
                    @input="getValueStar">
                <label for="star" class="form-check-lable">4<i class="fa-regular fa-star"></i></label>
                <input type="radio" class="form-check-input" name="star" value="5" id="5" v-model="star"
                    @input="getValueStar">
                <label for="star" class="form-check-lable">5<i class="fa-regular fa-star"></i></label>
            </div>
            <div class="d-flex justify-content-end">
                <textarea name="cmt"  v-model="cmt" class="form-control w-50" placeholder="Thêm nhận xét của bạn"></textarea>
            </div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-outline-dark mt-1">Lưu</button>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    props: {
        books: { type: Array, required: true },
        index: { type: Number, required: true }
    },
    data() {
        return {
            star: 0,
            cmt: "",
            danhgia:false,
            idDanhgia:"",
        }
    },
    methods:{
        showDanhGia(id){
            this.danhgia = true;
            this.idDanhgia = id;
        }
    }
}
</script>