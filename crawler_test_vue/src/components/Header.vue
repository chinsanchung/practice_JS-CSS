<template>
  <div id="Header">
    <img src="../assets/icon.png" alt="instagram" class="App-logo" />
    <div class="search_field">
      <input type="text" :value="id" @change="headerChangeId">
      <button type="submit" @click="getData">⌕</button>
    </div>
  </div>
</template>

<script>
import logo from "../assets/icon.png";

export default {
  name: "Header",
  props: ["id"],
  methods: {
    headerChangeId: function (e) {
      this.$emit("changeId", e.target.value)
    },
    getData() {
      this.$emit("getData");
    }
  }
}
</script>

<style lang="css">
  #Header {
    top: 50px;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 2px solid grey;
    vertical-align: middle;
    padding-bottom: 5px;
  }
  .App-logo {
    width: 40px;
    height: 40px;
    padding-right: 10px;
    vertical-align: middle;
  }
  .search_field {
    display: inline-block;
    vertical-align: middle;
  }
</style>
