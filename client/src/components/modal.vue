<template>
  <a-modal v-model:open="open" :title="title" @ok="handleOk" centered class="">
    <span v-html="subtitle"></span>
  </a-modal>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
});

const open = ref(false);
const emit = defineEmits(["modalOk"]);

const openModal = () => {
  open.value = true;
};

const handleOk = () => {
  open.value = false;
  emit("modalOk");
};

defineExpose({ openModal });
</script>

<style scoped></style>
