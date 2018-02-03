<template>
    <div class="results">
        <Comment v-for="comment in comments" v-bind:key="comment.commentId" v-bind="comment" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['comments'])
    }
}
</script>

<style lang="scss" scoped>
.results {
    margin-top: 16px;
    display: grid;
    grid-template-columns: 560px;
    justify-content: center;
    grid-gap: 8px;
}
</style>

