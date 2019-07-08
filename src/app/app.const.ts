export const API = {
    //default: 'http://192.168.100.222:8080/adb-api-data/'
    //default: 'http://200.134.18.55:8080/adb-api-data/'
    default: 'http://agdatabox.md.utfpr.edu.br/apidata/v2/'
}

//AIzaSyC3GsNDa6YcGMgcTw0e4tpSq5mSbC2Qz2s

export function getDefaultURL(resource: string){
    return API.default + resource;
}