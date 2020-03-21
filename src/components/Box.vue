<template>
  <fragment>
    <div
      class="box square"
      v-if="data.type === 'square'"
      :style="generateBoxCss"
    >
      {{ data.weight }}
    </div>
    <div
      class="box triangle"
      v-if="data.type === 'triangle'"
      :style="generateBoxCss"
    >
      {{ data.weight }}
    </div>
    <div
      class="box circle"
      v-if="data.type === 'circle'"
      :style="generateBoxCss"
    >
      {{ data.weight }}
    </div>
  </fragment>
</template>

<script>
export default {
  name: "BoxComponent",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    generateBoxCss() {
      if (this.data.type === "triangle") {
        return {
          borderLeftWidth: this.data.weight * 5 + "px",
          borderRightWidth: this.data.weight * 5 + "px",
          borderBottomWidth: this.data.weight * 10 + "px",
          top: this.data.top + "px",
          left: this.data.left + "px"
        };
      } else {
        return {
          width: this.data.weight * 10 + "px",
          height: this.data.weight * 10 + "px",
          top: this.data.top + "px",
          left: this.data.left + "px"
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: absolute;
  top: 0px;
}

.square {
  background-color: red;
}
.circle {
  border-radius: 50%;
  background-color: blue;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #32557f;
  color: white;
}
</style>
