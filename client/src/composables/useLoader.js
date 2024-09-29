import { reactive } from "vue";

export const loader = reactive({
  isLoading: false,
});

export const show = () => {
  loader.isLoading = true;
  document.body.style.overflowY = "hidden";
};
export const hide = () => {
  loader.isLoading = false;
  document.body.style.removeProperty("overflow-y");
};

export const isLoading = () => {
  return loader.isLoading;
};
