<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import Prism from "prismjs";

const props = defineProps<{
    path: string;
}>();

const html = ref<string | undefined>();

const router = useRouter();
// @ts-ignore
window.router = router;

watch(
    () => props.path,
    async () => {
        const { default: base } = await import(
            `../paper-html/${props.path}.html?raw`
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(base, "text/html");

        // Add a "References" heading before the references section
        const heading = doc.createElement("h2");
        heading.innerText = "References";
        doc
            .getElementById("refs")
            ?.insertAdjacentElement("beforebegin", heading);

        // Fix inter-document links
        doc.querySelectorAll("a").forEach((a) => {
            const href = a.getAttribute("href");
            if (
                href &&
                href.startsWith("#") &&
                !href.startsWith(`#${props.path}`) &&
                a.getAttribute("data-reference-type") === "ref"
            ) {
                // Get the part of the path between the hash and colon
                const path = href.match(/#([^:]+)/)?.[1];
                a.setAttribute("href", `${path}${href}`);

                // Convert it to a Vue Router link
                a.setAttribute(
                    "onclick",
                    `event.preventDefault(); router.push('${path}${href}')`,
                );

                a.innerText = `[${href.match(/:([^#]+)/)?.[1] ?? path}]`;
            }
        });

        // Highlight code blocks
        doc.querySelectorAll("pre code").forEach((block) => {
            const language = Array.from(block.classList).filter(
                (c) => c !== "sourceCode",
            )[0];
            if (language && Prism.languages[language]) {
                // Remove the HTML tags that pandoc inserted
                // so that Prism can highlight anew.
                // Preserve whitespace and newlines.
                const text = Array.from(block.children)
                    .map((child) => child.textContent)
                    .join("\n");

                block.innerHTML = Prism.highlight(
                    text,
                    Prism.languages[language],
                    language,
                );
            }
        });

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
