<template>
<Card>
  <md-card-header>

    <md-avatar class="md-avatar-icon">
      <template v-if="!avatar">
        <md-ripple>{{namesFirstLetter}}</md-ripple>
      </template>
    </md-avatar>

    <div class="md-title author">{{author}}</div>
    <div class="md-subhead">{{date}}</div>

  </md-card-header>

  <md-card-content>{{text}}</md-card-content>
</Card>
  
</template>

<script>
export default {
  name: "Comment",
  props: ["author", "channel", "text", "publishedAt", "avatar"],
  computed: {
    date() {
      return this.publishedAt;
    },
    namesFirstLetter() {
      return this.author.charAt(0).toUpperCase();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@constants/common.scss";

.author {
  @include text-overflow;
}
</style>
