<template>
  <Split v-model="split" mode="vertical">
    <div slot="top" class="demo-split-pane">
      <Input v-model="model.url" placeholder="数据库连接" style="width:calc(100% - 150px)" />
      <Button type="primary" style="margin:0 5px;" @click="addDb(model.url)">添加DB</Button>
      <Table border :columns="dbColumns" :data="dbs">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="chooseDb(row)">查看表</Button>
          <Button type="primary" size="small" style="margin-right: 5px" @click="deleteDb(row)">删除</Button>
        </template>
      </Table>
    </div>
    <div slot="bottom" class="demo-split-pane">
      <Input v-model="model.tableName" placeholder="表名" style="width:calc(100% - 150px)" />
      <Button type="primary" style="margin:0 5px;" @click="addTable(model.tableName)">添加Table</Button>
      <Table border :columns="tbColumns" :data="tables">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="actionTable(row,'view')"
          >查看数据</Button>
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="actionTable(row,'import')"
          >导入数据</Button>
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="deleteTable(row)"
          >删除表</Button>
        </template>
      </Table>
    </div>
  </Split>
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
</style>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  mounted() {
    this.$store.dispatch("queryDbs");
  },
  methods: {
    ...mapActions([
      "addDb",
      "deleteDb",
      "queryTables",
      "deleteTable",
      "chooseDb",
      "chooseTable",
      "queryTableData"
    ]),
    ...mapMutations(["addTable", "setView"]),
    actionTable(rows, view) {
      this.setView(view);
      this.chooseTable(rows);
      if (view == "view") {
        this.queryTableData();
      }
    }
  },

  computed: mapState(["dbs", "tables"]),

  data() {
    return {
      split: 0.3,
      model: {
        url: "",
        tableName: ""
      },
      dbColumns: [
        {
          title: "id",
          key: "id",
          width: 50
        },
        {
          title: "类型",
          key: "type",
          width: 80
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "链接",
          key: "url"
        },
        {
          title: "Action",
          fixed: "right",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      tbColumns: [
        {
          title: "数据库名",
          key: "db"
        },
        {
          title: "表名",
          key: "name"
        },
        {
          title: "数量",
          key: "count",
          width: 80
        },
        {
          title: "列",
          key: "columns"
        },
        {
          title: "Action",
          fixed: "right",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  }
};
</script>
