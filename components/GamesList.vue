<template>
  <!--     <v-img :src="game.league.image_url" contain> -->
  <v-expansion-panels>
    <!-- <v-overlay :value="true"></v-overlay> -->
    <v-expansion-panel
      v-for="game in gamesToDisplay"
      :key="game.id"
      :id="game.id"
      @click="onExpansionPanelClick($event, game)"
    >
      <!--  :style="{ 'background-image': 'url(' + game.league.image_url + ')', 'background-position': 'center', 'background-size': '50%' }" -->

      <v-expansion-panel-header>
        <GameCardHeader :game="game" />
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <GameCardContent :game="game" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import gamesInfoMixin from "~/mixins/gamesInfoMixin";
import GameCardHeader from "~/components/GameCard/GameCardHeader.vue";
import GameCardContent from "~/components/GameCard/GameCardContent.vue";

export default {
  name: "GamesList",

  components: {
    GameCardHeader,
    GameCardContent,
  },

  mixins: [gamesInfoMixin],

  computed: {
    options() {
      return {
        duration: 800,
        offset: 0,
      };
    },
  },

  methods: {
    async onExpansionPanelClick(event, game) {
      if (
        event.currentTarget.classList.contains(
          "v-expansion-panel-header--active"
        )
      ) {
        console.log("Panel is closing/now closed.");
      } else {
        console.log("Panel is opening/now open.");
        //this.$vuetify.goTo(600, this.options);
        // 4 = dota2,
        /* const videoGamesWithRosters = [4] */
        /* if (videoGamesWithRosters.includes(game.videogame.id)) { */

        /* debugger */
        await this.getGameRosters(game);
        await this.getAditionalInfoForMatch(game);
        /*  await this.getOddsForMatch(); */ // Nas proximas tem que passar o id
        /* } */
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* .leagueLogo {
  background: url('https://ohlaladani.com.br/wp-content/uploads/wallpaper-OHLALADANI_DESKTOP_WALLPAPERS_AVENTURA-2.jpg');
}
 */
</style>
