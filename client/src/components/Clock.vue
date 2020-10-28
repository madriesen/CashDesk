<template>
  <div id="clock" class="font-mono">{{ date }}</div>
</template>

<script>
export default {
  name: "clock",
  data: function() {
    return {
      date: ""
    };
  },
  methods: {
    time() {
      const self = this;
      const now = new Date();
      const hours = this.getTwoDigits(now.getHours());
      const minutes = this.getTwoDigits(now.getMinutes());
      const seconds = this.getTwoDigits(now.getSeconds());
      this.date = `${hours}:${minutes}:${seconds}`;
      setTimeout(self.time, 1000);
    },
    getTwoDigits(value) {
      return (value < 10 ? "0" : "") + value;
    }
  },
  mounted: function() {
    this.time();
  }
};
</script>
