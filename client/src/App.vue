<template>
  <router-view> </router-view>
  <Loader />
</template>

<script setup>
import Loader from "./components/loader.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const googleLogin = async () => {
  const chackLogin = sessionStorage.getItem("email");
  if (chackLogin) {
    router.push("/login");
  } else {
    sessionStorage.clear();
    router.push("/login");
  }
};
onMounted(() => {
  googleLogin();
});
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
