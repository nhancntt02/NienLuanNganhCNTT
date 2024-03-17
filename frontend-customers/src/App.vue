<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter
  },
};
</script>

<template>
  <div id="" class="container">
    <AppHeader />
    <div>
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
#app{
  background-color: #FAF9F6;
}
</style>