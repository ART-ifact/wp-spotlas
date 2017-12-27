<template>
    <div>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div v-if="locationdata" class="content">

           
            
            <b-container class="bv-example-row">
                <b-row>
                    <h2>{{ locationdata.title.rendered }}</h2>
                    <b-col>
                        <carousel :perPageCustom="[[1920, 1]]" :navigationEnabled="true">
                            <slide v-for="image in locationdata.images" :key="image.id">
                                <img :src="image.large">
                            </slide>
                        </carousel>
                    </b-col>
                </b-row>
            </b-container>

        </div>
    </div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import api from '../api'
import { Carousel, Slide } from 'vue-carousel';

export default {
    props: ['id'],
    components: {
        Carousel,
        Slide
    },
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