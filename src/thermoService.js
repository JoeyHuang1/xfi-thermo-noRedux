import Cookies from "js-cookie"
import ComcastConst from './ComcastConst.js'


async function setThermo (seedId, value){
    let accessCookie = Cookies.get('accessToken')
    let myInit = { method: 'PUT',
      body:JSON.stringify({attribSet:[{temperature:value}]}),
      headers: {...ComcastConst.comcast_headers, 'Authorization': 'Bearer '+accessCookie}}
    let updateURL = ComcastConst.seedsURL+'/'+seedId+'/controls'

    let good = false
    try {
      let response = await fetch(updateURL,myInit);
      if (response.status===200)
        return Promise.resolve(response)
    } catch(e) {
      console.log(new Error(e))
    }
    return Promise.reject()
}

export default setThermo
