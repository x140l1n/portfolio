<script>
import ScreenView from "./ScreenView.vue";

export default {
  components: {
    ScreenView,
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      isMonitorOn: true,
    };
  },
  watch: {
    isMonitorOn() {
      this.$refs.screenView.toggleScreen();
    },
  },
  methods: {
    init() {},
  },
};
</script>

<template>
  <main class="container-fluid bg-dark vh-100 d-flex">
    <div class="card monitor m-auto">
      <div class="card-body monitor-inner">
        <ScreenView ref="screenView" />
      </div>
      <div
        class="card-footer border-0 bg-transparent d-flex flex-row-reverse justify-content-between"
      >
        <span
          role="button"
          :class="`rounded-circle btn-on-off d-flex ${
            !isMonitorOn ? 'btn-on' : 'btn-off'
          }`"
          @click="isMonitorOn = !isMonitorOn"
        >
          <i class="fa-solid fa-power-off fa-fw m-auto"></i>
        </span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.monitor {
  width: 100%;
  height: 100%;
  max-width: 84em;
  max-height: 52em;
  padding: 0.8em;
}

.btn-on-off {
  width: 50px;
  height: 50px;
  background-color: #000;
}

.btn-on-off:focus {
  outline: none;
  color: inherit;
}

.btn-on {
  color: rgb(23, 210, 23);
  border: 2px rgb(23, 210, 23) solid;
}

.btn-off {
  color: rgb(210, 23, 23);
  border: 2px rgb(210, 23, 23) solid;
}
</style>
