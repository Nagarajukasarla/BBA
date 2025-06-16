export const onPressedEnterNameField = (event, { emailField }) => {
    if (event.keyCode === 13) {
        emailField.focus();
    }
}

export const onPressedEnterEmailField = (event, { phoneField }) => {
    if (event.keyCode === 13) {
        phoneField.focus();
    }
}

export const onPressedEnterPhoneField = (event, { blockNumberField }) => {
    if (event.keyCode === 13) {
        blockNumberField.focus();
    }
}

export const onPressedEnterBlockNumberField = (event, { streetField }) => {
    if (event.keyCode === 13) {
        streetField.focus();
    }
}

export const onPressedEnterStreetField = (event, { cityField }) => {
    if (event.keyCode === 13) {
        cityField.focus();
    }
}

export const onPressedEnterCityField = (event, { stateField }) => {
    if (event.keyCode === 13) {
        stateField.focus();
    }
}

export const onPressedEnterStateField = (event, { zipcodeField }) => {
    if (event.keyCode === 13) {
        zipcodeField.focus();
    }
}
