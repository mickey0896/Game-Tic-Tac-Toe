<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <p @click="toggleSidebar">อันดับ</p>
    <div v-if="!isCollapsed" class="sidebar-content">
      <ul>
        <li>รายการ 1</li>
        <li>รายการ 2</li>
        <li>รายการ 3</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.sidebar {
  background-color: rgba(255, 255, 255, 0.692); /* สีขาวโปร่งแสง */
  border-left: 1px solid #ccc;
  height: 100vh;
  width: 250px;
  transition: width 0.3s;
  position: fixed;
  right: 0;
  top: 0;
  
}

.sidebar.collapsed {
  width: 60px; /* ขนาดเมื่อพับ */
}

.sidebar-button {
  width: 100%; /* ทำให้ปุ่มกว้างเต็มที่ */
  padding: 10px; /* ระยะห่างภายในปุ่ม */
  border: none; /* ไม่มีกรอบ */
  background-color: #007bff; /* สีพื้นหลังปุ่ม */
  color: white; /* สีข้อความ */
  cursor: pointer; /* เปลี่ยนเคอร์เซอร์เมื่อ hover */
  transition: background-color 0.3s; /* เอฟเฟกต์การเปลี่ยนสี */
}

.sidebar-button:hover {
  background-color: #0056b3; /* สีพื้นหลังเมื่อ hover */
}

.sidebar-content {
  padding: 10px;
}
</style>
