import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function getLeftTotal(array) {
  let total = 0;
  array.forEach(item => {
    total += item.weight * (500 - item.left);
  });
  return total;
}
function getRightTotal(array) {
  let total = 0;
  array.forEach(item => {
    total += item.weight * (item.left - 500);
  });
  return total;
}

export default new Vuex.Store({
  state: {
    isGamePaused: false,
    leftBoxes: [],
    rightBoxes: [],
    topBoxes: [],
  },
  mutations: {
    TOGGLE_PAUSE(state) {
      state.isGamePaused = !state.isGamePaused;
    },
    ADD_TO_TOP_BOXES(state, payload) {
      state.topBoxes.push(payload);
    },
    ADD_TO_RIGHT_BOXES(state, payload) {
      state.rightBoxes.push(payload);
    },
    MOVE_BOTTOM(state, payload) {
      state.topBoxes[0].top += payload;
    },
    SET_TOP(state, payload) {
      state.topBoxes[0].top = payload;
    },
    MOVE_RIGHT(state, payload) {
      if (
        state.topBoxes[0].left + payload <=
        500 - state.topBoxes[0].weight * 10
      ) {
        state.topBoxes[0].left += payload;
      }
    },
    MOVE_LEFT(state, payload) {
      if (state.topBoxes[0].left - 20 >= 0) {
        state.topBoxes[0].left -= payload;
      }
    },
    ADD_TO_LEFT_BOXES(state, payload) {
      state.leftBoxes.push(payload);
    },
    RESET_STATE(state){
      state.leftBoxes=[];
      state.rightBoxes=[];
      state.topBoxes=[];
      state.isGamePaused=false;
    }
  },
  actions: {
    togglePause({ commit }) {
      commit("TOGGLE_PAUSE");
    },
    addToTopBoxes({ commit }, payload) {
      commit("ADD_TO_TOP_BOXES", payload);
    },
    addToRightBoxes({ commit }, payload) {
      commit("ADD_TO_RIGHT_BOXES", payload);
    },
    addToLeftBoxes({ commit }, payload) {
      commit("ADD_TO_LEFT_BOXES", payload);
    },
    moveBottom({ commit }, payload) {
      commit("MOVE_BOTTOM", payload);
    },
    moveLeft({ commit }, payload) {
      commit("MOVE_LEFT", payload);
    },
    moveRight({ commit }, payload) {
      commit("MOVE_RIGHT", payload);
    },
    setTop({ commit }, payload) {
      commit("SET_TOP", payload);
    },
    resetState({commit}){
      commit('RESET_STATE');
    }
  },
  getters: {
    getGameStatus(state) {
      return state.isGamePaused;
    },
    getTopBoxes(state) {
      return state.topBoxes;
    },
    getLeftBoxes(state) {
      return state.leftBoxes;
    },
    getRightBoxes(state) {
      return state.rightBoxes;
    },
    getLeftOfTopBoxes(state) {
      return state.topBoxes[0].left;
    },
    getTopOfTopBoxes(state) {
      return state.topBoxes[0].top;
    },
    getRotateAngle(state) {
      return state.rotateAngle;
    },
    getLeftTotal(state) {
      return getLeftTotal(state.leftBoxes);
    },
    getRightTotal(state) {
      return getRightTotal(state.rightBoxes);
    },
    calculateBalance(state, getters) {
      const { getLeftTotal, getRightTotal } = getters;

      if (!getLeftTotal) return 30;
      return getLeftTotal > getRightTotal
        ? ((getLeftTotal - getRightTotal) / getLeftTotal) * -100
        : ((getRightTotal - getLeftTotal) / getRightTotal) * 100;
    }
  }
});
