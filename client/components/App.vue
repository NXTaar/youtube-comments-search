<template>
    <div class="layout">
        <Search/>
        <Results />
    </div>
</template>

<style lang="scss">
@import '~@constants/normalize.css';
@import '~vue-material/dist/vue-material.css';
@import '~@constants/common.scss';

html,
body {
    min-width: 720px;
}

body {
    background-color: $color-alizarin-crimson;
}
</style>

<style scoped lang='scss'>
.layout {
    display: flex;
    flex-direction: column;
    padding: 20px;
}
</style>
