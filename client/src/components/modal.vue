<template>
  <div v-if="isModalVisible" class="modal-overlay">
    <div class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">ยินดีด้วย !!</h1>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isModalVisible = ref(true); // แสดง modal โดยเริ่มต้น

const closeModal = () => {
  isModalVisible.value = false; // ปิด modal
};
</script>

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5); /* สีพื้นหลังแบบโปร่งใส */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center; /* จัดกลางแนวนอน */
  align-items: center; /* จัดกลางแนวตั้ง */
}

.modal {
  width: 50%; /* ความกว้างของ modal */
  background-color: white; /* สีพื้นหลังของ modal */
  border-radius: 8px; /* ขอบมน */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* เงา */
}

.modal-header, .modal-footer {
  padding: 10px 20px; /* การเว้นระยะ */
}

.modal-title {
  margin: 0; /* ไม่มีระยะ */
  font-size: 1.5em; /* ขนาดฟอนต์สำหรับชื่อ modal */
}

.modal-body {
  font-size: 1em; /* ขนาดฟอนต์สำหรับเนื้อหา modal */
  padding: 10px 20px; /* การเว้นระยะ */
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5em; /* ขนาดฟอนต์สำหรับปุ่มปิด */
  cursor: pointer;
}

.btn-secondary {
  font-size: 1em; /* ขนาดฟอนต์สำหรับปุ่มปิด */
}
</style>
