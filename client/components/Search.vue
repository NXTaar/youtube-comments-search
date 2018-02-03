<template>
    <Card>
        <md-steppers md-linear md-alternative :md-active-step.sync="active">
            <md-step id="first" md-label="Search phrase" :md-done="!cannotContinue">
                <div class="step">
                    <div class="step-input">
                        <md-field md-clearable>
                            <label>Enter phrase (3 symbols minimum)</label>
                            <md-input v-model.trim="phrase" />
                        </md-field>
                    </div>

                    <div class="step-button">
                        <md-button class="md-dense md-lala" @click="handleContinueClick" :disabled="cannotContinue">
                            Continue
                        </md-button>
                    </div>
                </div>
            </md-step>

            <md-step id="second" md-label="Youtube video">
                <div class="step">
                    <div class="step-input">
                        <md-field md-clearable>
                            <label>Paste here link to Youtube video</label>
                            <md-input v-model="link" />
                        </md-field>
                    </div>

                    <div class="step-button">
                        <md-button class="md-dense" @click="sendQuery({ phrase, link })">Search</md-button>
                    </div>
                </div>

            </md-step>

        </md-steppers>

    </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        active: 'first',
        first: false,
        link: 'https://www.youtube.com/watch?v=3A6qjsIvbKs',
        phrase: 'хлывнюк'
    }),
    computed: {
        cannotContinue() {
            return this.phrase.length < 3
        }
    },
    methods: {
        handleContinueClick() {
            this.active = 'second'
        },
        ...mapActions(['sendQuery'])
    }
}
</script>

<style lang="scss" scoped>
@import '~@constants/common.scss';

.step {
    display: flex;
    // flex-direction: column;
    justify-content: center;

    &-input {
        width: 416px;
    }

    &-button {
        width: 100px;
        display: flex;
        align-items: center;
    }
}
</style>
