<template>
    <Header />

    <main>
        <section class="title">
            <h1 class="graffiti">Graffiti</h1>

            <h2>An infrastructure for building social software.</h2>
        </section>

        <section id="overview">
            <p>
                Graffiti is an infrastructure that you can build custom social
                apps on top of using <strong>only front-end code</strong>—no
                need to build or deploy your own server. You can build apps like
                <a href="">Twitter</a>, <a href="">Messenger</a>,
                <a href="">Wikipedia</a>, or something completely new!
            </p>

            <p>
                Applications within the Graffiti ecosystem also
                <strong>interoperate</strong>. You can freely move between
                different Graffiti apps—each with its own aesthetic, feature
                set, and moderation—all without losing your friends or data.
            </p>

            <p>
                Graffiti is
                <strong>decentralized</strong>: you get to choose which of the
                generic Graffiti servers your data is hosted on. Your choice of
                server does not effect who you can interact with, and you can
                change servers at any time or even host your own.
            </p>
        </section>

        <section class="paper">
            <a
                href="https://dl.acm.org/doi/pdf/10.1145/3746059.3747627?download=true"
                download
            >
                <figure>
                    <picture>
                        <source
                            media="(max-width: 899px)"
                            srcset="/assets/paper-wide.avif"
                        />
                        <img
                            src="/assets/paper-tall.avif"
                            alt="Screenshot of the front page of the Graffiti paper"
                        />
                    </picture>

                    <figcaption>Read the Paper</figcaption>
                </figure>
            </a>
            <p>
                <a href="https://uist.acm.org/2025/awards/">
                    🏆 Best Paper at UIST’25
                </a>
            </p>
        </section>

        <section>
            <h2>Demo</h2>

            <Demo />
        </section>

        <section>
            <h2>Resources</h2>

            <ul>
                <li>
                    <a href="https://vue.graffiti.garden/examples/">
                        Simple Examples </a
                    >: See how likes, follows, comments, profiles, and more can
                    be implemented in just a few lines of code.
                </li>
                <li>
                    <a href="https://api.graffiti.garden/classes/Graffiti.html">
                        API Documentation </a
                    >: Use Graffiti anywhere you use Javascript or Typescript.
                </li>
                <li>
                    <a
                        href="https://vue.graffiti.garden/variables/GraffitiPlugin.html"
                    >
                        Vue Plugin Documentation </a
                    >: Use Graffiti within <a href="https://vuejs.org">Vue</a>'s
                    reactive programming environment.
                </li>
            </ul>
        </section>

        <section>
            <h2>Cite Graffiti</h2>

            <div class="bibtex" @click="copyBibtex">
                <button
                    type="button"
                    :data-state="copyState"
                    title="Copy BibTeX to clipboard"
                >
                    <span aria-hidden="true">⧉ </span>
                    <span>
                        {{ copyState === "copied" ? "Copied!" : "Copy" }}
                    </span>
                </button>

                <pre><code>{{ bibtexEntry }}</code></pre>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import Header from "./Header.vue";
import Demo from "./Demo.vue";

const bibtexEntry = `@inproceedings{graffiti,
    title = {Graffiti: Enabling an Ecosystem of Personalized and Interoperable Social Applications},
    author = {Henderson, Theia and Karger, David R. and Clark, David D.},
    booktitle = {Proceedings of the 38th Annual ACM Symposium on User Interface Software and Technology},
    url = {https://doi.org/10.1145/3746059.3747627},
    doi = {10.1145/3746059.3747627},
    isbn = {9798400720376},
    year = {2025},
    publisher = {ACM},
    address = {New York, NY, USA},
    articleno = {202},
    numpages = {21},
    series = {UIST ’25},
    collection = {UIST ’25}
}`;

const copyState = ref<"idle" | "copied" | "error">("idle");
let copyFeedbackTimer: ReturnType<typeof setTimeout> | null = null;

async function copyBibtex() {
    try {
        await navigator.clipboard.writeText(bibtexEntry);
        copyState.value = "copied";
    } catch {
        copyState.value = "error";
    }

    if (copyFeedbackTimer) {
        clearTimeout(copyFeedbackTimer);
    }

    copyFeedbackTimer = setTimeout(() => {
        copyState.value = "idle";
    }, 2200);
}

onBeforeUnmount(() => {
    if (copyFeedbackTimer) {
        clearTimeout(copyFeedbackTimer);
    }
});
</script>

<style>
main {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    padding: 1rem;
    max-width: 120ch;
    margin: 0 auto;
}
section {
    background: var(--background-color);
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    ul {
        margin-left: 1.5em;
    }
}

.paper p {
    text-align: center;
}

.paper figure {
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
}

.paper figure img {
    display: block;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    object-fit: contain;
}

.paper figcaption {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    max-width: calc(100% - 2rem);
    padding: 0.5rem 0.75rem;
    line-height: 1.3;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 700;
    text-align: center;
    background: #444;
    border-radius: 0.25rem;
    z-index: 1;
}

.paper figure::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgb(202 122 204 / 14%);
    opacity: 0;
    transition: opacity 180ms ease;
    pointer-events: none;
}

.paper > a:hover figure,
.paper > a:focus-visible figure {
    box-shadow: 0 0 0 2px var(--highlight);
}

.paper > a:hover figure::after,
.paper > a:focus-visible figure::after {
    opacity: 1;
}

@media (max-width: 899px) {
    .paper figure {
        max-width: 40ch;
        margin: 0 auto;
    }
}

.bibtex {
    position: relative;
}

.bibtex button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 1;
    padding: 0.7rem 0.95rem;
    font-size: 1rem;
    line-height: 1;
    border: 1px solid grey;
    border-radius: 0.25rem;
    background: #444;
    color: #fff;
    cursor: pointer;
    transition: 160ms ease;
}

.bibtex:hover,
.bibtex:focus-within {
    cursor: pointer;

    button {
        background: #555;
    }

    pre {
        background: rgb(10 10 10 / 95%);
        box-shadow: 0 0 0 2px var(--highlight);
    }
}

.bibtex pre {
    position: relative;
    width: 100%;
    min-width: 0;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid grey;
    background: rgb(10 10 10 / 88%);
    white-space: pre;
    overflow: auto;
    transition: 160ms ease;
}

@media (min-width: 900px) {
    main {
        grid-template-columns: minmax(0, 1fr) 15rem;
        align-items: start;
    }

    .title,
    #overview {
        grid-column: 1;
    }

    .paper {
        grid-column: 2;
        grid-row: 1 / span 2;
        width: 15rem;
        align-self: center;
    }

    main > section:not(.title):not(#overview):not(.paper) {
        grid-column: 1 / -1;
    }
}
</style>
