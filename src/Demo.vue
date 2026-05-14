<script setup lang="ts">
import Renderer from "./PlaygroundRenderer.vue";
import { ref, watch, onErrorCaptured, onBeforeMount } from "vue";
import { useGraffiti, useGraffitiSession } from "@graffiti-garden/wrapper-vue";

const graffiti = useGraffiti();
const graffitiSession = useGraffitiSession();

const code = ref("");
const activeTab = ref<"render" | "code">("render");

onBeforeMount(async () => {
    const response = await import("./demo.html?raw");
    code.value = response.default.trim();
});

const errorMessage = ref<string | undefined>();
onErrorCaptured((e) => {
    errorMessage.value = "Render error: " + e.message;
    return false;
});
// Reset the error whenever the code changes
watch(code, () => (errorMessage.value = undefined));
</script>

<template>
    <div class="demo">
        <div class="tabs" role="tablist" aria-label="Demo panels">
            <button
                id="render-tab"
                class="tab"
                role="tab"
                type="button"
                :aria-selected="activeTab === 'render'"
                aria-controls="render-panel"
                @click="activeTab = 'render'"
            >
                Render
            </button>
            <button
                id="code-tab"
                class="tab"
                role="tab"
                type="button"
                :aria-selected="activeTab === 'code'"
                aria-controls="code-panel"
                @click="activeTab = 'code'"
            >
                Code
            </button>
        </div>

        <section
            id="render-panel"
            class="panel render"
            role="tabpanel"
            aria-labelledby="render-tab"
            :class="{ 'mobile-hidden': activeTab !== 'render' }"
        >
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <Renderer v-else :code="code" />
        </section>

        <section
            id="code-panel"
            class="panel code"
            role="tabpanel"
            aria-labelledby="code-tab"
            :class="{ 'mobile-hidden': activeTab !== 'code' }"
        >
            <textarea v-model="code" />
        </section>
    </div>
</template>

<style scoped>
.demo {
    display: grid;
    gap: 0.75rem;
}

.tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
}

.tab {
    border: 1px solid rgb(125 125 125 / 80%);
    border-radius: 0.4rem;
    padding: 0.45rem 0.7rem;
    background: rgb(0 0 0 / 10%);
    color: inherit;
    font: inherit;
    cursor: pointer;
}

.tab[aria-selected="true"] {
    background: #444;
    color: #fff;
    border-color: #444;
}

.panel {
    border: 1px solid rgb(125 125 125 / 80%);
    border-radius: 0.5rem;
    padding: 0.75rem;
    background: rgb(255 255 255 / 65%);
}

.code textarea {
    width: 100%;
    min-height: 20rem;
    font: inherit;
    color: inherit;
    background: transparent;
    border: none;
    resize: vertical;
}

.code textarea:focus {
    outline: none;
}

@media (max-width: 899px) {
    .mobile-hidden {
        display: none;
    }
}

@media (min-width: 900px) {
    .demo {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: start;
    }

    .tabs {
        grid-column: 1 / -1;
    }

    .mobile-hidden {
        display: block;
    }
}
</style>
