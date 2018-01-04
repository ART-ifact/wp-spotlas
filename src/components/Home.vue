<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <recent-posts-widget>Recent Posts</recent-posts-widget>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import RecentPostsWidget from './widgets/RecentPosts'
import PagesWidget from './widgets/Pages'

export default {
    components: {
        RecentPostsWidget
    }
}
</script>

<style lang="scss">
    .jumbotron {
        margin-top: 5%;
    }
</style>