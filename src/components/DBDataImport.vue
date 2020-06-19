<template>
  <div>
    <h2>当前DB:{{currentDb.name}}</h2>
    <h2>当前Table:{{currentTable.name}}</h2>
    <Button type="primary" size="small" style="margin-right: 5px" @click="inertData">导入数据</Button>

    <Upload :before-upload="handleUpload" action="posts/">
      <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
    </Upload>
    <div v-if="file !== null">
      Upload file: {{ file.name }}
      <Button
        type="text"
        @click="parse"
        :loading="loadingStatus"
      >{{ loadingStatus ? 'Uploading' : '解析' }}</Button>
    </div>

    <Table border :columns="tableColumn" :data="tableData100">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
    </Table>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  mounted() {},
  methods: {
    ...mapActions(["inertData"]),
    ...mapActions(["parseCsvFile"]),
    handleUpload(file) {
      this.file = file;
      return false;
    },
    async parse() {
      this.loadingStatus = true;
      await this.parseCsvFile(this.file);
      console.log(this.tableData);
      this.loadingStatus = false;
      this.$Message.success("Success");
    }
  },
  computed: {
    ...mapState(["tableColumn", "tableData"]),
    ...mapState(["currentDb", "currentTable"]),
    ...mapGetters(["tableData100"])
  },
  data() {
    return {
      file: null,
      loadingStatus: false
    };
  }
};
</script>
