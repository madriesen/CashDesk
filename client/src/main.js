import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

const $axios = axios.create();
store.$axios = $axios;

import "@/assets/css/style.css";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
