<template>
  <div class="teeter-totter-container">
    <div class="pipe" :style="applyRotationAngle"></div>
    <div class="triangle"></div>
    <div>{{ Math.floor(calculateBalance) }} deg</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TeeterTotter",
  computed: {
    ...mapGetters({
      calculateBalance: "calculateBalance"
    }),

    applyRotationAngle() {
      return {
        transform: `rotate(${this.calculateBalance / 2}deg)`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.teeter-totter-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  bottom: 0px;
  width: 100%;
}
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}
.pipe {
  width: 1000px;
  height: 20px;
  background-color: red;
  transition: 400ms all ease;
}
</style>
