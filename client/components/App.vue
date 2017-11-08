<template>
  <div class="container">
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
  </div>
</template>

<script>
import request from "superagent";
import { encodeGET } from "@utils/query";
import { openConnection } from "@modules/pulse";

export default {
  name: "app",
  methods: {
    async submit() {
      let { videoId, searchString } = this.$store.state;

      let validation = {
        [videoId.length === 0]: "videoId",
        [searchString.length === 0 || searchString.length < 3]: "searchString"
      };

      if (typeof validation[true] === "string") return;

      let query = encodeGET({ q: searchString, vId: videoId });
      let searchRequest = await request(`search?${query}`);
      if (searchRequest.body.clientId) {
        openConnection({ clientId: searchRequest.body.clientId, store: this.$store})
      }
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

<!-- CSS libraries -->
<!--<style src="normalize.css/normalize.css"></style> -->

<!-- Global CSS -->
<style>
body {
  height: 100%;
  min-width: 720px;
}
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
