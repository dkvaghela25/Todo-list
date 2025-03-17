const { ValidationErrorCode, RequestInputErrorCode , AuthenticationErrorCode } = require("./constants");

class ValidationError extends Error { 
    constructor(message, code = ValidationErrorCode) {
        super(message);
        this.error_code = code;
        this.response_data = {
            success: false,
            validation_error: true,
            message: message
        };
    }
}

class RequestInputError extends Error { 
    constructor(message, code = RequestInputErrorCode) {
        super(message);
        this.error_code = code;
        this.response_data = {
            success: false,
            error: true , 
            message : message
        };
    }
}

class AuthenticationError extends Error { 
    constructor(message, code = AuthenticationErrorCode) {
        super(message);
        this.error_code = code;
        this.response_data = {
            success: false,
            authentication_error: true , 
            message : message
        };
    }
}

module.exports = {
    ValidationError,
    RequestInputError,
    AuthenticationError
};
