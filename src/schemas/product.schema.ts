import { Regex } from "../common/constants";
import { FORM_VALIDATION } from "../common/constants";
import yup from "../plugins/yup";

const nameSchema = yup
    .string()
    .required('Tên sản phẩm là bắt buộc')
    .max(FORM_VALIDATION.textMaxLength, 'Tên sản phẩm không được vượt quá 255 ký tự')
    .min(FORM_VALIDATION.textMinLength, 'Tên sản phẩm nhiều hơn 3 ký tự')
    .matches(FORM_VALIDATION.name, 'Tên sản phẩm sai định dạng');

const priceSchema = yup
    .number()
    .required('Giá sản phẩm là bắt buộc')
    .typeError('Giá sản phẩm phải là số')
    .positive('Giá sản phẩm phải là số lớn hơn 0')

const quantitySchema = yup
    .number()
    .required('Số lượng sản phẩm là bắt buộc')
    .typeError('Số lượng sản phẩm phải là số')
    .max(FORM_VALIDATION.numberMaxLength, 'Số lượng không được quá 9999999999')
    .positive('Số lượng sản phẩm phải là số lớn hơn 0')
    .integer('Số lượng sản phẩm phải là số nguyên');

const descriptionSchema = yup
    .string()
    .required('Mô tả sản phẩm là bắt buộc')
    .max(FORM_VALIDATION.textAreaMaxLength, 'Mô tả sản phẩm không được vượt quá 2000 ký tự')
    .min(FORM_VALIDATION.textAreaMinLength, 'Mô tả sản phẩm nhiều hơn 3 ký tự')

const imageSchema = yup
    .string()
    .required('Link ảnh sản phẩm là bắt buộc')
    .matches(Regex.URL, 'Link ảnh sản phẩm sai định dạng')

export const productSchema = yup.object().shape({
    name: nameSchema,
    price: priceSchema,
    quantity: quantitySchema,
    description: descriptionSchema,
    image: imageSchema
});
