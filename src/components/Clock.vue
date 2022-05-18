<template>
  <div :title="moment_es().format('dddd, MMM YYYY')" class="clock text-light px-2">
    <span>
        {{ datetime.time }}
    </span>
    <span>
        {{ datetime.date }}
    </span>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/es";

export default {
  mounted() {
    this.init();
  },
  data() {
    return {
      datetime: {
        time: this.moment_es().format("HH:mm:ss"),
        date: this.moment_es().format("DD-MM-YYYY"),
      },
    };
  },
  methods: {
    moment_es() {
      return moment().locale("es");
    },
    init() {
      setInterval(() => {
        this.datetime.time = this.moment_es().format("HH:mm:ss");
        this.datetime.date = this.moment_es().format("DD-MM-YYYY");
      }, 1000);
    }
  }
};
</script>

<style scoped>
.clock {
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
</style>
