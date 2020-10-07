class ValidationUtils {
    validateUsername(value) {
        const re = /^[a-zA-Z\d]\w{3,19}[a-zA-Z\d]$/;
        return re.test(value);
    }

    validateEmail(value) {
        const re = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        return re.test(value);
    }

    validatePassword(value) {
        const re = /^([^\s]){8,16}$/;
        console.log("validatePassword=" + re.test(value));
        return re.test(value);
    }

    validateCaptcha(value, captcha) {
        return value.toUpperCase() !== captcha.toUpperCase();
    }
}

export default new ValidationUtils();
