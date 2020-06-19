import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var XLSX = window.XLSX;
import * as server from './server'
import { getLocal, setLocal } from '../util/storage'

export default new Vuex.Store({
  state: {
    baseUrl: '',
    currentDb: {},
    currentTable: {},
    dbs: [],
    tables: [],
    view: 'view',
    tableColumn: [],
    tableData: []
  },
  getters: {
    tableData100: state => {
      return state.tableData.filter((item, index) => index < 100)
    }
  },
  mutations: {
    getBaseUrl(state) {
      let localBase = getLocal('baseUrl')
      if (localBase) {
        state.baseUrl = localBase
      }
    },
    setBaseUrl(state, url) {
      state.baseUrl = url
      setLocal('baseUrl', url)
    },
    setDbs(state, newDbs) {
      state.dbs = newDbs;
    },
    setTables(state, newTables) {
      state.tables = newTables;
    },
    addTable(state, tableName) {
      state.tables.push({
        db: state.currentDb.name,
        name: tableName
      });
    },
    setView(state, view) {
      state.view = view;
      if (view == 'import') {
        state.tableData = []
        state.tableColumn = []
      }
    },
    setCurrentDb(state, db) {
      state.currentDb = db;
    },
    setCurrentTable(state, tb) {
      state.currentTable = tb;
    },
    setTableColumn(state, tableColumn) {
      state.tableColumn = tableColumn
    },
    setTableData(state, tableData) {
      state.tableData = tableData
    },
    resetDb(state) {
      state.currentDb = {}
      state.currentTable = {}
      state.tables = []
      state.view = 'view'
      state.tableColumn = []
      state.tableData = []
    }
  },
  actions: {
    async addDb({ dispatch }, url) {
      await server.addDb(url)
      await dispatch('queryDbs')
    },
    async queryDbs({ commit }) {
      commit('setDbs', await server.queryDbs());
      commit('resetDb')
    },
    async deleteDb({ dispatch }, id) {
      await server.deleteDb(id)
      await dispatch('queryDbs')
    },
    async queryTables({ commit }, id) {
      commit('setTables', await server.queryTables(id));
    },
    async deleteTable({ dispatch, state }, row) {
      await server.deleteTable(row.db, row.name)
      dispatch('queryTables', state.currentDb.id)
    },

    async chooseDb({ commit, dispatch }, db) {
      commit('setCurrentDb', db)
      commit('setCurrentTable', {})
      await dispatch("queryTables", db.id);
    },
    async chooseTable({ commit }, table) {
      commit('setCurrentTable', table)
    },
    async parseCsvFile({ commit }, file) {
      var reader = new FileReader();
      let csvData = await new Promise(resolve => {
        reader.readAsArrayBuffer(file);
        reader.onload = e => {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, { type: "array" });
          let sheet = workbook.Sheets[workbook.SheetNames[0]];
          var roa = XLSX.utils.sheet_to_json(sheet, {
            header: 1
          });
          let result = [];
          if (roa.length) {
            let header = roa[0];
            commit('setTableColumn', header.map(item => {
              return {
                title: item,
                key: item
              }
            }))
            for (let i = 1; i < roa.length; i++) {
              let item = {};
              header.forEach((element, index) => {
                item[element] = roa[i][index];
              });
              result.push(item);
            }
          }
          resolve(result);
        };
      });

      commit('setTableData', csvData)
    },
    async inertData({ state }) {
      await server.inertData(state.currentDb.name, state.currentTable.name, state.tableData)
    },
    async queryTableData({ commit, state }) {
      let data = await server.queryTableData(state.currentDb.name, state.currentTable.name)
      console.log(data[0])
      commit('setTableColumn', Object.keys(data[0]).map(item => {
        return {
          title: item,
          key: item
        }
      }))
      commit('setTableData', data)
    }
  },
  modules: {
  }
})
