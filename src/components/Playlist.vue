<template>
    <v-content>
        <v-progress-linear v-if="!getdataReady" :indeterminate="true"></v-progress-linear>
        <v-container v-if="getdataReady" grid-list-md>
            <v-layout row wrap >
                <v-flex xs12 sm12 md6 lg6 xl8>
                    <v-card flat color="white" light height="auto">
                        <v-layout row wrap align-center class=""> <!--align-center class="justify-center"-->
                            <v-flex xs1 sm3 md4 lg3 xl2 class="pa-2">
                                <v-avatar
                                        :size="128"
                                        class="accent">
                                    <v-img :src="channelImgUrl"></v-img>
                                </v-avatar>
                                <!--</v-container>-->
                            </v-flex>
                            <v-flex xs12 sm9 md8 lg9 xl10>
                                <h6 class="display-1">{{channelTitle}}</h6>
                            </v-flex>
                        </v-layout>
                        <v-card-title class="display-1">{{Title}}</v-card-title>
                        <v-card-actions>
                            <v-chip v-if="total" small disabled outline color="accent">{{'Total:' + total}}</v-chip>
                            <v-chip v-if="playCounts" small disabled outline color="accent">
                                <v-icon>play_arrow</v-icon>
                                <span>{{playCounts}}</span>
                            </v-chip>
                            <v-chip v-if="timeM" small disabled outline color="accent">{{timeM}}</v-chip>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6 xl4>
                    <v-card flat>
                        <v-flex xs12
                                v-for="item in items"
                                :key="item.length">
                            <mediacard2
                                    :imgurl="item.thumbnail"
                                    :url="item.id"
                                    :title="item.title"
                                    :subtitle="item.author.name"
                                    :dur="item.duration"
                            ></mediacard2>
                        </v-flex>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import playlistservice from '@/services/playlist'
import playerservice from '@/services/player'
import mediacard2 from '@/components/MediaCard-2.vue'
export default {
    components: {
        mediacard2},
    data () {
        return {channelImgUrl: '', channelTitle:'', Title:'', total: '', timeM:'', playCounts:'', items: [], dataready:false,}
    },
    mounted () {
        this.getPlaylists(this.$route.params.id)
    },
    watch: {
        '$route': function (pizza) {
            this.getPlaylists(pizza.params.id)
        }
    },
    methods: {
        getPlaylists (id) {
            console.log(id);
            let t = this;
            playlistservice.fetchPlaylistData(id)
                .then(function (response) {
                    console.log(response)
                    t.dataready = true;
                    t.channelImgUrl = response.data.author.avatar;
                    t.channelTitle = response.data.author.name
                    t.Title = response.data.title
                    t.total = response.data.total_items
                    t.timeM = response.data.last_updated
                    t.playCounts = playerservice.formatNumbers(response.data.views)
                    t.items = response.data.items
                    t.setWindowTitle(t.Title)
                })
        },
        setWindowTitle (title) {
            window.document.title = title;
        }
    },
    computed: {
        getdataReady () {
            return this.dataready;
        }
    }
}

</script>