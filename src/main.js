import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index.js"
import { initAuth } from "@/auth/auth.js"

const app = createApp(App)

app.use(router)

initAuth().finally(() => {
  app.mount("#app")
})
