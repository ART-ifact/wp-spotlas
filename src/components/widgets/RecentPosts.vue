<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm4 xs12 v-for="post in recentPosts" :key="post.id">
        <v-card color="dark darken-2" class="white--text">
          <router-link v-bind:to="'/location/'+post.id">
            <v-card-media  height="200px">
              <div v-if="post.images.length > 0" v-for="(image, index) in post.images.slice(0,1)" :key="image.id">
                <img  :src="image.large" :key="image.large" class="leaderimg">

              </div>
              <img v-if="post.images.length < 1" :src="placeholderImage">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ post.title.rendered }}</h3>
                <div>{{ post.category }}</div>
              </div>
            </v-card-title>
          </router-link>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
  data: {
    placeholderImage: ''
  },

  mounted() {
    let _this = this;
    _this.placeholderImage = window.SETTINGS.THEMEURL + '/dist/assets/img/location-standard.jpg';
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