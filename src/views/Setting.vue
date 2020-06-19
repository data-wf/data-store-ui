<template>
  <div style="text-align:center">
    <Input v-model="baseUrl" placeholder="服务地址" style="width:calc(100% - 150px)" />
    <Button type="primary" style="margin:0 5px;" @click="setBase(baseUrl)">确定</Button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      baseUrl: ""
    };
  },
  mounted() {
    this.$store.commit("getBaseUrl");
    this.baseUrl = this.$store.state.baseUrl;
  },
  methods: {
    setBase(url) {
      this.setBaseUrl(url);
      this.$router.push("/");
    },
    ...mapMutations(["setBaseUrl"])
  }
};
</script>

<style>
</style>