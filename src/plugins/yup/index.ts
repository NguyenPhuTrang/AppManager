import * as yup from 'yup';
import locale from './locale';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

yup.setLocale(locale);

yup.addMethod(yup.string, 'isEmail', function () {
    return this.test({
        name: 'isEmail',
        message: (data) => {
            return {
                i18nKey: 'yup.string.email',
                params: { ...data, label: data.path },
            };
        },
        test: (value) => (!value ? true : isEmail(value)),
    });
});

yup.addMethod(yup.string, 'isStrongPassword', function () {
    return this.test({
        name: 'isStrongPassword',
        message: (data) => {
            return {
                i18nKey: 'auth.userRegistration.form.password.errorMessage',
                params: { ...data, label: data.path },
            };
        },
        test: (value) =>
            !value
                ? true
                : isStrongPassword(value, {
                      minLength: 10,
                      minLowercase: 1,
                      minNumbers: 1,
                      minSymbols: 1,
                      minUppercase: 1,
                  }),
    });
});

export default yup;
