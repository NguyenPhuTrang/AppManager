import { Regex } from "../../common/constants";
import { FORM_VALIDATION } from "../../common/constants";
import yup from "../../plugins/yup";

const emailSchema = yup
    .string()
    .required("Email là trường bắt buộc")
    .matches(Regex.EMAIL, 'Email không đúng định dạng')

const passwordSchema = yup
    .string()
    .required("Mật khẩu là trường bắt buộc")
    .min(FORM_VALIDATION.passwordMinLength, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(FORM_VALIDATION.passwordMaxLength, 'Mật khẩu không được quá 20 ký tự')
    .matches(FORM_VALIDATION.passwordForm, 'Password phải có ít nhất 1 chữ thường, 1 chữ hoa và 1 số')

export const loginWithPasswordSchema = yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
});

