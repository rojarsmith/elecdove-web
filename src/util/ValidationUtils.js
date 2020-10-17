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

    validateRealName(value) {
        let res = true;
        if (value.indexOf('@') !== -1) {
            return false;
        }
        return res;
    }

    validateCompany(value) {
        let res = true;
        if (value.match(/(\@|\%|\{|\})/g)) {
            return false;
        }
        return res;
    }

    validateJob(value) {
        let res = true;
        if (value.match(/(\@|\%|\{|\})/g)) {
            return false;
        }
        return res;
    }

    validatePhone(value) {
        let res = true;
        return res;
    }

    validateAddress(value) {
        let res = true;
        return res;
    }

    validateTaxCode(value) {
        let res = true;
        return res;
    }
}

export default new ValidationUtils();
