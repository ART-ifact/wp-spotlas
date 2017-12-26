<template>
  <div class="card-expansion">
    <md-card v-for="post in recentPosts" :key="post.id">
      <router-link v-bind:to="'/location/'+post.id">
          <md-card-media v-for="(image, index) in post.images.slice(0,1)" :key="image.id">
            <img :src="image.large">
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{ post.title.rendered }}</div>
            <div class="md-subhead">{{ post.category }}</div>
          </md-card-header>
      </router-link>
    </md-card>
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
  .card-expansion {
    height: 480px;
  }

  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;

    .md-card-media {
      height: 200px;
      overflow: hidden;
      
      img {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
</style>