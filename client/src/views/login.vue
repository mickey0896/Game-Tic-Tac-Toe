<template>
  <div class="login">
    <div class="container-login">
      <div class="reginter">
        <div v-if="!profile.name" class="sign-in-title">Sign in</div>
        <div v-if="!profile.name" class="login-with-google">
          Login with Google
        </div>
        <GoogleLogin v-if="!profile.name" :callback="callback" />
        <a-result
          v-else
          status="success"
          title="Successful Login with Google"
          sub-title="You have successfully logged in with Google"
        >
        </a-result>
      </div>
      <div class="profile">
        <div v-if="profile.name" class="card-profile">
          <img
            v-if="profile.imgURL"
            :src="profile.imgURL"
            alt="User Picture"
            class="active-img-profile"
          />
          <div class="card-content">
            <b class="welcome-text">Welcome, <br />{{ profile.name }}!</b>
            <span class="welcome-message"
              >ยินดีต้อนรับเข้าสู่ เกม XO (Tic Tac Toe)</span
            >
            <p class="game-rules">
              <b>กติกาเกมง่ายมาก !</b><br />
              คุณต้องเล่น Tic Tac Toe และเอาชนะบอทของเราให้ได้
              <br />
              เมื่อจบเกม : <br />
              &nbsp; - หากคุณชนะ คุณจะได้รับ 1 คะแนน<br />
              &nbsp; - หากคุณแพ้ คุณจะเสีย 1 คะแนน<br />
              &nbsp; - หากคุณเสมอ คุณจะไม่เสียคะแนน<br />
              &nbsp; - ชนะติดต่อกัน 3 ครั้ง จะได้รับ โบนัสพิเศษ 1 คะแนน<br />
              คะแนนที่สะสมจะถูกใช้เพื่อจัดอันดับผู้เล่น<br />
              เพื่อหาผู้ที่เป็น สุดยอดเจ้าแห่ง Tic Tac Toe!<br />
            </p>
          </div>
        </div>
        <div v-else>
          <img src="../assets/images/logo.png" class="logo" />
        </div>
        <button v-if="profile.name" style="margin-top: 10px" @click="toGame">
          เริ่มเกม
        </button>
      </div>
    </div>
    <Modal
      ref="modalRef"
      :title="modal.title"
      :subtitle="modal.subtitle"
      @modalOk="handleModalOk"
    />
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import { GoogleLogin } from "vue3-google-login";
import { useRouter } from "vue-router";
import Modal from "../components/modal.vue";
import jwtDecode from "jwt-decode";

const $api = inject("$api");
const $loader = inject("$loader");
const router = useRouter();
const user = ref(null);
const modalRef = ref(null);
const modal = reactive({
  title: "",
  subtitle: "",
});
const profile = reactive({
  name: "",
  email: "",
  imgURL: "",
});

const callback = (response) => {
  $loader.show();
  if (response && response.credential) {
    const decodedToken = jwtDecode(response.credential);
    user.value = {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture
        ? decodedToken.picture
        : "https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png",
    };
    login();
  }
};

const login = async () => {
  await $api
    .Login({
      name: user.value.name,
      email: user.value.email,
      imgURL: user.value.picture,
    })
    .then((res) => {
      if (res.status == 200) {
        getUsers(res.data.user.email);
      }
    })
    .catch((err) => {
      $loader.hide();
      openModal("เกิดข้อผิดพลาด !!", "เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
    });
};

const getUsers = async (email) => {
  await $api
    .GetUser({ email: email })
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data.user, "res.data.user");

        const user = res.data.user;
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("imgURL", user.imgURL);
        profile.email = sessionStorage.getItem("email");
        profile.name = sessionStorage.getItem("name");
        profile.imgURL = sessionStorage.getItem("imgURL");
        $loader.hide();
      }
    })
    .catch((err) => {
      $loader.hide();
      openModal("เกิดข้อผิดพลาด !!", "เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
    });
};

const toGame = () => {
  openModal(
    "คุณพร้อมที่จะเริ่มเกม Tic-Tac-Toe ไหม?",
    `หากคุณต้องการเริ่มเกม คลิ๊กที่ปุ่ม "OK" เราจะพาคุณเข้าสู่เกม Tic-Tac-Toe`
  );
};

const openModal = (title, subtitle) => {
  modal.title = title;
  modal.subtitle = subtitle;

  if (modalRef.value) {
    modalRef.value.openModal();
  }
};

const handleModalOk = () => {
  if (modal.title === "คุณพร้อมที่จะเริ่มเกม Tic-Tac-Toe ไหม?") {
    $loader.show();
    setTimeout(() => {
      $loader.hide();
      router.push("/");
    }, 1000);
  }
};

onMounted(() => {
  profile.email = sessionStorage.getItem("email");
  profile.name = sessionStorage.getItem("name");
  profile.imgURL = sessionStorage.getItem("imgURL");
  if (profile.email) {
    getUsers(profile.email);
  }
});
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
  height: 60vh;
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
  overflow: hidden;
}

.profile {
  width: 100%;
  background-color: #2c3c54;
  border-radius: 0 10px 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-direction: column;
  padding: 10px;
}

.card-profile {
  display: flex;
  background-color: #fff;
  width: 80%;
  height: 70%;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.card-content {
  display: flex;
  flex-direction: column;
  width: 90%;
  overflow: scroll;
  scrollbar-color: none;
  scrollbar-width: none;
  text-overflow: ellipsis;
}

.active-img-profile {
  border-radius: 50%;
  width: 76px;
  height: 76px;
  border: 6px solid #fc547c;
  margin-top: -50px;
  margin-bottom: 8px;
  background-color: #ffffff;
  object-fit: cover;
}

.sign-in-title {
  font-size: 40px;
}

.login-with-google {
  font-size: 12px;
}

.welcome-text {
  font-size: 21px;
  color: #fc547c;
}

.game-rules {
  text-align: left;
  font-size: 10px;
  padding: 0 30px;
}

.logo {
  width: 80%;
}
</style>
