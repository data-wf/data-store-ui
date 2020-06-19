<template>
  <div>
    <h2>当前DB:{{currentDb.name}}</h2>
    <h2>当前Table:{{currentTable.name}}</h2>

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
import { mapState, mapGetters } from "vuex";

export default {
  mounted() {},
  methods: {},
  computed: {
    ...mapState(["tableColumn", "tableData"]),
    ...mapState(["currentDb", "currentTable"]),
    ...mapGetters(["tableData100"])
  },
  data() {
    return {};
  }
};
</script>
