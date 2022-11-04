<template>
  <v-app-bar app shrink-on-scroll>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>tem BR jogando</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-menu
      close-on-content-click
      offset-y
      transition="slide-y-transition"
      hide-overlay
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on">
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
      <v-list one-line subheader>
        <v-subheader>Filtrar por Jogo</v-subheader>
        <v-list-item
          v-for="videoGame in videoGamesListToFilterFrom"
          :key="videoGame"
        >
          <v-checkbox
            @click="filteredVideoGamesHandler"
            v-model="selectedVideoGamesOptions"
            :value="videoGame"
            color="primary"
          />
          <v-list-item-content>
            <v-list-item-title>{{ videoGame }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import gamesInfoMixin from "~/mixins/gamesInfoMixin";
export default {
  name: "TopBar",

  mixins: [gamesInfoMixin],

  data() {
    return {
      selectedVideoGamesOptions: [],
    };
  },

  computed: {
    videoGamesListToFilterFrom() {
      let showOptionsList = [];
      this.upcomingGames.forEach((game) => {
        if (!showOptionsList.includes(game.videogame.name)) {
          showOptionsList.push(game.videogame.name);
        }
      });
      return showOptionsList;
    },
  },

  methods: {
    filteredVideoGamesHandler(event) {
      event.stopPropagation();
      this.updateFilteredVideoGames(this.selectedVideoGamesOptions);
    },

    displayOptionsListHandler() {
      this.showOptionsList = !this.showOptionsList;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
