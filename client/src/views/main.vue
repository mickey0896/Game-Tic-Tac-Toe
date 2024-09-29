<template>
  <div class="main">
    <div class="board">
      <div
        v-for="(cell, index) in board"
        :key="index"
        class="btn"
        :class="{ winner: winningCombination.includes(index) }"
        @click="makeMove(index)"
      >
        {{ cell }}
      </div>
    </div>
    <div class="winner-message">Winner: {{ winner ? winner : "" }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const board = ref(Array(9).fill(null));
const currentPlayer = ref("X");
const winner = ref(null);
const disablePlayer = ref(false);
const winningCombination = ref([]);

const makeMove = (index) => {
  if (!board.value[index] && !winner.value && !disablePlayer.value) {
    board.value[index] = currentPlayer.value;
    if (checkWinner("X")) {
      winner.value = "X";
    } else if (checkDraw()) {
      winner.value = "เสมอ";
    } else {
      disablePlayer.value = true;
      setTimeout(() => {
        currentPlayer.value = "O";
        botMove();
      }, 3000);
    }
  }
};

const botMove = () => {
  const emptyCells = board.value
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board.value[randomIndex] = "O";
  if (checkWinner("O")) {
    winner.value = "O";
  } else if (checkDraw()) {
    winner.value = "เสมอ";
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
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  height: 150px;
  width: 150px;
  border-radius: 0px;
  border: 1px solid #000;
  font-size: 90px;
}
.winner {
  color: red;
}
.winner-message {
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
}
</style>
