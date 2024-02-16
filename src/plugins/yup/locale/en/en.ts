import capitalize from 'lodash/capitalize';
import type { MessageContext, MessageFunctionCallable } from '@intlify/runtime';

export const yupEn = {
    mixed: {
        required: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` is required`;
        }) as MessageFunctionCallable,
        default: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} is invalid`);
        }) as MessageFunctionCallable,
        selectRequired: `This field is required`,
        oneOf: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` is required`;
        }) as MessageFunctionCallable,
        notOneOf: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} must have the value except: ${ctx.named('values')}`,
            );
        }) as MessageFunctionCallable,
        defined: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be defined`);
        }) as MessageFunctionCallable,
    },

    string: {
        length: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must have ${ctx.named('length')} characters`);
        }) as MessageFunctionCallable,
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} must have at least ${ctx.named('length')} characters`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} can't exceed ${ctx.named('length')} characters`,
            );
        }) as MessageFunctionCallable,
        matches: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} is invalid`);
        }) as MessageFunctionCallable,
        email: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be correct email format`);
        }) as MessageFunctionCallable,
        url: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` must be correct URL format`;
        }) as MessageFunctionCallable,
        uuid: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` must be correct UUID format`;
        }) as MessageFunctionCallable,
        trim: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be trimmed`);
        }) as MessageFunctionCallable,
        lowercase: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be lowercase`);
        }) as MessageFunctionCallable,
        uppercase: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be uppercase`);
        }) as MessageFunctionCallable,
    },

    number: {
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} must have minimum value of ${ctx.named('min')}`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} can't exceed ${ctx.named('max')}`);
        }) as MessageFunctionCallable,
        lessThan: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be less than ${ctx.named('less')}`);
        }) as MessageFunctionCallable,
        moreThan: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be more than ${ctx.named('more')}`);
        }) as MessageFunctionCallable,
        positive: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be a positive number`);
        }) as MessageFunctionCallable,
        negative: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be a negative number`);
        }) as MessageFunctionCallable,
        integer: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be an integer`);
        }) as MessageFunctionCallable,
    },

    date: {
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be before ${ctx.named('max')}`);
        }) as MessageFunctionCallable,
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be after ${ctx.named('min')}`);
        }) as MessageFunctionCallable,
    },

    boolean: {
        isValue: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must be value of ${ctx.named('value')}`);
        }) as MessageFunctionCallable,
    },

    array: {
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} must have at least ${ctx.named('min')} elements`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} must have less than or equal to ${ctx.named(
                    'max',
                )} elements`,
            );
        }) as MessageFunctionCallable,
        length: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must have ${ctx.named('length')} elements`);
        }) as MessageFunctionCallable,
    },

    object: {
        noUnknown: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`yupFields.${ctx.named('path')}`);
            return capitalize(`${fieldName} must have the key: ${ctx.named('unknown')}`);
        }) as MessageFunctionCallable,
    },
    tuple: {
        notType: ((ctx: MessageContext) => {
            const name = ctx.named('label') || ctx.named('name') || ctx.named('path');
            const fieldName = ctx.linked(`yupFields.${name}`);
            return capitalize(`${fieldName} must have type: ${ctx.named('unknown')}`)
        }) as MessageFunctionCallable
    }
};
