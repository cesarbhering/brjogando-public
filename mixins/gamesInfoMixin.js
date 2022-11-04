import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

const gamesInfoMixin = {

  mounted() {
    this.fetchUpcomingGames();
  },

  computed: {
    ...mapFields('games', ['upcomingGames', 'upcomingGamesFiltered', 'filteredVideoGames']),
    // a computed variable that gets the games from the games store
    gamesToDisplay() {
      // faz este some só porque quando faz o check no filtro, está indo string e e uma int, por que via a int ? verificar
      // Gambiarra da porra
      // a int ia por causa de v-item-group, que é um componente do vuetify, estudar isso direito
      return this.filteredVideoGames.length ? this.upcomingGamesFiltered : this.upcomingGames;
    },

  },

  methods: {
    // Ver como colocar a store 'games' dentro da pasta app, para não ficar no root
    ...mapActions("games", ["fetchUpcomingGames", "getGameRosters", "getAditionalInfoForMatch"/* , "getOddsForMatch" */, "updateFilteredVideoGames"]),
  },
}


export default gamesInfoMixin;
