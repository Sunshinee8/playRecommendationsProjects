export enum RESULT_CODE {
    SUCCESS = 200,
    SERVER_ERROE = 500,
    // 客户端格式错误
    BAD_REQUEST = 400
}


export type ResponseDate = {
    code?: RESULT_CODE,
    message?: string ,
    result?: any
}



export function createResult({code = RESULT_CODE.SUCCESS, message = "", result = {}}: ResponseDate){

    return {
        code,
        message,
        result
    }

}
