
<template>
  <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Spottr</v-toolbar-title>

      <v-speed-dial fab small large dark absolute top right  class="btn-add"  :direction="'bottom'" :hover="true"
                    :transition="'slide-y-reverse-transition'">
                    <v-btn slot="activator" color="teal darken-2" dark fab hover>
                        <v-icon>menu</v-icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-btn :href="'/wordpress/add/'" fab dark small color="teal">
                        <v-icon>add_location</v-icon>
                    </v-btn>
                    <v-btn :href="'/wordpress/grid/'" fab dark small color="teal">
                        <v-icon>grid_on</v-icon>
                    </v-btn>
                    <v-btn :href="'/wordpress/'" fab dark small color="teal">
                        <v-icon>map</v-icon>
                    </v-btn>
                    
                </v-speed-dial>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
</style>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
export default {
  name: 'Reveal',
  data: () => ({
    menuVisible: false,
    showLoader: true,
    logoutLink: window.SETTINGS.LOGOUT
  }),
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      loadingProgress: 'loadingProgress'
    }),

    loaderStyle() {
      return `width: ${this.loadingProgress}%;`
    }
  },

  components: {
    appHeader: Header,
    appFooter: Footer
  },

  watch: {
    // watch the value of isLoading and once it's false hide the loader
    isLoading(val) {
      if (val == false) {
        let self = this
        setTimeout(function(){
          self.showLoader = false
        }, 1000)
      }
    }
  }
}
</script>
