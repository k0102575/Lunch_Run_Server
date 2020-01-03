class ServerService {
    constructor() {
    }

    // TODO req path 파라미터 체크 함수 필요

    response(res, resultCode, data){
        // const result = {};

        // data.forEach((it) => { Object.assign(result, it); });

        res.status(resultCode).json(data);
    }

}

export default ServerService;

