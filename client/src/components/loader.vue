<template>
  <div v-if="isLoading" id="modal-loader" data-backdrop="static">
    <div class="modal">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-body text-center">
            <div class="loader-spinner mb-2"></div>
            <div>Loading...</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";

const $loader = inject("$loader");
const isLoading = computed(() => $loader.loader.isLoading);
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  opacity: 90%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.modal-dialog {
  color: rgb(255, 255, 255);
  z-index: 2;
  position: relative;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
}

.loader-spinner {
  width: 30px;
  height: 30px;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  border-top-color: rgba(255, 255, 255, 0.067);
  display: inline-block;
  animation: loaderspinner 0.7s linear infinite;
}

@keyframes loaderspinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
