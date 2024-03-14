<script>
export default {
   props: {
       book: { type: Object, required: true },
   },
};
</script>

<template>
   <div>
        <div class="p-1">
           <strong>Hinh</strong>
           {{ book.hinh }}
       </div>
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
</template>