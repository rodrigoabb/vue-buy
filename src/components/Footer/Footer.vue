<template>
  <div class="footer-container">
    <footer class="container">
      <div class="footer__mark">
        <span>&copy; Vue-Buy {{ currentYear }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss">

/* ==========================================================================
   Footer
   ========================================================================== */

.footer-container {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
  padding: 0;
  z-index: 999;
  position: relative;
  bottom: 0; /* Position the navbar at the bottom of the page */
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #dce4e6;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  padding-left: 5px;
  padding-right: 50px;
  max-width: 1240px;
  margin: auto;
  overflow: hidden;
}

.footer__mark {
  margin: 0 auto;
  font-size: 0.9rem;
}

.footer__sidenote {
  font-family: sans-serif;
  letter-spacing: 1.37px;
}
</style>
