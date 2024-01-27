/* eslint-disable no-template-curly-in-string */
import { type LocaleObject } from 'yup';

const localeObject: Required<LocaleObject> = {
    mixed: {
        default: (params) => {
            return { i18nKey: 'yup.mixed.default', params };
        },
        required: (params) => {
            return {
                i18nKey: 'yup.mixed.required',
                params,
            };
        },
        oneOf: (params) => {
            return {
                i18nKey: 'yup.mixed.oneOf',
                params: {
                    path: params.path,
                    values: params.values,
                },
            };
        },
        notOneOf: (params) => {
            return {
                i18nKey: 'yup.mixed.notOneOf',
                params,
            };
        },
        defined: (params) => {
            return {
                i18nKey: 'yup.mixed.defined',
                params,
            };
        },
        notNull: (params) => {
            return {
                i18nKey: 'yup.mixed.notNull',
                params,
            };
        },
        notType: (params) => {
            return {
                i18nKey: 'yup.mixed.notType',
                params,
            };
        },
    },
    string: {
        length: (params) => {
            return {
                i18nKey: 'yup.string.length',
                params,
            };
        },
        min: (params) => {
            return {
                i18nKey: 'yup.string.min',
                params,
            };
        },
        max: (params) => {
            return {
                i18nKey: 'yup.string.max',
                params,
            };
        },
        matches: (params) => {
            return {
                i18nKey: 'yup.string.matches',
                params,
            };
        },
        email: (params) => {
            return {
                i18nKey: 'yup.string.email',
                params,
            };
        },
        url: (params) => {
            return {
                i18nKey: 'yup.string.url',
                params,
            };
        },
        uuid: (params) => {
            return {
                i18nKey: 'yup.string.uuid',
                params,
            };
        },
        trim: (params) => {
            return {
                i18nKey: 'yup.string.trim',
                params,
            };
        },
        lowercase: (params) => {
            return {
                i18nKey: 'yup.string.lowercase',
                params,
            };
        },
        uppercase: (params) => {
            return {
                i18nKey: 'yup.string.uppercase',
                params,
            };
        },
    },
    number: {
        min: (params) => ({
            i18nKey: 'yup.number.min',
            params,
        }),
        max: (params) => {
            return {
                i18nKey: 'yup.number.max',
                params,
            };
        },
        lessThan: (params) => {
            return {
                i18nKey: 'yup.number.less',
                params,
            };
        },
        moreThan: (params) => {
            return {
                i18nKey: 'yup.number.more',
                params,
            };
        },
        positive: (params) => {
            return {
                i18nKey: 'yup.number.positive',
                params,
            };
        },
        negative: (params) => {
            return {
                i18nKey: 'yup.number.negative',
                params,
            };
        },
        integer: (params) => {
            return {
                i18nKey: 'yup.number.integer',
                params,
            };
        },
    },
    date: {
        min: (params) => {
            return {
                i18nKey: 'yup.date.min',
                params,
            };
        },
        max: (params) => {
            return {
                i18nKey: 'yup.date.max',
                params,
            };
        },
    },
    boolean: {
        isValue: (params) => {
            return {
                i18nKey: 'yup.boolean.isValue',
                params,
            };
        },
    },
    object: {
        noUnknown: (params) => {
            return {
                i18nKey: 'yup.object.noUnknown',
                params: {
                    ...params,
                    unknown: params.value,
                },
            };
        },
    },
    array: {
        min: (params) => {
            return {
                i18nKey: 'yup.array.min',
                params,
            };
        },
        max: (params) => {
            return {
                i18nKey: 'yup.array.max',
                params,
            };
        },
        length: (params) => {
            return {
                i18nKey: 'yup.array.length',
                params,
            };
        },
    },
    tuple: {
        notType: (params) => {
            return {
                i18nKey: 'yup.tuple.notType',
                params,
            };
        },
    },
};
export default localeObject;
