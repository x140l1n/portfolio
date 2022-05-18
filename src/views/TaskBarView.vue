<template>
  <div class="taskbar bg-primary d-flex flex-row-reverse">
    <span class="taskbar-item border border-dark border-end-0 border-top-0 border-bottom-0" style="width: 6px">
    </span>
    <Clock class="taskbar-item" />
  </div>
</template>

<script>
import Clock from "../components/Clock.vue";

export default {
  components: {
    Clock,
  },
};
</script>

<style>
.taskbar {
  height: 3rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 1;
}

.taskbar-item:hover {
  cursor: default;
  background-color: #106379;
}
</style>
