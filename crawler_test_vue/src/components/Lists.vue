<template>
  <div id="Lists">
    <div v-if='id'>
      <div v-for="photo in photos" :key="photo.index">
        <div class="list_first">
          <div class="list_second">
            <img class="list_image" :src='photo' alt="photo">
          </div>
        </div>

      </div>
    </div>
    <div v-else>
      <div class="test"
        :style="{ background: `url(https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png)`}"
      ></div>
      <p>div 이미지 연습입니다</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lists',
  props: ['photos', 'id']
}
</script>

<style lang="css">
  .test {
    width: 100px;
    height: 100px;
  }
  #Lists {
    padding-top: 2%;
    position: relative;
  }
  .list_first {
    position: relative;
    width: 25%;
    padding-bottom: 25%;
    float: left;
  }
  .list_second {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: no-repeat center / cover;
  }
  .list_image {
    position: relative;
    margin: auto;
    background-size: cover;
    width: 100%;
    height: 100%;
  }

</style>
