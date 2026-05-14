<script setup lang="ts">
import Renderer from "./PlaygroundRenderer.vue";
import { ref, watch, onErrorCaptured, onBeforeMount } from "vue";
import { useGraffiti, useGraffitiSession } from "@graffiti-garden/wrapper-vue";

const graffiti = useGraffiti();
const graffitiSession = useGraffitiSession();

const code = ref("");

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
        <div class="render">
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <Renderer v-else :code="code" />
        </div>
        <div class="code">
            <textarea v-model="code" />
        </div>
    </div>
</template>
