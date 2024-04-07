<template>
    <div style="width: 70%;margin: auto;">
        <table class="table table-hover text-center p-2">
            <thead>
                <tr>
                    <th scope="col" colspan="2" class="text-center">Thông tin của bạn</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Tên đăng nhập:</th>
                    <td>{{ user._id }}</td>
                </tr>
                <tr>
                    <th scope="row">Họ và tên:</th>
                    <td>{{ user.hoten }}</td>
                </tr>
                <tr>
                    <th scope="row">Địa chỉ:</th>
                    <td>{{ user.diachi }}</td>
                </tr>
                <tr>
                    <th scope="row">Số điện thoại:</th>
                    <td>{{ user.sdt }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import CustomerService from "@/services/customer.service";
export default {
    data() {
        return {
            user: [],
        }
    },
    methods: {
        async getUserData() {
            try {
                this.user = await CustomerService.get(sessionStorage.getItem("userName"));
                console.log(this.user);
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.getUserData();
    }
}
</script>