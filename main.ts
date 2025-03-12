import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";
import { GraffitiRemote } from "@graffiti-garden/implementation-remote";
import Playground from "./components/Playground.vue";
import App from "./components/App.vue";
import Paper from "./components/Paper.vue";
import Home from "./components/Home.vue";

import "./style.css";
import "prismjs/themes/prism-tomorrow.min.css";
import "vue-prism-editor/dist/prismeditor.min.css";

const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/paper/:path(.*)",
      component: Paper,
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve({ el: to.hash, behavior: "smooth" }),
          // wait for the page to render before scrolling
          100,
        );
      });
    } else {
      return { left: 0, top: 0, behavior: "smooth" };
    }
  },
});

createApp(App)
  .use(Router)
  .use(GraffitiPlugin, {
    graffiti: new GraffitiRemote(),
  })
  .component("Playground", Playground)
  .mount("#app");
