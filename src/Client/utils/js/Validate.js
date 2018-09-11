import * as Contants from '../contant/validate_message_contants.js'

export const validateForm = (formID) => {
    let arrInputData = $(`#${formID} input[type="text"],#${formID} input[type="password"],#${formID} input[type="number"]`);
    let isPass = true;
    let index = null;
    arrInputData.each((idx, ele) => {
        let eleVal = $(ele).val().trim();
        if (eleVal === '') {
            if (index === null) {
                index = idx;
            }
            isPass = false;
            $(ele).parent().prev('label').addClass('error-label');
        }
    })
    if (!isPass) {
        arrInputData.eq(index).focus();
    }
    return isPass;
}
export const validateEmail = (e, text) => {
    let email = $(e).val();
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        $(e).parent().prev('label').attr('name', 'warning-label');
        $(e).addClass('warning-label');
        $(e).parent().prev('label').text(Contants.EMAIL_NOT_AVAILABLE);
        return false;
    }
    else {
        $(e).parent().prev('label').text(text);
        $(e).removeClass('warning-label');
        $(e).parent().prev('label').removeAttr('name');
        return true;
    }
}
export const validatePassWord = (e, otherPassWord, text) => {
    let passWord = e.val().trim();
    let passWord2 = otherPassWord.val().trim();
    let passWordLength = passWord.length;
    if (passWordLength < 6 && passWordLength > 0) {
        e.parent().prev('label').attr('name', 'warning-label');
        e.addClass('warning-label');
        e.parent().prev('label').text(Contants.ERROR_6_CHARACTER);
        return false;
    }
    else if (passWord.length > 0 && passWord !== passWord2) {
        e.parent().prev('label').attr('name', 'warning-label');
        e.parent().prev('label').text(text);
        otherPassWord.parent().prev('label').attr('name', 'warning-label');
        e.addClass('warning-label');
        otherPassWord.addClass('warning-label');
        return false;
    }
    else {
        e.parent().prev('label').text(text);
        e.removeClass('warning-label');
        otherPassWord.removeClass('warning-label');
        e.parent().prev('label').removeAttr('name');
        otherPassWord.parent().prev('label').removeAttr('name');
        return true;
    }
}
export const verifyEmailAddress = (target, status) => {
    if (status === 'exist') {
        target.parent().parent().addClass('email-exist')
        target.parent().prev('label').text(Contants.EMAIL_EXISTS);
    }
    else {
        let hasClass = target.parent().parent().hasClass('email-exist')
        if (hasClass) {
            target.parent().parent().removeClass('email-exist')
            target.parent().prev('label').text('Email address')
        }
    }
}