<script setup>
import { inject } from 'vue'
const sections = inject('sections')

function toTitle(kebab) {
  return kebab.split('-').map(word=>
   word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}
</script>

<template>
  <ul>
    <li v-for="sectionHeader in Object.keys(sections)">
      {{ toTitle(sectionHeader) }}
      <ul>
        <li v-for="section in sections[sectionHeader]">
          <RouterLink :to="`/${section}`">
            {{ toTitle(section)}}
          </RouterLink>
        </li>
      </ul>
    </li>
  </ul>
</template>