export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ""
    }
}

export function isValueValid(value, validation = null) {
    if (!validation) return true;

    let isValid = true;

    if (validation.required)
        isValid = value.trim() !== "" && isValid;

    if (validation.email)
        isValid = isValidEmail(value) && isValid;

    if (validation.minLength)
        isValid = value.trim().length >= validation.minLength && isValid;

    return isValid;
}

export function isFromValid(formControls) {
    let isFormValid = true;

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control))
            isFormValid = formControls[control].valid && isFormValid;
    }

    return isFormValid;
}

export function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
