import Vue from "vue"
import Vuex from "vuex"
import data from "@/db.json"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")),
    error: null,
    users: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
    FETCH_USERS(state, payload) {
      state.users = payload
    },
    DELETE_USER(state, payload) {
      const index = state.users.findIndex((user) => user.id == payload)
      state.users.splice(index, 1)
    },
    UPDATE_USER(state, payload) {
      const user = state.users.find((user) => user.id == payload.id)

      if (
        payload.first_name &&
        payload.last_name &&
        payload.email &&
        payload.gender
      ) {
        user.first_name = payload.first_name
        user.last_name = payload.last_name
        user.email = payload.email
        user.gender = payload.gender
      }
    },
    CREATE_USER(state, payload) {
      state.users.push(payload)
    },
  },
  actions: {
    logUserIn({ commit }, email) {
      const findUser = data.find((user) => user.email == email)

      if (findUser) {
        commit("CLEAR_ERROR", null)
        commit("SET_USER", findUser)
        commit("FETCH_USERS", data)
      } else {
        commit("SET_ERROR", "User not found")
      }
    },
    logUserOut({ commit }) {
      commit("SET_USER", null)
      commit("FETCH_USERS", null)
      localStorage.removeItem("user")
    },
    loadUsers({ commit }) {
      commit("FETCH_USERS", data)
    },
    deleteUser({ commit }, id) {
      if (!(id == this.state.user.id)) {
        commit("DELETE_USER", id)
      } else {
        console.log("You can't delete yourself")
      }
    },
    updateUserData({ commit }, payload) {
      commit("UPDATE_USER", payload)
    },
    createUser({ commit, state }, payload) {
      if (state.users.some((user) => user.email == payload.email)) {
        commit("SET_ERROR", "User exists with this email")
      } else {
        commit("CLEAR_ERROR")
        commit("CREATE_USER", payload)
      }
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    },
    users(state) {
      return state.users
    },
    getUserById(state) {
      return (profileId) => {
        return state.users.find((profile) => {
          return profile.id == profileId
        })
      }
    },
  },
  modules: {},
})
