import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";
import { GraffitiPouchDB } from "@graffiti-garden/implementation-pouchdb";
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
  demos: ["context"],
  system: ["system"],
  "API Reference": ["vanilla-js", "vue-plugin"],
};

const Router = createRouter({
  history: createWebHistory(),
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

// Horrible, I know
// this is just for testing
const one = "Sandbank8803";
const two = "hb#&6CQBx!ua%q";
const three = "tracker.graffiti.garden";
const four = "graffiti";

createApp(App)
  .use(Router)
  .use(GraffitiPlugin, {
    useGraffiti: () =>
      new GraffitiPouchDB({
        pouchDBOptions: {
          name: `https://${encodeURIComponent(one)}:${encodeURIComponent(two)}@${three}/${four}`,
        },
      }),
  })
  .component("Playground", Playground)
  .provide("sections", sections)
  .mount("#app");
