<template>
    <main>
        <h1>Graffiti</h1>

        <p>
            Graffiti lets you integrate custom social features into any static
            website with just a few lines of HTML and JavaScript. These features
            can be as relatively simple, as in the demo below, or amount to
            full-fledged applications similar to
            <a href="https://glitter.graffiti.garden">Twitter</a>,
            <a href="https://parallax.graffiti.garden">Messenger</a>, and
            <a href="https://wiki.graffiti.garden">Wikipedia</a>
            with plenty of room for
            <a href="https://gluefactory.live">new designs</a>.
        </p>

        <Playground path="introduction" :hide-source="true" />

        <p>
            Applications within the Graffiti ecosystem also interoperate. If
            your friends use a Graffiti application that you don't like, you can
            either modify it, create your own from scratch, or switch to an
            application that someone else has already built — all without losing
            your friends! You can change pretty much anything including the
            moderation system, privacy settings, feed sorting algorithm, site
            layout, color scheme, and so on.
        </p>

        <p>If you are interested in building, check out the:</p>
        <ul>
            <li>
                <a href="https://api.graffiti.garden/classes/Graffiti.html">
                    API Documentation
                </a>
            </li>
            <li>
                <a
                    href="https://vue.graffiti.garden/variables/GraffitiPlugin.html"
                >
                    Vue Plugin Documentation
                </a>
            </li>
            <li>
                <a href="https://vue.graffiti.garden/examples/">
                    Minimal examples of common patterns </a
                >, including "Likes", profiles, friends, threading, and
                messaging.
            </li>
        </ul>

        <p>
            If you want a theoretical grounding of Graffiti, please contact the
            authors for a preprint of the paper, currently under review.
        </p>

        <!-- <p>
            On this site, you can find a high-level description of the Graffiti
            system, a guide to building your own Graffiti apps, and a series of
            guided examples on replicating common social media patterns with
            Graffiti.
        </p> -->

        <!-- <p>
            All of the code behind Graffiti is open source on
            <a href="https://github.com/graffiti-garden">Github</a>.
        </p> -->

        <!-- <footer>
            <RouterLink to="/motivation"> Motivation </RouterLink>
        </footer> -->
    </main>
</template>
