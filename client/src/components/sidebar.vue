<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]" @click="toggleSidebar">
    <p >
      <img
        style="width: 65px"
        src="../assets/images/ranking/ranking.png"
        alt=""
      />
    </p>
    <div v-if="!isCollapsed" class="sidebar-content">
      <span style="font-size: 20px; font-weight: bold; margin: 0 0 20px 0"
        >อันดับของฉัน</span
      >
      <div
        v-for="user in userRank"
        :key="user.name"
        style="
          position: relative;
          margin: 20px;
          padding: 20px 10px 0px 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <div
          style="
            position: absolute;
            top: -40px;
            width: 100%;
            left: 0;
            display: flex;
            justify-content: center;
          "
        >
          <div
            style="
              position: relative;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: flex-end;
            "
          >
            <img
              style="width: 36px; height: auto"
              src="../assets/images/ranking/star-self-ranking.png"
              alt=""
            />
            <img
              style="width: 58px; height: auto"
              src="../assets/images/ranking/star-self-ranking.png"
              alt=""
            />
            <img
              style="width: 36px; height: auto"
              src="../assets/images/ranking/star-self-ranking.png"
              alt=""
            />
            <div
              style="
                position: absolute;
                bottom: 0px;
                width: 58px;
                height: 95%;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <span style="font-size: 24px; font-weight: bold">{{
                user.rank
              }}</span>
            </div>
          </div>
        </div>
        <b style="margin: 10px 0">{{ user.name }}</b>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-weight: bold;
          "
        >
          <span>คะแนนสะสม {{ user.score }}</span>
        </div>
      </div>

      <div
        class="rank-item"
        v-for="(rank, rankIndex) in sortedUsers"
        :key="rankIndex"
      >
        <div class="rank-icon">
          <img
            class="star-icon"
            src="../assets/images/ranking/star-ranking.png"
            alt=""
          />
          <span class="rank-number">{{ rankIndex + 1 }}</span>
        </div>
        <div class="rank-details">
          <span class="ellipsis-text">{{ rank.name }}</span>
          <span>{{ rank.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
});
const userName = ref(sessionStorage.getItem("name"));
const isCollapsed = ref(false);

const sortedUsers = computed(() => {
  return [...props.list].sort((a, b) => b.score - a.score);
});

const userRank = computed(() => {
  const user = props.list.find((user) => user.name === userName.value);
  if (user) {
    const rankIndex = sortedUsers.value.findIndex((r) => r.name === user.name);
    return [{ ...user, rank: rankIndex + 1 }];
  }
  return [];
});

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.sidebar {
  color: #fff;
  background: #2c3c54;
  height: 100vh;
  width: 250px;
  transition: width 0.3s;
  position: fixed;
  right: 0;
  top: 0;
  border-radius: 25px 0 0 0;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-content {
  height: 80%;
  padding: 10px;
  padding-bottom: 50px;
  overflow: scroll;
  display: flex;
  scrollbar-color: none;
  scrollbar-width: none;
  flex-direction: column;
  align-items: center;
}

.rank-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
}

.rank-icon {
  width: 44px;
  height: auto;
  padding: 10px 10px 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.star-icon {
  width: 28px;
  height: auto;
}

.rank-number {
  position: absolute;
  color: #d88d00;
  font-weight: bold;
}

.rank-details {
  width: calc(100% - 44px - 20px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: 4px 10px;
  background-color: #ededed;
  border-radius: 12px;
  color: #af0856;
}

.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 120px;
  text-align: start;
}
</style>
