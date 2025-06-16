class APIResponse {
    constructor(code, data) {
        this.code = code;
        this.data = data;
        this.type = "";
        this.description = "";

        switch(code) {
            case APIResponse.SUCCESS:
            case APIResponse.CREATED:
                this.setSuccessResponse();
                break;
            case APIResponse.NOT_FOUND:
                this.setNotFoundResponse();
                break;
            case APIResponse.INTERNAL_SERVER_ERROR:
                this.setInternalServerErrorResponse();
                break;
            case APIResponse.NETWORK_ERROR:
                this.setNetworkError();
                break;
            default:
                this.setUnknownErrorResponse();
                break;
        }
    }

    static NETWORK_ERROR = -1;

    static SUCCESS = 200;
    static CREATED = 201;
    static PARTIAL_CONTENT = 206;

    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static REQUEST_TIMEOUT = 408;
    static CONFLICT = 409;
    static INTERNAL_SERVER_ERROR = 500;

    setNotFoundResponse() {
        this.type = 'Not Found';
        this.description = "The endpoint you're requesting is not available";
        this.data = null;
    }

    setSuccessResponse() {
        this.type = "Success";
        this.description = "Request was successful";
    }

    setInternalServerErrorResponse() {
        this.type = "Internal Server Error";
        this.description = "The server encountered an unexpected condition";
        this.data = null;
    }

    setNetworkError() {
        this.type = "Network Error";
        this.code = -1;
        this.description = "Network error or request was blocked";
    }

    setUnknownErrorResponse() {
        this.type = "Unknown";
        this.description = "Unknown error occurred";
        this.data = null;
    }
}

export default APIResponse;