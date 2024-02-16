import capitalize from 'lodash/capitalize';
import type { MessageContext, MessageFunctionCallable } from '@intlify/runtime';
import { formatDate } from './../../../../common/helpers';

export const yupVi = {
    mixed: {
        required: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName}`) + ` là bắt buộc`;
        }) as MessageFunctionCallable,
        default: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} không hợp lệ`);
        }) as MessageFunctionCallable,
        selectRequired: `Đây là bắt buộc`,
        oneOf: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName}`) + ` là bắt buộc`;
        }) as MessageFunctionCallable,
        notOneOf: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(
                `${fieldName} phải là giá trị ngoại trừ: ${ctx.named('values')}`,
            );
        }) as MessageFunctionCallable,
        defined: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải được định nghĩa`);
        }) as MessageFunctionCallable,
        notNull: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName}`) + ` là bắt buộc`;
        }) as MessageFunctionCallable,
        notType: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName}`) + ` là bắt buộc`;
        }) as MessageFunctionCallable,
    },

    string: {
        length: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải đúng ${ctx.named('length')} ký tự`);
        }) as MessageFunctionCallable,
        min: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(
                `${fieldName} phải nhập tối thiểu ${ctx.named('min')} ký tự`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(
                `${fieldName} không được vượt quá ${ctx.named('max')} ký tự`,
            );
        }) as MessageFunctionCallable,
        matches: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} không hợp lệ`);
        }) as MessageFunctionCallable,
        email: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} chưa đúng định dạng`);
        }) as MessageFunctionCallable,
        password: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} chưa đúng định dạng`);
        }) as MessageFunctionCallable,
        url: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName}`) + ` phải đúng định dạng URL`;
        }) as MessageFunctionCallable,
        uuid: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName}`) + ` đúng địng dạng UUID`;
        }) as MessageFunctionCallable,
        trim: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải được cắt chuỗi`);
        }) as MessageFunctionCallable,
        lowercase: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải là chữ thường`);
        }) as MessageFunctionCallable,
        uppercase: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải là chữ hoa`);
        }) as MessageFunctionCallable,
        oneOf: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName}`) + ` là bắt buộc`;
        }) as MessageFunctionCallable,
    },

    number: {
        min: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(
                `${fieldName} phải có giá trị thấp nhất là ${ctx.named('min')}`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} không được vượt quá ${ctx.named('max')}`);
        }) as MessageFunctionCallable,
        lessThan: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải ít hơn ${ctx.named('less')}`);
        }) as MessageFunctionCallable,
        moreThan: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải lớn hơn ${ctx.named('more')}`);
        }) as MessageFunctionCallable,
        positive: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải là số dương`);
        }) as MessageFunctionCallable,
        negative: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải là số âm`);
        }) as MessageFunctionCallable,
        integer: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải là số nguyên`);
        }) as MessageFunctionCallable,
    },

    date: {
        max: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(
                `${fieldName} phải nhỏ hơn ngày ${formatDate(ctx.named('max') as Date)}`,
            );
        }) as MessageFunctionCallable,
        min: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(
                `${fieldName} phải lớn hơn ngày ${formatDate(ctx.named('min') as Date)}`,
            );
        }) as MessageFunctionCallable,
    },

    boolean: {
        isValue: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải có giá trị là ${ctx.named('value')}`);
        }) as MessageFunctionCallable,
    },

    array: {
        min: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải có ít nhất ${ctx.named('min')} phần tử`);
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(
                `${fieldName} phải ít hơn hoặc bằng ${ctx.named('max')} phần tử`,
            );
        }) as MessageFunctionCallable,
        length: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải có ${ctx.named('length')} phần tử`);
        }) as MessageFunctionCallable,
    },

    object: {
        noUnknown: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải có khóa: ${ctx.named('unknown')}`);
        }) as MessageFunctionCallable,
    },
    tuple: {
        notType: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} phải có kiểu: ${ctx.named('unknown')}`)
        }) as MessageFunctionCallable
    }
};
