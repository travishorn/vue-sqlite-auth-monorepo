import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiBase: "http://localhost:3000",
    session: {
      active: false,
      key: false
    },
    user: {
      username: null
    }
  },
  getters: {
    loggedIn: state => state.session.active
  },
  mutations: {
    logIn(state, { username, key }) {
      state.user.username = username;
      state.session.key = key;
      state.session.active = true;
    },
    logOut(state) {
      state.user.username = null;
      state.session.key = null;
      state.session.active = false;
    }
  },
  actions: {
    logIn({ commit, state }, { username, password }) {
      axios
        .post(`${state.apiBase}/user/session`, {
          username,
          password
        })
        .then(res => {
          if (password) {
            commit("logIn", {
              username,
              key: res.data.sessionKey
            });
          }
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.errors) {
            alert(JSON.stringify(err.response.data.errors));
          } else {
            alert(JSON.stringify(err));
          }
        });
    },
    logOut({ commit, state }) {
      axios
        .delete(`${state.apiBase}/user/session`, {
          headers: {
            Authorization: `Bearer ${state.session.key}`
          }
        })
        .then(() => {
          commit("logOut");
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.errors) {
            alert(JSON.stringify(err.response.data.errors));
          } else {
            alert(JSON.stringify(err));
          }
        });
    },
    register({ state, dispatch }, { username, password }) {
      axios
        .post(`${state.apiBase}/user/`, {
          username,
          password
        })
        .then(() => {
          dispatch("logIn", { username, password });
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.errors) {
            alert(JSON.stringify(err.response.data.errors));
          } else {
            alert(JSON.stringify(err));
          }
        });
    }
  }
});
