import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import vue3GoogleLogin from "vue3-google-login";
import "./style.css";
import * as loader from "./composables/useLoader.js";
import Antd from "ant-design-vue";
import * as api from "./api/index.js";
// import "ant-design-vue/dist/antd.css";

const app = createApp(App);

let gauthClientid =
  "89291868260-4oeunrn2epgr64rhdb92trk6vh3of6oj.apps.googleusercontent.com";

app.provide("$api", api);
app.provide("$loader", loader);
app.use(vue3GoogleLogin, {
  clientId: gauthClientid,
  ux_mode: "redirect",
  redirect_uri: "http://localhost:5173",
});
app.use(Antd);
app.use(router);
app.mount("#app");
