<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <recent-posts-widget>Recent Posts</recent-posts-widget>
            </b-col>
        </b-row>
    </b-container>
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