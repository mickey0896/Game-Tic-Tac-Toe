<template>
  <div class="login">
    <div class="container-login">
      <div class="reginter">
        <div style="font-size: 40px">Sign in</div>
        <div style="font-size: 12px">Login with Google</div>
        <GoogleLogin :callback="callback" />
      </div>
      <div class="profile">
        <div v-if="user">
          <p v-if="user">ชื่อ: {{ user.name }}</p>
          <p v-if="user">อีเมล: {{ user.email }}</p>
          <img v-if="user.picture" :src="user.picture" alt="User Picture" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { GoogleLogin } from "vue3-google-login";
import { useRouter } from "vue-router";
import jwtDecode from "jwt-decode";

const $loader = inject("$loader");
const router = useRouter();
const user = ref(null);

const callback = (response) => {
  $loader.show();
  console.log(response, "callback response");

  if (response && response.credential) {
    const decodedToken = jwtDecode(response.credential);
    console.log(decodedToken, "decodedToken");
    user.value = {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture || "../assets/images/default-picture.jpg",
    };
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("imgURL", user.picture);
    setTimeout(() => {
      router.push("/");
      $loader.hide();
    }, 1000);
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-login {
  background-color: white;
  display: grid;
  grid-template-columns: 60% 40%;
  width: 70%;
  height: 50vh;
  justify-items: center;
  border-radius: 10px;
}
.reginter {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.profile {
  width: 100%;
  background-color: #fc4454;
  border-radius: 0 10px 10px 0;
}
</style>
