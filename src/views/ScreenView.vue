<template>
  <div class="screen bg-dark bg-image">
    <div
      :class="`layer-on-off ${
        !isFirstTime ? (isMonitorOn ? 'layer-on' : 'layer-off') : ''
      }`"
    ></div>
    <div ref="screenContent" class="screen-content"></div>
    <TaskBarView ref="taskBarView" />
  </div>
</template>

<script>
import TaskBarView from "./TaskBarView.vue";
import Window from "../components/Window.vue";

export default {
  components: {
    TaskBarView,
    Window,
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      isMonitorOn: false,
      isFirstTime: true,
    };
  },
  methods: {
    init() {
      this.addWindow("Window 1");
    },
    toggleScreen() {
      if (this.isFirstTime) this.isFirstTime = false;

      this.isMonitorOn = !this.isMonitorOn;
    },
    addWindow(title, _width = 0, _height = 0) {
      const WindowClass = Vue.extend(Window);
      const windowInstance = new WindowClass({
        propsData: {
          title: title,
          width: _width == 0 ? this.getWidthScreenContent() : _width,
          height: _height == 0 ? this.getHeightScreenContent() : _height,
        },
      });
      windowInstance.$mount();

      this.$refs.screenContent.appendChild(windowInstance.$el);
    },
  },
  computed: {
    getWidthScreenContent() {
      return this.$refs.screenContent.offsetWidth;
    },
    getHeightScreenContent() {
      return this.$refs.screenContent.offsetHeight;
    },
  },
};
</script>

<style scoped>
.screen {
  width: 100%;
  height: 100%;
  position: relative;
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
  z-index: 2;
}

.screen-content {
  padding-bottom: 3rem;
  height: 100%;
}

.layer-on {
  animation: on forwards 0.2s ease-in;
}

@keyframes on {
  0% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0);
  }
}

@keyframes off {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}

.layer-off {
  animation: off forwards 0.2s ease-in;
}
</style>
