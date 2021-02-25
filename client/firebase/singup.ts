import {auth} from "./connection";

export const userVerify = ({phoneNumber}) => {
    const  appVerifier = window.recaptchaVerifier;
    return auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
           console.log(confirmationResult)
        }).catch((error) => {
            // Error; SMS not sent
            // ...
        });

};
