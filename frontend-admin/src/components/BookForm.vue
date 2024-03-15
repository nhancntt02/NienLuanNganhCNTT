
<template>
    <Form
        @submit="submitBook"
        :validation-schema="contactFormSchema"
    >   
    <div class="form-group">
            <label for="id">Mã sách:</label>
            <Field
                name="id"
                type="text"
                class="form-control"
                v-model="bookLocal._id"
            />
            <ErrorMessage name="id" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="name">Tên sách:</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="bookLocal.tensach"
            />
            <ErrorMessage name="name" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="email">Hình:</label>
            <Field
                name="email"
                type="email"
                class="form-control"
                v-model="bookLocal.hinh"
            />
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="address">Thể loại:</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="bookLocal.theloai"
            />
            <ErrorMessage name="address" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="sotrang">Số trang:</label>
            <Field
                name="sotrang"
                type="number"
                class="form-control"
                v-model="bookLocal.sotrang"
            />
            <ErrorMessage name="sotrang" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="nxb">Nhà xuất bản:</label>
            <Field
                name="nxb"
                type="tel"
                class="form-control"
                v-model="bookLocal.nxb"
            />
            <ErrorMessage name="nxb" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="price">Gia:</label>
            <Field
                name="price"
                type="number"
                class="form-control"
                v-model="bookLocal.gia"
            />
            <ErrorMessage name="price" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="sq">Số quyển:</label>
            <Field
                name="sq"
                type="number"
                class="form-control"
                v-model="bookLocal.soquyen"
            />
            <ErrorMessage name="sq" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="nn">Ngôn ngữ:</label>
            <Field
                name="nn"
                type="text"
                class="form-control"
                v-model="bookLocal.ngonngu"
            />
            <ErrorMessage name="nn" class="error-feedback"/>
        </div>

        <div class="form-group">
                <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
                <button 
                    v-if="type == 'edit'"
                    type="button"
                    class="ml-2 btn btn-danger"
                    @click="deleteBook"
                >
                <i class="fas fa-trash"></i> Xóa
                </button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage
        },
        emits: ["submit:book", "delete:book"],
        props: {
            book: { type: Object, required: true },
            type: { type : String, required: true }
        },
        data() {
            const contactFormSchema = yup.object().shape({
                // name: yup
                //     .string()
                //     .required("Tên phải có giá trị.")
                //     .min(2, "Tên phải ít nhất 2 ký tự.")
                //     .max(50, "Tên có nhiều nhất 50 ký tự."),
                // email: yup
                //     .string()
                //     .email("E-mail không đúng.")
                //     .max(50, "E-mail tối đa 50 ký tự."),
                // address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
                // phone: yup
                //     .string()
                //     .matches(
                //         /((09|03|07|08|05)+([0-9]{8})\b)/g,
                //         "Số điện thoại không hợp lệ."
                // )
            });
            return {
                bookLocal: this.book,
                contactFormSchema,
                type: this.type,
            };
        },
        methods: {
            submitBook() {
                this.$emit("submit:book", this.bookLocal);
            },
            deleteBook() {
                this.$emit("delete:book", this.bookLocal.id);
            }
        },
    };
</script>

<style scoped>
    @import "@/assets/form.css";
</style>