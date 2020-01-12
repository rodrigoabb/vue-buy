<template>
  <div class="spinner-base" :class="`spinner-base spinner-${spinnerTypeValue}`" />
</template>

<script>
const SPINNER_TYPES_NUMBER = 3;

/**
  * @module Utils/LoadingSpinner
  * @desc Product Item component
  * @vue-prop {Number} [spinnerType=1] spinnerType - Determines desired type of spinner to be rendered
  * @vue-computed {String} spinnerTypeValue - Returns a valid type of spinner, depending on spinnerType value and available spinner types. Used as a class suffix
*/

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

@import "@/utilities/variables";

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
  border-top-color: $c-primary-accent;
  animation: spinner 0.7s linear infinite;
}

/* Spinner 2 */
.spinner-2:before {
  border: 2px solid transparent;
  border-top-color: $c-primary-accent;;
  border-bottom-color: $c-primary-accent;;
  animation: spinner 0.7s ease infinite;
}

/* Spinner 3 */
.spinner-3:before {
  border-top: 2px solid $c-primary-accent;;
  border-right: 2px solid transparent;
  animation: spinner 0.7s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

  @media (min-width: $phone-upper-boundary) {
    .spinner-base:before {
      width: 120px;
      height: 120px;
      margin-top: -60px;
      margin-left: -60px;
    }
  }

  @media (min-width: $tablet-landscape-upper-boundary) {
   .spinner-base:before {
      width: 150px;
      height: 150px;
      margin-top: -90px;
      margin-left: -90px;
    }
  }


</style>
