<template>
 <div class="progress">
 <svg
    :height="radius"
    :width="radius"
  >
    <circle
      fill="transparent"
      :stroke-dasharray="circumference + ' ' + circumference"
      :style="{ strokeDashoffset }"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
  </svg>
 </div>
</template>

<script>
  export default {
  name: 'Progress',
  props: {
    radius: Number,
    progress: Number,
    stroke: Number
  },
  data() {
    //const normalizedRadius = this.radius - this.stroke * 2;
    const normalizedRadius = 12;
    const circumference = normalizedRadius * 2 * Math.PI;

    return {
      normalizedRadius,
      circumference,
      percent: 0
    };
  },
  computed: {
  strokeDashoffset() {
    return this._circumference - this.percent / 100 * this._circumference;
  }
}
  }
</script>

<style scoped>

  circle {

          stroke: var(--highlight-color);
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 100%;
    stroke-linecap: round;
        }
</style>