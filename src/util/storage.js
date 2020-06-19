/**
 * Created by dujiaheng on 2017/4/13.
 */

function setLocal (key, value) {
  localStorage[key] = JSON.stringify(value)
}

function getLocal (key) {
  if (localStorage[key] !== undefined) { return JSON.parse(localStorage[key]) } else { return undefined }
}

function setSession (key, value) {
  sessionStorage[key] = JSON.stringify(value)
}

function getSession (key) {
  if (sessionStorage[key] !== undefined) { return JSON.parse(sessionStorage[key]) } else { return undefined }
}

export { setLocal, getLocal, setSession, getSession }
