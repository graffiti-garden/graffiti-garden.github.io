<template>
    <header>
        <h2 class="graffiti">
            <a href="/"> Graffiti </a>
        </h2>

        <details :open="navOpen">
            <summary @click.prevent="navOpen = !navOpen">Menu</summary>

            <nav :class="{ open: navOpen }">
                <ul>
                    <li>
                        <a
                            href="https://dl.acm.org/doi/pdf/10.1145/3746059.3747627?download=true"
                            download
                        >
                            📄 Paper
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://api.graffiti.garden/classes/Graffiti.html"
                        >
                            🛠️ API Docs
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://vue.graffiti.garden/variables/GraffitiPlugin.html"
                        >
                            <img src="/assets/vue-white.svg" alt="Vue logo" />
                            Vue Plugin Docs
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/graffiti-garden">
                            <img
                                src="/assets/github-white.svg"
                                alt="GitHub logo"
                            />
                            Source Code
                        </a>
                    </li>
                </ul>
            </nav>
        </details>
    </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

const navOpen = ref(true);

const mq = window.matchMedia("(min-width: 800px)");
const syncNav = () => {
    navOpen.value = mq.matches;
};
onMounted(() => {
    syncNav();
    mq.addEventListener("change", syncNav);
});
onUnmounted(() => {
    mq.removeEventListener("change", syncNav);
});
</script>

<style>
header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background: var(--background-color);

    nav ul {
        display: flex;
        gap: 1rem;
        list-style: none;
        align-items: baseline;

        li a {
            background: #444;
            padding: 0.5rem 0.5rem;
            border-radius: 0.25rem;
        }

        li a:hover {
            background: #666;
        }
    }
}

details {
    display: contents;
}
details[open]::details-content {
    display: contents;
}

@media (min-width: 800px) {
    summary {
        display: none;
    }
}

@media (max-width: 799px) {
    header {
        display: grid;
        gap: 0;
        grid-template-columns: auto auto;
        grid-template-areas:
            "title menu"
            "nav nav";
    }

    h1 {
        grid-area: title;
    }

    details summary {
        text-align: right;
        user-select: none;
        grid-area: menu;
        margin-bottom: 0.5rem;
    }

    details summary:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    nav {
        transition:
            opacity 0.3s ease,
            transform 0.3s ease,
            filter 0.2s ease;
        opacity: 0;
        transform: translateY(-0.5rem) scaleY(0.95);
        filter: blur(2px);
        grid-area: nav;
        justify-content: flex-end;
        margin-bottom: 1rem;

        ul {
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;

            li {
                padding-top: 0;
                padding-bottom: 0;
            }
        }
    }

    nav.open {
        opacity: 1;
        transform: translateY(0) scaleY(1);
        filter: blur(0);
    }
}
</style>
