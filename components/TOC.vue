<template>
    <ul>
        <!-- <li>
            Guide
            <ul>
                <li>
                    <a>Coming Soon</a>
                </li>
            </ul>
        </li> -->
        <!-- Only show the Paper section if the user is on a paper page -->
        <li v-if="$route.path.startsWith('/paper')">
            Paper
            <ul>
                <li>
                    <RouterLink to="/paper/abstract"> Abstract </RouterLink>
                </li>
                <li>
                    <RouterLink to="/paper/introduction">
                        Introduction
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/paper/requirements">
                        Requirements
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/paper/concepts">Concepts </RouterLink>
                </li>
                <li>
                    <RouterLink to="/paper/api"> API </RouterLink>
                </li>
                <li>
                    <RouterLink to="/paper/above-and-below"
                        >Above & Below</RouterLink
                    >
                </li>
                <li>
                    <RouterLink to="/paper/related-work">
                        Related Work
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/paper/case-studies">
                        Case Studies
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/paper/conclusion"> Conclusion </RouterLink>
                </li>
                <li>
                    <RouterLink to="/paper/appendix"> Appendix </RouterLink>
                </li>
            </ul>
        </li>
        <li>
            Reference
            <ul>
                <li>
                    <a href="https://api.graffiti.garden/classes/Graffiti.html">
                        API
                    </a>
                </li>
                <li>
                    <a
                        href="https://vue.graffiti.garden/variables/GraffitiPlugin.html"
                    >
                        Vue Plugin
                    </a>
                </li>
            </ul>
        </li>
    </ul>
    <ul>
        <li>
            <a
                target="_blank"
                class="logo"
                href="https://github.com/graffiti-garden"
            >
                <img src="/media/github.png" />
                Github
            </a>
        </li>
    </ul>
</template>
