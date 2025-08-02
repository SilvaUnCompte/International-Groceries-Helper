// cookieManager.js

const daysToExpire = new Date(2147483647 * 1000).toUTCString();
const defaultBankFee = 0; // Default bank fee
const defaultBudgetLimit = 1000; // Default budget limit
const defaultLanguage = "en"; // Default language
const defaultPrimaryCurrency = "EUR"; // Default primary currency
const defaultSecondaryCurrency = "USD"; // Default secondary currency

function ensureCookie(name, defaultValue) {
    let value = getCookie(name);
    if (value === null || value === undefined || value === "") {
        setCookie(name, defaultValue, daysToExpire);
        return defaultValue;
    }
    return value;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${daysToExpire}; path=/`;
}

function initializeCookies() {
    let valBankFee = ensureCookie("bankFee", defaultBankFee);
    let valBudgetLimit = ensureCookie("budgetLimit", defaultBudgetLimit);
    let valLanguage = ensureCookie("language", defaultLanguage);
    let valPrimaryCurrency = ensureCookie("primaryCurrency", defaultPrimaryCurrency);
    let valSecondaryCurrency = ensureCookie("secondaryCurrency", defaultSecondaryCurrency);

    return {
        bankFee: valBankFee,
        budgetLimit: valBudgetLimit,
        language: valLanguage,
        primaryCurrency: valPrimaryCurrency,
        secondaryCurrency: valSecondaryCurrency
    }
}

export {
    ensureCookie,
    getCookie,
    setCookie,
    initializeCookies
};