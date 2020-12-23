<template>
  <v-content>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs4 mb-3>
          <!--<v-card>-->
            <!--<v-card-title>-->
              <!--hi-->
              <!--<v-spacer></v-spacer>-->
              <!--<td class="justify-center layout px-0">-->
                <!--<v-btn icon class="mx-0" @click="editItem(props.item)">-->
                  <!--<v-icon color="secondary">edit</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn icon class="mx-0" @click="deleteItem(props.item)">-->
                  <!--<v-icon color="secondary">delete</v-icon>-->
                <!--</v-btn>-->
              <!--</td>-->
            <!--</v-card-title>-->
          <!--</v-card>-->
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            v-model="selected"
            item-key="title"
            select-all
            color="primary"
            class="elevation-0"
          >
            <!--<template slot="headerCell" slot-scope="props">-->
                <td class="text-xs-right">
                  <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="secondary">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="secondary">delete</v-icon>
                  </v-btn>
                </td>
            <!--</template>-->
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox
                primary
                hide-details
                v-model="props.selected"
              ></v-checkbox>
            </td>
            <td style="cursor: pointer" @click="hi">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.subtitle }}</td>
          </template>
            <!--<v-alert slot="no-results" :value="true" color="error" icon="warning">-->
              <!--Your search for "{{ search }}" found no results.-->
            <!--</v-alert>-->
          </v-data-table>
          <!--<v-expansion-panel popout>-->
            <!--<v-expansion-panel-content v-for="item in getSets" :key="item.length">-->
              <!--<div slot="header">-->
                <!--<v-card-title>-->
                  <!--{{ item.title}}-->
                  <!--<v-spacer></v-spacer>-->
                  <!--<v-chip small disabled outline color="secondary">{{item.subtitle}}</v-chip>-->
                <!--</v-card-title>-->
              <!--</div>-->
              <!--<v-card>-->
                <!--<v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>-->
              <!--</v-card>-->
            <!--</v-expansion-panel-content>-->
          <!--</v-expansion-panel>-->
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import VCardTitle from 'vuetify/lib/components/VCard/VCardTitle'
import playerservice from '@/services/player'
export default {
  components: {VCardTitle},
  data () {
    return {
      search: '',
      selected: [],
      headers: [
        {
          text: 'jo',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ],
      items: []
    }
  },
  watch: {
    '$store.getters.getSets': function (res) {
      console.log('hi')
      this.setSets(res)
    }
  },
  methods: {
    setSets (sets) {
      // console.log(sets)
      // this.headers[0].text = sets.length + ' Sets'
      for (let i = 0; i < sets.length; i++) {
        this.items.push({
          value: false,
          title: sets[i].title,
          subtitle: playerservice.formatTime(sets[i].subtitle)
        })
      }
    },
    hi () {
      console.log('hi')
    }
  },
  mounted () {
    // this.setSets(this.$store.getters.getSets)
    this.$store.dispatch('commitSetsData')
  },
  computed: {
    getItems () {
      return this.items
    }
  }
}
</script>
