<template>
  <div ref="window" class="window bg-light" :style="cssRootVars">
    <div class="window-tilebar bg-primary text-light d-flex flex-row-reverse">
      <span class="align-self-start">{{ title }}</span>
      <span class="tilebar-item" title="Cerrar ventana">
        <i class="fa-solid fa-xmark fa-fw"></i>
      </span>
      <span
        class="tilebar-item"
        :title="`${
          isMaximized ? 'Minimizar tamaño ventana' : 'Maximizar tamaño ventana'
        }`"
        @click="toggleMaximized"
      >
        <i :class="`fa-solid ${isMaximized ? 'fa-compress' : 'fa-expand'}`"></i>
      </span>
      <span class="tilebar-item" title="Minimizar ventana">
        <i class="fa-solid fa-minus fa-fw"></i>
      </span>
    </div>
    <div class="window-content bg-light">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: this.width,
        height: this.height,
      },
      positionPrev: {
        x: 0,
        y: 0,
      },
      sizePrev: {
        width: this.width,
        height: this.height,
      },
      isMaximized: true,
    };
  },
  methods: {
    toggleMaximized() {
      this.isMaximized = !this.isMaximized;
    },
  },
  computed: {
    cssRootVars() {
      return {
        "--width": this.size.width + "px",
        "--height": this.size.height + "px",
        "--x": this.position.x + "px",
        "--y": this.position.y + "px",
        "--heightTileBar": "32px",
      };
    },
  },
  watch: {
    isMaximized(newValue) {
      if (newValue) {
        this.sizePrev = this.size;
        this.positionPrev = this.position;

        this.size.width = "100px";
        this.size.height = "100px";

        this.position.x = 0;
        this.position.y = 0;
      } else {
        this.size = this.sizePrev;
        this.position = this.positionPrev;
      }
    },
  },
};
</script>

<style scoped>
.window {
  position: relative;
  width: var(--width);
  height: var(--height);
  left: var(--x);
  top: var(--y);
  min-width: 170px;
  min-height: var(--heightTileBar);
}

.tilebar-item {
  width: 50px;
  display: flex;
}

.tilebar-item > i {
  font-size: 0.9rem;
  margin: auto;
}

.tilebar-item:hover {
  cursor: default;
  background-color: #106379;
}

.tilebar-item:nth-child(1):hover {
  cursor: default;
  background-color: red;
}

.window-content {
  padding-top: var(--heightTileBar);
  height: 100%;
}

.window-tilebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--heightTileBar);
}
</style>
