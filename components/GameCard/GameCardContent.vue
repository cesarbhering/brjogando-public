<template>
  <div class="all-expanded-card">
    <v-row>
      <v-col>
        <ul v-if="gameRosters !== undefined" class="list-class">
          <li
            v-for="player in gameRosters.rosters[0].players.slice(0, 5)"
            :key="player.slug"
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <span>{{ player.slug.substring(0, 10) }}</span>
              </v-col>
              <v-col class="ma-0 pa-0">
                <v-img
                  class="ml-auto"
                  :src="flagCDN + player.nationality?.toLowerCase() + '.svg'"
                  :alt="'Bandeira ' + player.nationality?.toLowerCase()"
                  max-width="20"
                />
              </v-col>
            </v-row>
          </li>
        </ul>
        <v-progress-circular
          v-else
          indeterminate
          color="primary"
          size="70"
        ></v-progress-circular>
      </v-col>
      <v-col align="center">
        <p class="subtitle">{{ game.league.name }}</p>
        <p class="subtitle">{{ timerString(game.begin_at) }}</p>
      <a class="subtitle" :href="gameLiquipedia" target="_blank">LIQUIPEDIA</a>
        <a class="subtitle" :href="game.official_stream_url" target="_blank">STREAM OFICIAL</a>
        <br />
        <br />
        
        <p>ODDs na Cloudbet</p>
        <div class="teste123">
        <v-img :src="game.opponents[0].opponent.image_url" />
        X
        <v-img :src="game.opponents[1].opponent.image_url" />
        </div>
       <!--  <p>{{homeOdd}} x {{awayOdd}}</p> -->
      </v-col>
      <v-col>
        <ul v-if="gameRosters !== undefined" class="list-class">
          <li
            v-for="player in gameRosters.rosters[1].players.slice(0, 5)"
            :key="player.slug"
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <span>{{ player.slug.substring(0, 10) }}</span>
              </v-col>
              <v-col class="ma-0 pa-0">
                <v-img
                  class="ml-auto"
                  :src="flagCDN + player.nationality.toLowerCase() + '.svg'"
                  :alt="'Bandeira ' + player.nationality.toLowerCase()"
                  max-width="20"
                />
              </v-col>
            </v-row>
          </li>
        </ul>
        <v-progress-circular
          v-else
          indeterminate
          color="primary"
          size="70"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gamesInfoMixin from "~/mixins/gamesInfoMixin";
export default {
  mixins: [gamesInfoMixin],

  data() {
    return {
      flagCDN: "https://flagcdn.com/",
    };
  },

  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  computed: {
    gameRosters() {
      return this.$store.state.games.gamesRosters.find(
        (gameRoster) => gameRoster.gameId === this.game.id
      );
    },
    
    gameLiquipedia() {
      return this.$store.state.games.gamesAditionalInfo ? this.$store.state.games.gamesAditionalInfo.liquipedia : 'teste'
    },

   /*  homeOdd() {
      return this.$store.state.games.gamesOdds.markets ? this.$store.state.games.gamesOdds.markets['league_of_legends.winner'].submarkets['period=default'].selections[0].price.toFixed(2) : "teste";
    },

    awayOdd() {
      return this.$store.state.games.gamesOdds.markets ? this.$store.state.games.gamesOdds.markets['league_of_legends.winner'].submarkets['period=default'].selections[1].price.toFixed(2) : "teste";
    }, */
  },

  methods: {
    // a method that makes a countdown from the new Date provided
    countdown(date) {
      const now = new Date();
      date = Date.parse(date);
      const diff = (new Date(date).getTime() - now.getTime()) / 1000;
      const day = Math.floor(diff / (24 * 60 * 60)) || 0;
      const hour = Math.floor(diff / (60 * 60)) % 24;
      const minute = Math.floor(diff / 60) % 60;
      const second = Math.floor(diff) % 60;

      let gameCountdown = {
        day: day,
        hour: hour,
        minute: minute,
        second: second,
      };

      return gameCountdown;
    },

    validateDays(days) {
      if (days === 0) {
        return "";
      }
      if (days === 1) {
        return `${days} Dia - `;
      } else {
        return `${days} Dias - `;
      }
    },

    zeroPad(num, places) {
      // coloca o 0 na frente de hora, minuto e segundo que são int de 1 algarismo
      return String(num).padStart(places, "0");
    },

    timerString(game_begin_at) {
      // returns a string literal with day hour minute and second
      const gameCountdown = this.countdown(game_begin_at);
      return `Começa em ${this.validateDays(gameCountdown.day)}${this.zeroPad(
        gameCountdown.hour,
        2
      )}:${this.zeroPad(gameCountdown.minute, 2)}:${this.zeroPad(
        gameCountdown.second,
        2
      )}`;
    },
  },
};
</script>

<style lang="scss" scoped>

.list-class {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px;
    padding: 0px;
  }

  col {
    margin: 0px !important;
    padding: 0px !important;
  }
}

.teste123 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  padding: 0px;

  .v-image {
    max-width: 50px !important;
  }
}
</style>