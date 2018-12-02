<template>
  <div>
    <div class="floor">
      <div class="floor-title">{{floorTitle}}</div>
      <div class="floor-anomaly border-bottom">
        <div class="floor-one border-rightbottom ">
          <img :src="floorData0.image" width="100%">
        </div>
        <div>
          <div class="floor-two border-bottom">
            <img :src="floorData1.image" width="100%">
          </div>
          <div class="floor-two">
            <img :src="floorData2.image" width="100%">
          </div>
        </div>
      </div>
      <div class="floor-rule" >
        <div v-for="(item, index) in floorData.slice(3)" 
            :key="index"
            :class="{'border-right': index % 2 === 0}"

        >
          <img :src="item.image" width="100%">
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["floorData", "floorTitle"],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {}
    };
  },
  created() {},
  watch: {
    floorData: function(val) {
      // console.log(this.floorData);
      this.floorData0 = this.floorData[0];
      this.floorData1 = this.floorData[1];
      this.floorData2 = this.floorData[2];
    }
  }
};
</script>

<style scoped>
.floor-title {
  text-align: center;
  line-height: 3;
  font-size: .6rem;
  color: #ED6434;
  font-weight: bold;
}
.floor-anomaly {
  display: flex;
  background-color: #fff;
  /* border-bottom: 1px solid #ddd; */
}
.floor-anomaly>div {
  width: 50%;
}
.floor-one {
  /* border-right: 1px solid #ddd; */
  height: 0;
  padding-bottom: 51.85%;
}
.floor-two {
  /* border-bottom: 1px solid #ddd; */
  height: 0;
  padding-bottom: 51.85%;
}
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}
.floor-rule > div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  /* border-bottom: 1px solid #ddd; */
}

</style>