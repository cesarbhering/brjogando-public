import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
  upcomingGames: [],
  gamesRosters: [],
  gamesAditionalInfo: {},
  gamesOdds: {},
  filteredVideoGames: [],
  upcomingGamesFiltered: []
})

export const getters = {
  getField
}

export const mutations = {
  updateField,
  setUpcomingGames(state, payload) {
    state.upcomingGames = payload
  },

  setGamesRosters(state, payload) {
    state.gamesRosters.push({ gameId: payload.gameId, rosters: payload.rosters.data })

  },

  setGamesAditionalInfo(state, payload) {
    state.gamesAditionalInfo = payload[0]
  },

  setGamesOdds(state, payload) {
    state.gamesOdds = payload.data
  },

  setFilteredVideoGames(state, payload) {
    state.filteredVideoGames = payload
    state.upcomingGamesFiltered = state.upcomingGames.filter(game => state.filteredVideoGames.includes(game.videogame.name))
  }
}

export const actions = {

  updateFilteredVideoGames({ commit }, payload) {
    commit('setFilteredVideoGames', payload)
  },

  async fetchUpcomingGames({ commit }) {
    return fetch("/.netlify/functions/fetchUpcomingGames", { headers: { accept: "Accept: application/json" } }).then((response) => response.json())
      .then((response) => commit('setUpcomingGames', response.data)).catch((error) => console.log(error))
  },

  async getGameRosters({ commit }, payload) {
    const gameId = payload.id
    const videoGameId = payload.videogame.id
    const opponentOneId = payload.opponents[0].opponent.id
    const opponentTwoId = payload.opponents[1].opponent.id
    let rosters
    await fetch(`/.netlify/functions/getGameRosters?videoGameId=${videoGameId}&opponentOneId=${opponentOneId}&opponentTwoId=${opponentTwoId}`, { headers: { accept: "Accept: application/json" } }).then((response) => response.json())
      .then((response) => rosters = response).catch((error) => console.log(error))
    commit('setGamesRosters', { gameId, rosters })
  },

  async getAditionalInfoForMatch({ commit }, payload) {
    const gameId = payload.id
    let aditionalInfo
    await fetch(`/.netlify/functions/getAditionalInfoForMatch?gameId=${gameId}`, { headers: { accept: "Accept: application/json" } }).then((response) => response.json())
      .then((response) => aditionalInfo = response).catch((error) => console.log(error))
    commit('setGamesAditionalInfo', aditionalInfo)
  },

  async getOddsForMatch({ commit }) {
    let odds
    await fetch(`/.netlify/functions/getOddsForMatch`, { headers: { accept: "Accept: application/json" } }).then((response) => response.json())
      .then((response) => odds = response).catch((error) => console.log(error))
    commit('setGamesOdds', odds)
  }
}
