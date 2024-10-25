<script setup lang="ts">
import { inject } from "vue";
const sections = inject<Record<string, string[]>>("sections");

function toTitle(kebab: string) {
    return kebab
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
</script>

<template>
    <ul v-if="sections">
        <li v-for="sectionHeader in Object.keys(sections)">
            {{ toTitle(sectionHeader) }}
            <ul>
                <li v-for="section in sections[sectionHeader]">
                    <RouterLink :to="`/${section}`">
                        {{ toTitle(section) }}
                    </RouterLink>
                </li>
            </ul>
        </li>
    </ul>
</template>
