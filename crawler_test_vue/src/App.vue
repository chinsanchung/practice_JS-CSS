<template>
  <div id="app">
    <Header
      v-bind:id="id"
      v-on:changeId="changeId"
      v-on:getData="getData"
    ></Header>
    <Lists
      v-bind:photos="photos"
      v-bind:id="id"
    ></Lists>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Lists from "./components/Lists.vue";
import axios from "axios";


export default {
  name: "app",
  components: {
    Header,
    Lists
  },
  data: () => {
    return {
      photos: [],
      id: "",
    }
  },
  methods: {
    getData: function() {
      fetch(`https://www.instagram.com/${this.id}/`)
        .then(res => res.text())
        .then(raw_html => {
          const firstArray = raw_html.match(/https:\/\/scontent.+?\.jpg/g).slice(3);
          const secondArray = [];
          for(let i = 0; i < firstArray.length; i++) {
            if(i % 7 === 0) {
              secondArray.push(firstArray[i])
            }
          }
          this.photos = secondArray;
        })
    },
    changeId: function(payload) {
      this.id = payload;
      this.photos = [];
    }
  },
  computed: {

  }
}

</script>

<style>
#app {
  position: relative;
  text-align: center;
  width: 80%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
