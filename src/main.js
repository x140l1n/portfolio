import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/base.css";
import "bootstrap";
import { Moment } from "vue-moment";

const app = createApp(App);

app.use(Moment);

app.mount("#app");
