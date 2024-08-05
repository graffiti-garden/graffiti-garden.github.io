<script setup lang="ts">
import {
    computed,
    h,
    compile,
    watch,
    onErrorCaptured,
    type ComponentPublicInstance,
    type Component,
    ref,
} from "vue";

const props = defineProps(["code", "data"]);

onErrorCaptured((...args) => {
    console.log("error captured in renderer");
    console.log(args);
    return false;
});

const errorMessageRef = ref<string | null>(null);
watch(
    () => props.code,
    () => {
        errorMessageRef.value = null;
    },
);

const hyperscript = computed(() => {
    let errorMessage: string | null = null;
    const renderBare = compile(props.code, {
        onError(error) {
            errorMessage = error.message;
        },
    });

    const render = new Proxy(renderBare, {
        apply(target, thisArg, args) {
            let result: any;
            try {
                result = target.apply(thisArg, args);
            } catch (e) {
                errorMessage = e.toString();
            }

            if (errorMessage) {
                const innerHTML = "Compilation Error: " + errorMessage;
                errorMessage = null;
                return h("div", { class: "error", innerHTML });
            } else {
                return result;
            }
        },
    });

    try {
        return h({
            render,
            data: () => props.data,
            errorCaptured(e) {
                errorMessageRef.value = e.toString();
                return false;
            },
        });
    } catch (e) {
        return h("div", {
            class: "error",
            innerHTML: e.toString(),
        });
    }
});
</script>

<template>
    <div class="error" v-if="errorMessageRef">{{ errorMessageRef }}</div>
    <hyperscript v-else />
</template>
