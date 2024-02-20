import { Regex } from "../common/constants";
import { FORM_VALIDATION } from "../common/constants";
import yup from "../plugins/yup";

const nameSchema = yup
    .string()
    .required('Tên người dùng là bắt buộc')
    .max(FORM_VALIDATION.textMaxLength, 'Tên người dùng không được vượt quá 255 ký tự')
    .min(FORM_VALIDATION.textMinLength, 'Tên người dùng nhiều hơn 3 ký tự')
    .matches(FORM_VALIDATION.nameRegExp, 'Tên người dùng sai định dạng');
    
const emailSchema = yup
    .string()
    .required('Email không được để trống')
    .matches(Regex.EMAIL, 'Email sai định dạng')
    
const birthdaySchema = yup
    .string()
    .required('Ngày sinh là bắt buộc')
    // .matches(Regex.TIME, 'Ngày sinh sai định dạng')

const numberPhoneSchema = yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .max(FORM_VALIDATION.maxNumberPhone, 'Số điện thoại không được nhiều hơn 10 số')
    .matches(FORM_VALIDATION.phoneRegExp, 'Số điện thoại sai định dạng')

const avatarUrlSchema = yup
    .string()
    .required('Link avatar là bắt buộc')
    .matches(Regex.URL, 'Link avatar sai định dạng')

export const userSchema = yup.object().shape({
    name: nameSchema,
    email: emailSchema,
    birthday: birthdaySchema,
    numberPhone: numberPhoneSchema,
    avatarUrl: avatarUrlSchema
})