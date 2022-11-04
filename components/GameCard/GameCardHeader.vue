<template>
  <div>
    <div class="header-teste">
    <p class="headline ">
<!--       <v-img className="leagueLogo" :src="game.league.image_url" /> -->
      {{
        game.opponents[0]
          ? game.opponents[0].opponent.acronym
            ? game.opponents[0].opponent.acronym
            : game.opponents[0].opponent.name
          : ""
      }}
      vs.
      {{
        game.opponents[1]
          ? game.opponents[1].opponent.acronym
            ? game.opponents[1].opponent.acronym
            : game.opponents[1].opponent.name
          : ""
      }}
    </p>
    <v-img class="leagueLogo" :src="game.league.image_url" />
    </div>
    <p>{{ game.videogame.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.leagueLogo {
  margin: 0;
  padding: 0;
  max-width: 50px;

} 

.header-teste {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

</style>