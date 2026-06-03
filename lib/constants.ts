export const APP_CONFIG = {
    NAME: "AZAMOV OFFICIAL",
    DESC: "IT Blogger va Dasturchi | O'zbekiston, Jizzax",
    PREFIX: "azamov_v1_",
} as const;

export const STORAGE_KEYS = {
    LANGUAGE: `${APP_CONFIG.PREFIX}-language`,
} as const;

export const LOCALE_CONFIG = {
    DEFAULT: "uz",
    SUPPORTED: ["uz", "ru", "en"] as const,
} as const;
