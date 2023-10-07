import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

axios.defaults.baseURL="http://proy-laravel-vue.test/api/"
axios.defaults.headers.common ={"Authorization" : `Bearer ${localStorage.getItem("token") || ""}`}

const app = createApp(App)

app.use(router)

app.mount('#app')
