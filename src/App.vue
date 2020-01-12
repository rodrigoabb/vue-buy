<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">

@import "@/utilities/variables";

/* ==========================================================================
   Main Styles
   ========================================================================== */

html {
    height: 100%;
}

body {
  min-height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  font-family: 'Lato-Regular', sans-serif;
  font-size: 13px;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;  /* Font smoothing tweaks for MacOSx in Gecko */
  -webkit-font-smoothing: antialiased;
  color: #444A59;
  background-color: #f8f8f8;
}

* {
  box-sizing: border-box;
}

h1, p, figure {
  margin: 0;
  font-weight: normal;
}

a,
a:hover,
a:visited{
  text-decoration: none;
  color: #444A59;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

button {
  appearance: none;
  border: 0;
}

.button:focus {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

header,
footer {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

main {
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  margin: 30px 0 20px;
}

.container {
  width: 100%;
  height: 100%;
  // position: absolute;
  max-width: 1240px;
  padding: 30px 40px;
  margin: 0 auto;
}

.error {
  color: red;
}

/* ==========================================================================
   Buttons
   ========================================================================== */

.icon {
  width: 20px;
  height: 20px;
  fill: #d9d9d9;
  transition: .3s fill;
}

.button {
  border: 1px solid #d9d9d9;
  border-radius: 100px;
  background-color: #ffffff;
  cursor: pointer;
  transition: .3s border, .3s color, .3s background-color;
}

/* ==========================================================================
   Media Queries
   ========================================================================== */
  @media (max-width: $phone-upper-boundary - 1) {
    .container {
      padding: 30px 10px;
    }
  }

</style>
