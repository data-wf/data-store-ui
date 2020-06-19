import { getAjax } from '../util/ajax'

async function addDb(url) {
    let http = await getAjax()
    return http.post("/db", {
        url: url
    }).then(res => {
        return res.data;
    });
}

async function queryDbs() {
    let http = await getAjax()
    return http.get("/db").then(res => {
        return res.data;
    });
}

async function queryTables(dbId) {
    let http = await getAjax()
    return http.get("/db/" + dbId).then(res => {
        return res.data
    });
}

async function deleteDb(dbId) {
    let http = await getAjax()
    return http.delete("/db/" + dbId).then(res => {
        return res.data;
    });
}

async function deleteTable(dbId, tableName) {
    let http = await getAjax()
    return http.delete(`/db/${dbId}/table/${tableName}`).then(res => {
        return res.data;
    });
}

async function inertData(db, table, rows) {
    let http = await getAjax()
    return http.post(`/db/${db}/table/${table}/data`, rows).then(res => {
        return res.data
    });
}

async function queryTableData(db, table) {
    let http = await getAjax()
    return http.get(`/db/${db}/table/${table}/data`).then(res => {
        return res.data
    });
}

export { addDb, queryDbs, deleteDb, queryTables, deleteTable, inertData, queryTableData }