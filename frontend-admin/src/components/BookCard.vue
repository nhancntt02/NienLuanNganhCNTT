<script>
export default {
   props: {
       book: { type: Object, required: true },
   },
};
</script>

<template>
   <div class="row">
       <div class="col-4">
            <img :src="book.hinh" style="width: 100%;" />
        </div>
        <div class="col-8">
            <div class="p-1">
                <strong>Tên:</strong>
                {{ book.tensach }}
            </div>
            <div class="p-1">
                <strong>The Loai:</strong>
                {{ book.theloai }}
            </div>
            <div class="p-1">
                <strong>So trang:</strong>
                {{ book.sotrang }}
            </div>
            <div class="p-1">
                <strong>Nha Xuat Ban:</strong>
                {{ book.nxb }}
            </div>
            <div class="p-1">
                <strong>Gia:</strong>
                {{ book.gia }}
            </div>
        </div>
       
   </div>
</template>