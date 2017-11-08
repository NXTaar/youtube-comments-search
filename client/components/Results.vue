<template>
  <md-card class="comments-list">
      <md-list class="md-double-line">
        <md-list-item v-for="comment in comments" :key="comment.commentId">
            <div class="md-list-text-container content">
                <span class="user">
                    <a v-bind:href="comment.channel" target="_blanc">{{ comment.author }}</a>
                </span>
                <span class="comment">{{ comment.text }}</span>
            </div>
        </md-list-item>
      </md-list>
    </md-card>
</template>

<script>
export default {
  computed: {
    comments: {
      get() {
        return this.$store.state.comments;
      }
    }
  }
};
</script>

<style scoped>
.md-list-text-container > * {
  color: rgb(17, 17, 17);
  white-space: pre-line;
  overflow: auto;
}
.comments-list {
  min-width: 500px;
  max-width: 50%;
}
.comment {
    font-size: 12px;
}
</style>
