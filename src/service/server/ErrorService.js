class ErrorService {
    constructor() {
    }

    // TODO DB 에러 로그 로직 추가

    resError(res, status, err) {
        console.error(err.message);
        res.status(status).json({message : err.message})
    }

    resValidationError(res, errors) {
        console.error(errors);
        return res.status(422).json({ errors: errors.array() });
    }

}

export default ErrorService;