<template>
  <div class="game-container">
    <div class="pause-button" @click="pauseGame">{{getGameStatus?'Pause':'Play'}}</div>
    <Box v-for="box in topBoxes" :key="box.id" :data="box"></Box>
    <TeeterTotter></TeeterTotter>
    <Box v-for="box in rightBoxes" :key="box.id" :data="box"></Box>
    <Box v-for="box in leftBoxes" :key="box.id" :data="box"></Box>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Box from "./Box";
import TeeterTotter from "./TeeterTotter";
import {
  STEP_SIZE,
  PIPE_HEIGHT,
  HALF_PIPE_WIDTH,
  SUPPORT_PIPE
} from "../constants";

export default {
  name: "Game",
  components: { TeeterTotter, Box },
  data() {
    return {
      movement: null
    };
  },

  methods: {
    ...mapActions({
      togglePause: "togglePause",
      addToTopBoxes: "addToTopBoxes",
      moveBottom: "moveBottom",
      moveRight: "moveRight",
      moveLeft: "moveLeft",
      setTop: "setTop",
      addToRightBoxes: "addToRightBoxes",
      addToLeftBoxes: "addToLeftBoxes"
    }),
    moveBox(e) {
      if (e.key === "ArrowRight") {
        this.moveRight(STEP_SIZE);
      } else if (e.key === "ArrowLeft") {
        this.moveLeft(STEP_SIZE);
      }
    },
    pauseGame() {
      this.togglePause();
    },
    onCollision() {
      clearInterval(this.movement);
      this.addToLeftBoxes(this.topBoxes.shift());
      this.addToTopBoxes(this.createRandomBox());
      this.addToRightBoxes(this.createRandomBox("right"));
      this.createInterval();
    },
    createInterval() {
      this.movement = setInterval(() => {
        let top = this.topBoxes[0].top;
        let weight = this.topBoxes[0].weight;
        if (
          top + PIPE_HEIGHT <
          window.innerHeight - SUPPORT_PIPE - weight * 10
        ) {
          this.moveBottom(STEP_SIZE);
        } else {
          top = window.innerHeight - SUPPORT_PIPE - weight * 10;
          this.setTop(top);
          this.onCollision();
        }
      }, 300);
    },
    createRandomBox(direction) {
      const weight = Math.floor(Math.random() * 10) + 1;
      let type = Math.floor(Math.random() * 3) + 1;
      if (type === 1) {
        type = "circle";
      } else if (type === 2) {
        type = "square";
      } else if (type === 3) {
        type = "triangle";
      }
      const left =
        Math.floor(Math.random() * HALF_PIPE_WIDTH - weight * 10) + 1;
      let firstObject = {
        id: Math.random(),
        type: type,
        weight: weight
      };
      if (direction === "right") {
        firstObject.top = window.innerHeight - PIPE_HEIGHT - SUPPORT_PIPE - weight * 10;
        firstObject.left = HALF_PIPE_WIDTH + left;
      } else {
        firstObject.top = 0;
        firstObject.left = left;
      }
      return firstObject;
    }
  },
  mounted() {
    this.addToTopBoxes(this.createRandomBox());
    this.addToRightBoxes(this.createRandomBox("right"));
  },
  computed: {
    ...mapGetters({
      topBoxes: "getTopBoxes",
      rightBoxes: "getRightBoxes",
      leftBoxes: "getLeftBoxes",
      getGameStatus: "getGameStatus",
      rotateAngle: "getRotateAngle",
      getLeftTotal: "getLeftTotal",
      getRightTotal: "getRightTotal"
    })
  },
  watch: {
    getGameStatus() {
      if (this.getGameStatus === false) {
        clearInterval(this.movement);
        window.removeEventListener("keydown", this.moveBox);
      } else {
        this.createInterval();
        window.addEventListener("keydown", this.moveBox);
      }
    }
  },
  beforeMount() {
    window.addEventListener("keydown", this.moveBox);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.moveBox);
  }
};
</script>

<style lang="scss" scoped>
.game-container {
  width: 1000px;
  height: 100vh;
  position: relative;
  margin: auto;
}

.pause-button {
  float: right;
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: green;
  line-height: 100px;
  text-align: center;
  color: white;
}
</style>
