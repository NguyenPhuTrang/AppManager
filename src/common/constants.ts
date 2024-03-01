export enum PageName {
    LOGIN_PAGE = '/login',
    REGISTER_PAGE = '/register',
    DASHBOARD_PAGE = 'dashboard_page',
    PRODUCT_PAGE = '/product',
    NOT_FOUND_PAGE = '/not_found_page',
}

export enum SupportLanguage {
    EN = 'en',
    VI = 'vi',
}

export enum OrderDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export const DEFAULT_LANGUAGE = SupportLanguage.VI;

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    GROUP_HAS_CHILDREN = 410,
    GROUP_MAX_LEVEL = 411,
    GROUP_MAX_QUANTITY = 412,
    ITEM_NOT_FOUND = 444,
    ITEM_ALREADY_EXIST = 445,
    ITEM_INVALID = 446,
    NETWORK_ERROR = 447,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
};

export enum ErrorCode {
    NOT_FOUND = 404,
    CONFLICT = 409,
    GROUP_MAX_QUANTITY = 412,
    UNPROCESSABLE_ENTITY = 422,
    ITEM_NOT_FOUND = 444,
    ITEM_ALREADY_EXIST = 445,
    ITEM_INVALID = 446,
    VALIDATE = 400,
};

export enum DATE_TIME_FORMAT {
    YYYY_MM_DD_HYPHEN = 'YYYY-MM-DD',
    DD_MM_YYYY_DASH = 'DD/MM/YYYY',
    DD_MM_YYYY_HYPHEN = 'DD-MM-YYYY',
    YYYY_MM_DD_DASH = 'YYYY/MM/DD',
    hh_mm_L_COLON = 'h:mm L',
    hh_mm_vi_DD_MM_YYYY_DOT = 'hh:mm [Ngày] DD.MM.YYYY',
    dddd_vi_DD_MM_YYYY_DASH = 'dddd [Ngày] DD/MM/YYYY',
    DD_MM_YY_DASH = 'DD/MM/YYYY',
    dddd_vi_L_SPACE = 'dddd, [ngày] L',
    DD_vi_MM = 'DD [Th]MM',
    DD_vi_M_YYYY = 'DD [Th]M YYYY',
    hh_mm = 'hh:mm',
    YYYY_MM_DD_HH_MM_SS_HYPHEN = 'YYYY-MM-DD HH:mm:ss',
    hh_mm_A = 'hh:mm A',
    h_A = 'h A',
    h_mm_A = 'h:mm A',
    HH_mm = 'HH:mm',
    MMMM_YYYY = 'MMMM, YYYY',
};

export const FORM_VALIDATION = {

    name: /^(?=.*[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễđĐìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỹỷý])(?!.*[0-9]{5,})[a-zA-Z0-9\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễđĐìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỹỷý.,_-]+$/,
    textMinLength: 3,
    textMaxLength: 255,
    numberMaxLength: 9999999999,
    nameMaxLength: 64,
    codeMaxLength: 10,
    textAreaMaxLength: 2000,
    textAreaMinLength: 3,
    passwordMinLength: 6,
    passwordMaxLength: 20,
    passwordForm: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*]{6,20}$/,
    numberRegExp: /^[0-9]+$/,
    maxNumberPhone: 10,
    minNumberPhone: 10,
    phoneRegExp: /^(((\+)84)|0)(3|5|7|8|9)([0-9]{3,13})/,
    nameRegExp: /^([^!@`~#$:%^*&().<>?\\/\\+|=]+?)$/,
    specialCharacters: /[~`!@#$%^&*()+={}[\];:'"<>.,/\\?-_]/g,
    codeRegExp: /^(([^~`!@#$%^&*()+={}[\];:'"<>.,/\\?-_\s]|[A-Z])+?)$/g, //does not match special characters, space
    intPattern: /^\d+?$/,
    floatPattern: /^\d+(\.\d{0,2})?$/,
    tenantMaxLength: 30,
    dateForm: /^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/
};

export const Regex = {
    // EMAIL:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    EMAIL: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    NAME: /^[^[\]\\|'";:/?.>,<)(_=+!@#$%^&*`~0-9-]+$/,
    PASSWORD: /^(?=.*[a-zA-z])(?=.*\d).{8,}$/,
    COLOR: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
    TIME: /^(([0-1]\d{0,1})|(2[0-3]{0,1})):[0-5]\d{0,1}$/,
    /* eslint-disable no-useless-escape */
    URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
};

export const DaysOfWeek = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 0,
};
