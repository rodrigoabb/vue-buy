<template>
  <div class="spinner-base" :class="`spinner-base spinner-${spinnerTypeValue}`" />
</template>

<script>
const SPINNER_TYPES_NUMBER = 3;

export default {
  name: 'LoadingSpinner',
  props: {
    spinnerType: {
      type: Number,
      required: false,
      default: 1,
      validator: value => value > 0 && value <= SPINNER_TYPES_NUMBER,
    },
  },
  computed: {
    spinnerTypeValue() {
      if (this.spinnerType < 1 || this.spinnerType > 3) {
        return 1;
      }
      return this.spinnerType;
    },
  },
};

</script>

<style lang="scss" scoped>

/* Basic Spinner */
.spinner-base:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -40px;
  margin-left: -40px;
  border-radius: 50%;
}

/* Spinner 1 */
.spinner-1:before {
  border: 3px solid #D3D3D3;
  border-top-color: orange;
  animation: spinner 0.7s linear infinite;
}

/* Spinner 2 */
.spinner-2:before {
  border: 2px solid transparent;
  border-top-color: orange;;
  border-bottom-color: orange;;
  animation: spinner 0.7s ease infinite;
}

/* Spinner 3 */
.spinner-3:before {
  border-top: 2px solid orange;;
  border-right: 2px solid transparent;
  animation: spinner 0.7s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

</style>
