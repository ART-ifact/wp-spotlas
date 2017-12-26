<template>
  <div class="widget recent-posts">
    <h3><slot></slot></h3>
    <ul v-if="recentPostsLoaded">
      <li v-for="post in recentPosts" :key="post.id">{{ post.title.rendered }}</li>
    </ul>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      recentPostsLoaded: 'recentPostsLoaded'
    })
  },

  mounted() {
    this.$store.dispatch('getPosts')
  }
}
</script>

<style lang="scss" scoped>
</style>