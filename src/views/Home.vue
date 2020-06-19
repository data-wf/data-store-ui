<template>
  <div class="panel">
    <Split v-model="split" min="560" class="demo-split">
      <div slot="left" class="demo-split-pane no-padding">
        <db-table style="height:100%"></db-table>
      </div>
      <div slot="right" class="demo-split-pane">
        <db-data-import v-if="view=='import'"></db-data-import>
        <db-data-view v-if="view=='view'"></db-data-view>
      </div>
    </Split>
  </div>
</template>

<style scoped>
.demo-split {
  height: 100%;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  height: 100%;
  padding: 10px;
  overflow: auto;
}
.panel {
  text-align: left;
}
</style>

<script>
import DbTable from "../components/DBTable";
import DbDataImport from "../components/DBDataImport";
import DbDataView from "../components/DBDataView";

import { mapState } from "vuex";

export default {
  name: "Home",
  components: { DbTable, DbDataImport, DbDataView },
  mounted() {},
  methods: {},
  computed: {
    ...mapState(["view"])
  },

  data() {
    return {
      split: 0.3
    };
  }
};
</script>
