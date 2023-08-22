<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import TOC from './TOC.vue'

// Have a variable for when the
// navigation menu is open
const navOpen = ref(false)
const route = useRoute()
watch(route, ()=> navOpen.value=false)
</script>

<template>
  <header>
    <label class="hamburger">
      <input v-model="navOpen" type="checkbox">
      <div></div>
    </label>
    <h1>
      <RouterLink to="/">
        Graffiti
      </RouterLink>
    </h1>
  </header>
  <div>
    <nav :class="navOpen?'open':''">
      <h1 v-if="!navOpen">
        <RouterLink to="/">
          Graffiti
        </RouterLink>
      </h1>
      <TOC />
      <ul>
        <li>
          <a target="_blank" class="logo" href="https://github.com/graffiti-garden">
            <img src="/media/github.png"/>
            Github
          </a>
        </li>
      </ul>
    </nav>
    <RouterView v-slot="{ Component }">
      <transition name="slide-right" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>