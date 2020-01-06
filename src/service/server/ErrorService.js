class ErrorService {
    constructor() {}

    // TODO DB 에러 로그 로직 추가
    // TODO 에러 상태 처리 추가 필요

    resError(res, err) {
        console.error(err.message);
        console.error(err.stack)
        res.status(err.status).json({error : err.message})
    }

    resValidationError(res, errors) {
        console.error(errors);
        return res.status(422).json({ errors: errors.array() });
    }

}

export default ErrorService;