<template>
    <div>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div v-if="locationdata" class="content">

            <h2>{{ locationdata.title.rendered }}</h2>
            <span v-for="image in locationdata.images" :key="image.id">
                <img :src="image.large">
            </span>

        </div>
    </div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import api from '../api'
import types from '../store/mutation-types'

export default {
    props: ['id'],
    data () {
        return {
        loading: false,
        locationdata: null,
        error: null
        }
    },

    methods: {
        handleData(data) {;
            this.locationdata = data;
            console.log('data.post:'+ data.locationdata)
            this.loading = false
        }
    },

    watch: {
        // call again the method if the route changes
        '$route': 'handleData'
    },

    created() {
        //this.$store.dispatch('getPost')
        this.loading = true
        api.getPost(this.id, this.handleData);

    }
}
</script>

<style lang="scss">
    
</style>