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
    <AppHeader />
    <router-view />
    <AppFooter />
</template>
<style>
  #app{
    background-color: #f7eac3;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
</style>