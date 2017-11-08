<template>
  <md-card class="search-form">
      <md-card-header>
        <div class="md-title">Youtube Comment Search</div>
        <div class="md-subhead">Enter video id and search string and get results</div>
      </md-card-header>

      <md-card-content>
      
        <div>
           <md-input-container class="md-warn">
             <label>What phrase are you looking?</label>
             <md-input v-model="searchString"></md-input>
           </md-input-container>
        </div>
      
      </md-card-content>

      <md-card-actions class="actions">

        <md-input-container class="video-id">
             <label>Video ID</label>
             <md-input v-model="videoId"></md-input>
        </md-input-container>
        
        <md-button v-on:click="submit" class="search-btn md-raised md-primary">Search!</md-button>
      
      </md-card-actions>
    </md-card>
</template>

<script>
export default {
  name: "search",
  methods: {
    submit() {
        this.$store.dispatch('SEND_SEARCH_REQUEST')
    }
  },
  computed: {
    searchString: {
      get() {
        return this.$store.state.searchString;
      },
      set(value) {
        this.$store.commit("handleInput", { input: "searchString", value });
      }
    },
    videoId: {
      get() {
        return this.$store.state.videoId;
      },
      set(value) {
        this.$store.commit("handleInput", { input: "videoId", value });
      }
    }
  }
};
</script>

<style scoped>
.actions {
  justify-content: space-between;
  padding: 8px 16px;
}
.video-id {
  width: 320px;
}
.search-form {
  top: -50px;
  min-width: 540px;
  max-width: 50%;
}
.search-btn {
  margin-right: 30px;
}
</style>
