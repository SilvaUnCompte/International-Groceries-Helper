// storage-manager.js

const defaultBankFee = 0; // Default bank fee
const defaultBudgetLimit = 1000; // Default budget limit
const defaultConversionRate = 1; // Never use
const defaultConversionRateText = "EUR to USD"; // Use only for display
const defaultLanguage = "en"; // Default language
const defaultPrimaryCurrency = "EUR"; // Default primary currency
const defaultSecondaryCurrency = "USD"; // Default secondary currency

function ensureStorage(name, defaultValue) {
    let value = getStorage(name);
    if (value === null || value === undefined || value === "") {
        setStorage(name, defaultValue);
        return defaultValue;
    }
    return value;
}

function getStorage(name) {
    const value = localStorage.getItem(name);
    return value !== null ? JSON.parse(value) : null;
}

function setStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

function initializeStorage() {
    let valBankFee = ensureStorage("bankFee", defaultBankFee);
    let valBudgetLimit = ensureStorage("budgetLimit", defaultBudgetLimit);
    let valLanguage = ensureStorage("language", defaultLanguage);
    let valPrimaryCurrency = ensureStorage("primaryCurrency", defaultPrimaryCurrency);
    let valSecondaryCurrency = ensureStorage("secondaryCurrency", defaultSecondaryCurrency);
    let valLastConversionRate = ensureStorage("lastConversionRate", defaultConversionRate);
    let valLastConversionRateText = ensureStorage("lastConversionRateText", defaultConversionRateText);
    let valHistory = ensureStorage("history", []);

    return {
        bankFee: valBankFee,
        budgetLimit: valBudgetLimit,
        language: valLanguage,
        primaryCurrency: valPrimaryCurrency,
        secondaryCurrency: valSecondaryCurrency,
        lastConversionRate: valLastConversionRate,
        lastConversionRateText: valLastConversionRateText,
        history: valHistory
    }
}

export {
    ensureStorage,
    getStorage,
    setStorage,
    initializeStorage
};
