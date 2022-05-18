<script setup>
import TaskBarView from "./TaskBarView.vue";
</script>

<template>
  <div class="screen">
    <div
      :class="`layer-on-off ${isMonitorOn ? 'layer-on' : 'layer-off'}`"
    ></div>
    <TaskBarView />
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      isMonitorOn: false,
    };
  },
  methods: {
    setStateScreen(state) {
      this.isMonitorOn = state;
    },
  },
};
</script>

<style scoped>
.screen {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000;
  background-image: url("../svg/xiao.svg");
  background-size: 16rem;
  background-position: center;
  background-repeat: no-repeat;
}

.layer-on-off {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
}

.layer-on {
  z-index: -1;
}

.layer-off {
  z-index: 9999;
}
</style>
