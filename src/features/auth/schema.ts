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
    .matches(FORM_VALIDATION.passwordForm, 'Mật khẩu không đúng định dạng')

export const loginWithPasswordSchema = yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
});

const nameSchema = yup
    .string()
    .required('Tên người dùng là bắt buộc')
    .max(FORM_VALIDATION.textMaxLength, 'Tên người dùng không được vượt quá 255 ký tự')
    .min(FORM_VALIDATION.textMinLength, 'Tên người dùng nhiều hơn 3 ký tự')
    .matches(FORM_VALIDATION.name, 'Tên người dùng sai định dạng');
const numberPhoneSchema = yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .max(FORM_VALIDATION.maxNumberPhone, 'Số điện thoại không được nhiều hơn 10 số')
    .min(FORM_VALIDATION.minNumberPhone, 'Số điện thoại không được ít hơn 10 số')
    .matches(FORM_VALIDATION.phoneRegExp, 'Số điện thoại sai định dạng')

const avatarUrlSchema = yup
    .string()
    .required('Link avatar là bắt buộc')
    .matches(Regex.URL, 'Link avatar sai định dạng')
    const birthdaySchema = yup
    .string()
    .required('Ngày sinh là bắt buộc')
    .matches(FORM_VALIDATION.dateForm, 'Ngày sinh sai định dạng')
const roleSchema = yup
    .string();

export const registerSchema = yup.object().shape({
    name: nameSchema,
    email: emailSchema,
    birthday: birthdaySchema,
    numberPhone: numberPhoneSchema,
    avatarUrl: avatarUrlSchema,
    role: roleSchema,
    password: passwordSchema,
})
