<script setup lang="ts">
import { ref, watch, nextTick } from "vue";

const props = defineProps<{
    path: string;
}>();

const html = ref<string | undefined>();

watch(
    () => props.path,
    async () => {
        const { default: base } = await import(
            `../paper-html/${props.path}.html?raw`
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(base, "text/html");

        const heading = doc.createElement("h2");
        heading.innerText = "References";
        doc
            .getElementById("refs")
            ?.insertAdjacentElement("beforebegin", heading);

        html.value = doc.body.innerHTML;

        // Refresh mathjax when content changes
        nextTick().then(async () => {
            if (window.MathJax) {
                // @ts-ignore
                await window.MathJax.typesetPromise();
            }
        });
    },
    {
        immediate: true,
    },
);
</script>

<template>
    <main v-html="html"></main>
</template>

<style>
.references {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
