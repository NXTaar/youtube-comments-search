<template>
  <div class="container">
    <search></search>
    <results v-if="comments.length > 0"></results>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    comments: {
      get() {
        return this.$store.state.comments;
      }
    }
  }
};
</script>

<!-- CSS libraries -->
<!--<style src="normalize.css/normalize.css"></style> -->

<!-- Global CSS -->
<style>
body {
  height: 100%;
  min-width: 720px;
  overflow: scroll;
}
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
