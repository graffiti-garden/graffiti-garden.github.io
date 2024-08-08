<script setup lang="ts">
import Renderer from "./PlaygroundRenderer.vue";
import { ref, watch, onErrorCaptured, onBeforeMount } from "vue";
import Prism from "prismjs";
import { PrismEditor } from "vue-prism-editor";
import { GraffitiSessionManager } from "@graffiti-garden/client-vue";
import "@graffiti-garden/client-vue/dist/style.css";

const props = defineProps({
    path: String,
    render: {
        type: Boolean,
        default: true,
    },
    data: {
        type: Object,
        default: {},
    },
    hideSource: {
        type: Boolean,
        default: false,
    },
    language: {
        type: String,
        default: "html",
    },
});

const code = ref("");
const state = ref<"source" | "session" | null>(
    props.hideSource ? null : "source",
);

onBeforeMount(async () => {
    const response = await import(
        `../demos/${props.path}.${props.language}?raw`
    );
    code.value = response.default.trim();
});

function highlighter(code: string) {
    return Prism.highlight(
        code,
        props.language == "html" ? Prism.languages.markup : Prism.languages.js,
    );
}

const errorMessage = ref<string | null>(null);
onErrorCaptured((e) => {
    errorMessage.value = e.message;
    return false;
});
watch(code, () => {
    errorMessage.value = null;
});
</script>

<template>
    <div class="demo">
        <fieldset v-if="render" :class="['demo-render', state ? '' : 'alone']">
            <legend>Demo</legend>
            <template v-if="$graffitiSession.isInitializing">
                <div class="loading">Loading...</div>
            </template>
            <template v-else>
                <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
                <Renderer v-else :code="code" :data="data" />
            </template>
            <menu>
                <li>
                    <button
                        @click="state = state === 'source' ? null : 'source'"
                    >
                        {{ state === "source" ? "Hide" : "Show" }} Source Code
                    </button>
                </li>
                <li>
                    <button
                        @click="state = state === 'session' ? null : 'session'"
                    >
                        {{ state === "session" ? "Hide" : "Show" }} Session
                        Manager
                    </button>
                </li>
            </menu>
        </fieldset>
        <Transition name="stretch" :duration="700">
            <fieldset v-if="state === 'source'" class="demo-code">
                <PrismEditor v-model="code" :highlight="highlighter" />
            </fieldset>
        </Transition>
        <Transition name="stretch" :duration="700">
            <fieldset v-if="state === 'session'">
                <GraffitiSessionManager clientName="Graffiti Garden" />
            </fieldset>
        </Transition>
    </div>
</template>

<style>
.demo {
    menu {
        position: absolute;
        top: calc(100% - 0.5em - 0.5rem);
        z-index: 2;
        display: flex;
        list-style: none;

        button {
            border: 2px solid white;
            background: var(--halfback);
            font-size: 100%;
        }
    }
}
</style>
