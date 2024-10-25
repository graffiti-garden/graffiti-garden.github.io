<template>
    <main>
        <h1>Context</h1>

        <Playground
            path="context-poster"
            :data="{
                inReplyTo: '',
                content: '',
                channels: [],
            }"
            :hide-source="true"
        />

        <Playground
            path="my-feed-viewer"
            :data="{
                inReplyTo: '',
                content: '',
                channels: [],
            }"
            :hide-source="true"
        />

        <Playground
            path="comment-feed-viewer"
            :data="{
                inReplyTo: '',
            }"
            :hide-source="true"
        />
    </main>
</template>
