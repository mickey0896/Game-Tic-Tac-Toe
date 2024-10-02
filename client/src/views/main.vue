<template>
  <div class="main">
    <div>
      <div class="container-card">
        <div class="card-profile">
          <img
            :src="profile.imgURL"
            :class="
              currentPlayer === 'X'
                ? 'active-img-profile'
                : 'inactive-img-profile'
            "
            alt=""
          />
          <b>Player</b>
        </div>
        <div class="card-profile">
          <img
            src="../assets/images/default-bot.png"
            :class="
              currentPlayer === 'O'
                ? 'active-img-profile'
                : 'inactive-img-profile'
            "
            alt=""
          />
          <b>Bot</b>
        </div>
      </div>
      <div class="board">
        <div
          v-for="(cell, index) in board"
          :key="index"
          class="xo"
          :class="{ winner: winningCombination.includes(index) }"
          @click="makeMove(index)"
        >
          <b>{{ cell }}</b>
        </div>
      </div>
      <br />
      <button @click="resetGame">เริ่มเกมใหม่</button>
    </div>
  </div>
  <Sidebar :list="rankingList" />
  <Modal
    ref="modalRef"
    :title="modal.title"
    :subtitle="modal.subtitle"
    @modalOk="handleModalOk"
  />
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import Sidebar from "../components/sidebar.vue";
import Modal from "../components/modal.vue";

const $api = inject("$api");
const $loader = inject("$loader");
const board = ref(Array(9).fill(null));
const currentPlayer = ref("X");
const winner = ref(null);
const disablePlayer = ref(false);
const winningCombination = ref([]);
const modalRef = ref(null);
const consecutiveWins = ref(0);
const rankingList = ref([]);
const modal = reactive({
  title: "",
  subtitle: "",
});
const profile = reactive({
  email: sessionStorage.getItem("email"),
  imgURL: sessionStorage.getItem("imgURL"),
});

const makeMove = (index) => {
  if (!board.value[index] && !winner.value && !disablePlayer.value) {
    board.value[index] = currentPlayer.value;
    if (checkWinner("X")) {
      winner.value = "X";
      disablePlayer.value = true;
      if (consecutiveWins.value >= 2) {
        consecutiveWins.value = 0;
        cellEndGameAPI(profile.email, "ConsecutiveWin");
      } else {
        consecutiveWins.value += 1;
        cellEndGameAPI(profile.email, "Win");
      }
      modal.title = "ยินดีด้วยคุณชนะ !!";
      modal.subtitle = `${
        consecutiveWins.value !== 0
          ? `ขณะนี้คุณสามารถเอาชนะบอทได้ ${consecutiveWins.value} ครั้ง <br/>หากคุณสามารถชนะต่อเนื่องได้ 3 ครั้งติดต่อกัน <br/> คุณจะได้รับคะแนนโบนัสเพิ่มอีก 1 คะแนน <br/>
      ถ้าคุณแพ้หรือเสมอ จำนวนครั้งที่ชนะติดต่อกันจะถูกนับใหม่<br/> คลิ๊กปุ่น "OK" เพื่อทำการเล่นต่อ`
          : `ขณะนี้คุณสามารถเอาชนะบอทได้ 3 ครั้งติดต่อกัน <br/> คุณจะได้รับโบนัสเพิ่มอีก 1 คะแนน`
      }`;
      return;
    } else if (checkDraw()) {
      winner.value = "เสมอ";
      modal.title = "เสียใจด้วยคุณเสมอ !!";
      modal.subtitle = `ไม่เป็นไร! คุณยังมีโอกาสลุ้นในเกมต่อไป ลุยกันใหม่ในรอบหน้า!<br/> เนื่องจากคุณเสมอ คะแนนสะสมของคุณจะถูกนับใหม่<br/> คลิ๊กปุ่น "OK" เพื่อทำการเล่นต่อ`;
      consecutiveWins.value = 0;
      currentPlayer.value = null;
      disablePlayer.value = true;
      return;
    }
    disablePlayer.value = true;
    currentPlayer.value = "O";
    setTimeout(() => {
      botMove();
    }, 3000);
  }
};

const botMove = () => {
  const emptyCells = board.value
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);
  if (emptyCells.length === 0) return;
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board.value[randomIndex] = "O";
  if (checkWinner("O")) {
    winner.value = "O";
    disablePlayer.value = true;
    modal.title = "เสียใจด้วยคุณแพ้";
    modal.subtitle = `ไม่เป็นไร! คุณยังมีโอกาสลุ้นในเกมต่อไป ลุยกันใหม่ในรอบหน้า!<br/> เนื่องจากคุณแพ้ คะแนนสะสมของคุณจะถูกนับใหม่<br/> คลิ๊กปุ่น "OK" เพื่อทำการเล่นต่อ `;
    consecutiveWins.value = 0;
    cellEndGameAPI(profile.email, "Lose");
    return;
  } else if (checkDraw()) {
    winner.value = "เสมอ";
    disablePlayer.value = true;
    return;
  }
  disablePlayer.value = false;
  currentPlayer.value = "X";
};

const checkWinner = (player) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const winningCombinationFound = winningCombinations.find((combination) =>
    combination.every((index) => board.value[index] === player)
  );
  if (winningCombinationFound) {
    winningCombination.value = winningCombinationFound;
    return true;
  }
  return false;
};

const checkDraw = () => {
  return board.value.every((cell) => cell !== null) && !winner.value;
};

const resetGame = () => {
  board.value = Array(9).fill(null);
  currentPlayer.value = "X";
  winner.value = null;
  disablePlayer.value = false;
  winningCombination.value = [];
  $loader.hide();
  getUsersList();
};

const openModal = (title, subtitle) => {
  modal.title = title;
  modal.subtitle = subtitle;
  if (modalRef.value) {
    modalRef.value.openModal();
  }
};
const cellEndGameAPI = async (email, endType) => {
  $loader.show();
  await $api
    .EndGame({
      email: email,
      end: endType,
    })
    .then((res) => {
      setTimeout(() => {
        openModal(modal.title, modal.subtitle);
        $loader.hide();
      }, 1000);
    })
    .catch((err) => {
      $loader.hide();
      openModal("เกิดข้อผิดพลาด !!", "เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
    });
};

const getUsersList = async () => {
  $loader.show();
  await $api
    .GetUser()
    .then((res) => {
      $loader.hide();
      rankingList.value = res.data.users;
    })
    .catch((err) => {
      $loader.hide();
      openModal("เกิดข้อผิดพลาด !!", "เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
    });
};
const handleModalOk = () => {
  if (modal.title !== "เกิดข้อผิดพลาด !!") {
    $loader.show();
    setTimeout(() => {
      resetGame();
    }, 1000);
  }
};
onMounted(() => {
  getUsersList();
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, auto);
}
.xo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f952;
  height: 150px;
  width: 150px;
  border-radius: 0px;
  font-size: 90px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe,
    0 0 82px #bc13fe, 0 0 92px #bc13fe, 0 0 102px #bc13fe, 0 0 151px #bc13fe;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
  @media screen and (max-width: 520px) {
    font-size: 55px;
    height: 90px;
    width: 90px;
  }
}
.winner {
  text-shadow: 0 0 30px red, 0 0 20px red, 0 0 21px red, 0 0 42px #bc13fe,
    0 0 82px #bc13fe, 0 0 92px #bc13fe, 0 0 102px #bc13fe, 0 0 151px #bc13fe;
  color: #fff;
}
.winner-message {
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
}
.container-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}
.card-profile {
  display: flex;
  background-color: #fff;
  max-width: 200px;
  width: 100%;
  height: 80px;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
}
.inactive-img-profile {
  border-radius: 50%;
  width: 76px;
  height: 76px;
  border: 6px solid #ffffff;
  margin-top: -50px;
  margin-bottom: 8px;
  background-color: #ffffff;
  object-fit: cover;
}
.active-img-profile {
  border-radius: 50%;
  width: 76px;
  height: 76px;
  border: 6px solid #00ff0d;
  margin-top: -50px;
  margin-bottom: 8px;
  background-color: #ffffff;
  object-fit: cover;
}
</style>
