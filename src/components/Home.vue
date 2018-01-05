<template>
    <v-flex xs12 grid-list-md text-xs-center>
        <recent-posts-widget>Recent Posts</recent-posts-widget>

    </v-flex>
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