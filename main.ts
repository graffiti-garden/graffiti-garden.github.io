import { createApp } from "vue";
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import GraffitiPlugin from "@graffiti-garden/client-vue";
import Playground from "./components/Playground.vue";
import App from "./components/App.vue";

import "./style.css";
import "prismjs/themes/prism-tomorrow.min.css";
import "vue-prism-editor/dist/prismeditor.min.css";

function lazyDoc(name: string, path: string | null = null) {
  // Convert name from
  // kebab-case to PascalCase
  const namePascal = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return {
    path: path ? path : `/${name}`,
    component: () => import(`./components/${namePascal}.vue`),
  };
}

const sections = {
  "high-level": ["motivation", "overview"],
  reference: ["vanilla-js", "vue-plugin"],
};

const Router = createRouter({
  history: ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? createWebHashHistory()
    : createWebHistory(),
  routes: [
    lazyDoc("home", "/"),
    ...Object.values(sections)
      .flat()
      .map((s) => lazyDoc(s)),
  ],
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0, behavior: "smooth" };
  },
});

createApp(App)
  .use(Router)
  .use(GraffitiPlugin)
  .component("Playground", Playground)
  .provide("sections", sections)
  .mount("#app");
