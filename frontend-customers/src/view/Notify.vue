<template>
    <h1 class="my-3 text-center">Danh sách thông báo</h1>
    <ul class="list-group">
        <li 
            v-for="(item, index) in notify" :key="item._id"
            class="list-group-item"
        >
            <p class="d-flex justify-content-between">
                <button 
                    class="btn btn-primary px-5"  
                    :data-bs-toggle="'collapse-' + index" 
                    :data-bs-target="'#collapse-' + index" 
                    aria-expanded="false" 
                    :aria-controls="'collapse-' + index"
                    @click="changeCollapse(index)"
                >
                    {{ item.title }}
                </button>
                <button @click="deleteNotify(item._id)" class="btn btn-danger">
                    Xóa <i class="fas fa-trash"></i> 
                </button>
            </p>
            <div class="collapse" :id="'collapse-' + index">
                <div class="card card-body">
                    {{ item.content }}
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
    import NotifyService from "@/services/notify.service";
    export default {
        data() {
            return {
                notify: [],
                username: "",
            }
        },
        methods: {
            getUserName() {
                this.username = sessionStorage.getItem("userName");
                console.log(this.username);
            },
            async getNotifyUser(user) {
                try {
                    this.notify = await NotifyService.getNotify(user);
                    console.log(this.notify);
                } catch (error) {
                    console.log(error);
                }
            },
            changeCollapse(index) {
                const elm = document.getElementById('collapse-' + index);
                
                if (!elm.classList.contains("show")){
                    elm.classList.add("show");
                } else {
                    elm.classList.remove("show");
                }
            },
            async deleteNotify(id){
                if(confirm("Bạn có chắc muốn xóa thông báo này?")){
                    try {
                        console.log(await NotifyService.deleteOne(id));
                        location.reload();
                    } catch (error) {   
                        console.log(error);
                    }
                }
                
            }

        },
        mounted() {
            this.getUserName();
            this.getNotifyUser(this.username);
        }
    }
</script>