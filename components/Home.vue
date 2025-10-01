<template>
    <main>
        <h1>Graffiti</h1>

        <p>
            Graffiti is a system that lets you build a wide variety of custom
            social apps with using only front end code. You can build apps like
            <a href="https://glitter.graffiti.garden">Twitter</a>,
            <a href="https://parallax.graffiti.garden">Messenger</a>,
            <a href="https://wiki.graffiti.garden">Wikipedia</a>
            or plenty of
            <a href="https://gluefactory.live">new apps</a>.
        </p>

        <p>
            Applications within the Graffiti ecosystem also
            <strong>interoperate</strong>. You can freely move between Graffiti
            apps—each with its own aesthetic, feature set, and moderation—all
            without losing your friends or data!
        </p>

        <p>
            <a href="https://doi.org/10.1145/3746059.3747627"
                >Read the full paper 📄</a
            >, awarded Best Paper 🏆 at ACM UIST 2025, to learn more about the
            design.
        </p>

        Below is a small Graffiti app built with Vue. You can modify the code
        and the app will update:

        <Playground path="introduction" :hide-source="true" />

        <p>If you are interested in building, check out the:</p>
        <ul>
            <li>
                <a href="https://vue.graffiti.garden/examples/">
                    Minimal examples of common patterns</a
                >, including likes, profiles, friends, threading, and
                messaging.
            </li>
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
              Source code for apps like <a href="https://github.com/graffiti-garden/glitter">Twitter</a>, <a href="https://github.com/graffiti-garden/parallax">Messenger</a>, and <a href="https://github.com/graffiti-garden/wikiffiti">Wikipedia</a>.
            </li>
        </ul>

        <p>
            We have more tutorials coming soon! In the meantime, please reach
            out to <a href="mailto:theia@mit.edu">Theia Henderson</a>
            if you are interested in building or have other questions :)
        </p>

        <p>
            All of the code behind Graffiti is
            <a href="https://github.com/graffiti-garden">open source on Github</a>.
        </p>

        <!-- <p>
            On this site, you can find a high-level description of the Graffiti
            system, a guide to building your own Graffiti apps, and a series of
            guided examples on replicating common social media patterns with
            Graffiti.
        </p> -->

        <!-- <footer>
            <RouterLink to="/motivation"> Motivation </RouterLink>
        </footer> -->
    </main>
</template>
