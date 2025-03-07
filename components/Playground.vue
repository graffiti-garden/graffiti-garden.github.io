<script setup lang="ts">
import Renderer from "./PlaygroundRenderer.vue";
import { ref, watch, onErrorCaptured, onBeforeMount } from "vue";
import Prism from "prismjs";
import { PrismEditor } from "vue-prism-editor";
import { useGraffiti, useGraffitiSession } from "@graffiti-garden/wrapper-vue";

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

const graffiti = useGraffiti();
const graffitiSession = useGraffitiSession();

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
        props.language,
    );
}

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
        <fieldset v-if="render" :class="['demo-render', state ? '' : 'alone']">
            <legend>Demo</legend>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <Renderer v-else :code="code" :data="data" />
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
                        {{ state === "session" ? "Hide" : "Show" }} Login
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
                <div class="graffiti-session-manager">
                    <template v-if="graffitiSession">
                        <div>
                            Logged in as:
                            <input
                                type="text"
                                v-model="graffitiSession.actor"
                                readonly
                            />
                        </div>
                        <button @click="graffiti.logout(graffitiSession)">
                            Log out
                        </button>
                    </template>
                    <template v-else>
                        <button @click="graffiti.login()">Log in</button>
                    </template>
                </div>
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

    input[type="checkbox"] {
        margin-right: 0.5rem;
    }

    input:disabled {
        background: grey;
    }

    input:disabled:hover {
        cursor: not-allowed;
        background: grey;
    }

    form {
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    ul {
        text-align: left;
    }
}

.graffiti-session-manager {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
        width: 100%;
    }
}
</style>
