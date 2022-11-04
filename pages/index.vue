<template>
  <div>
    <GamesList />
  </div>
</template>

<script>

import { mapActions } from "vuex";
import GamesList from '../components/GamesList.vue';

export default {
  components: { GamesList },
  name: "LandingPage",

};
</script>
