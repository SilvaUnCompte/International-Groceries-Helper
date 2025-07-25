import { initializeCookies, setCookie } from "./cookie-manager.js";
import { translations } from "./translations.js";

class ShoppingCalculator {
  constructor() {
    this.currentInput = ""
    this.history = []
    this.total = 0
    this.conversionRate = 1

    let cookies = initializeCookies()
    this.budgetLimit = Number.parseFloat(cookies.budgetLimit);
    this.language = cookies.language;
    this.primaryCurrency = cookies.primaryCurrency;
    this.secondaryCurrency = cookies.secondaryCurrency;

    this.initializeElements()
    this.bindEvents()
    this.updateDisplay()
    this.updateLanguage()
    this.updateCurrencyConversion()
  }

  initializeElements() {
    // Main elements
    this.inputField = document.getElementById("inputField")
    this.convertedValue = document.getElementById("convertedValue")
    this.totalPrimary = document.getElementById("totalPrimary")
    this.totalSecondary = document.getElementById("totalSecondary")
    this.historySection = document.getElementById("historySection")

    // Buttons
    this.settingsBtn = document.getElementById("settingsBtn")
    this.closeSettingsBtn = document.getElementById("closeSettingsBtn")
    this.deleteKey = document.getElementById("deleteKey")
    this.okKey = document.getElementById("okKey")

    // Settings overlay
    this.settingsOverlay = document.getElementById("settingsOverlay")

    // Settings
    this.primaryCurrencySelect = document.getElementById("primaryCurrency")
    this.secondaryCurrencySelect = document.getElementById("secondaryCurrency")
    this.budgetLimitInput = document.getElementById("budgetLimit")
    this.budgetCurrency = document.getElementById("budgetCurrency")
    this.languageSelect = document.getElementById("language")

    // Virtual keyboard
    this.numberKeys = document.querySelectorAll(".number-key")
  }

  bindEvents() {
    const isTouchDevice = 'ontouchstart' in window;
    const eventType = isTouchDevice ? 'touchstart' : 'click';

    // Virtual keyboard
    this.numberKeys.forEach((key) => {
      key.addEventListener(eventType, () => {
        this.handleNumberInput(key.dataset.value)
      })
    })

    this.deleteKey.addEventListener(eventType, () => {
      this.handleDelete()
    })

    this.okKey.addEventListener(eventType, () => {
      this.handleOk()
    })

    // Settings
    this.settingsBtn.addEventListener(eventType, () => {
      this.openSettings()
    })

    this.closeSettingsBtn.addEventListener(eventType, () => {
      this.closeSettings()
    })

    // Close settings by clicking on the overlay
    this.settingsOverlay.addEventListener(eventType, (e) => {
      if (e.target === this.settingsOverlay) {
        this.closeSettings()
      }
    })

    // Settings changes
    this.primaryCurrencySelect.addEventListener("change", () => {
      this.primaryCurrency = this.primaryCurrencySelect.value
      this.updateDisplay()
      this.updateCurrencyConversion()
      setCookie("primaryCurrency", this.primaryCurrency)
    })

    this.secondaryCurrencySelect.addEventListener("change", () => {
      this.secondaryCurrency = this.secondaryCurrencySelect.value
      this.updateDisplay()
      this.updateCurrencyConversion()
      setCookie("secondaryCurrency", this.secondaryCurrency)
    })

    this.budgetLimitInput.addEventListener("input", () => {
      this.budgetLimit = Number.parseFloat(this.budgetLimitInput.value) || 1000
      this.updateDisplay()
      setCookie("budgetLimit", this.budgetLimit)
    })

    this.languageSelect.addEventListener("change", () => {
      this.language = this.languageSelect.value
      this.updateLanguage()
      setCookie("language", this.language)
    })

    // Physical keyboard (PC)
    document.addEventListener("keydown", (e) => {
      if (this.settingsOverlay.classList.contains("active")) return

      if (e.key >= "0" && e.key <= "9") {
        this.handleNumberInput(e.key)
      } else if (e.key === "," || e.key === ".") {
        this.handleNumberInput(",")
      } else if (e.key === "Backspace") {
        this.handleDelete()
      } else if (e.key === "Enter") {
        this.handleOk()
      }
    })
  }

  updateCurrencyConversion() {
    // If the currencies are identical, no need for conversion
    if (this.primaryCurrency === this.secondaryCurrency) {
      this.conversionRate = 1
      this.updateInputDisplay()
      this.updateTotal()
      return
    }

    // API GET https://open.er-api.com/v6/latest/EUR
    fetch(`https://open.er-api.com/v6/latest/${this.primaryCurrency}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === "success" && data.rates[this.secondaryCurrency]) {
          this.conversionRate = data.rates[this.secondaryCurrency]
          this.updateInputDisplay()
          this.updateTotal()
        } else {
          this.conversionRate = 1
        }
      })
      .catch(() => {
        this.conversionRate = 1
      })
  }

  handleNumberInput(value) {
    if (value === "," && this.currentInput.includes(",")) {
      return // Avoid multiple commas
    }

    if (this.currentInput.length < 10) {
      // Limit the length
      this.currentInput += value
      this.updateInputDisplay()
    }
  }

  handleDelete() {
    this.currentInput = this.currentInput.slice(0, -1)
    this.updateInputDisplay()
  }

  handleOk() {
    if (this.currentInput && this.currentInput !== ",") {
      const value = this.parseValue(this.currentInput)
      if (value > 0) {
        this.addToHistory(value)
        this.currentInput = ""
        this.updateInputDisplay()
        this.updateTotal()
      }
    }
  }

  parseValue(input) {
    return Number.parseFloat(input.replace(",", ".")) || 0
  }

  formatValue(value, currency) {
    return `${value.toFixed(2).replace(".", ",")} ${currency}`
  }

  addToHistory(value) {
    const convertedValue = value * this.conversionRate // Pour le moment, même valeur
    this.history.push({
      primary: value,
      secondary: convertedValue,
      timestamp: Date.now(),
    })
    this.updateHistoryDisplay()
  }

  updateInputDisplay() {
    this.inputField.value = this.currentInput || "0,00"

    // Update real-time conversion
    if (this.primaryCurrency !== this.secondaryCurrency) {
      const value = this.parseValue(this.currentInput || "0")
      const converted = value * this.conversionRate
      this.convertedValue.textContent = this.formatValue(converted, this.secondaryCurrency)
      this.convertedValue.parentElement.style.display = "block"
    } else {
      this.convertedValue.parentElement.style.display = "none"
    }
  }

  updateHistoryDisplay() {
    if (this.history.length === 0) {
      this.historySection.innerHTML = `<div class="history-placeholder">${translations[this.language].noEntries}</div>`
      return
    }

    const showConversion = this.primaryCurrency !== this.secondaryCurrency

    const historyHTML = this.history
      .map(
        (item, index) => `
          <div class="history-item">
              <div class="history-content">
                  <div class="history-primary">${this.formatValue(item.primary, this.primaryCurrency)}</div>
                  ${showConversion ? `<div class="history-secondary">${this.formatValue(item.secondary, this.secondaryCurrency)}</div>` : ""}
              </div>
              <button class="delete-item-btn" onclick="removeHistoryItem(${index})">✕</button>
          </div>
      `,
      )
      .reverse()
      .join("")

    this.historySection.innerHTML = historyHTML
  }

  updateTotal() {
    this.total = this.history.reduce((sum, item) => sum + item.primary, 0)
    const convertedTotal = this.total * this.conversionRate

    // Update total display
    this.totalPrimary.textContent = this.formatValue(this.total, this.primaryCurrency)

    if (this.primaryCurrency !== this.secondaryCurrency) {
      this.totalSecondary.textContent = this.formatValue(convertedTotal, this.secondaryCurrency)
      this.totalSecondary.style.display = "block"
    } else {
      this.totalSecondary.style.display = "none"
    }

    // Check budget limit
    this.checkBudgetLimit()
  }

  checkBudgetLimit() {
    const existingWarning = document.querySelector(".budget-warning")
    if (existingWarning) {
      existingWarning.remove()
    }

    const convertedTotal = this.total * this.conversionRate
    const budgetInPrimaryCurrency = this.budgetLimit / this.conversionRate

    // DDetermine which value to use for comparison
    const totalToCheck = this.primaryCurrency === this.secondaryCurrency ? this.total : convertedTotal
    const limitToCheck = this.primaryCurrency === this.secondaryCurrency ? budgetInPrimaryCurrency : this.budgetLimit

    if (totalToCheck > limitToCheck) {
      this.totalPrimary.classList.add("over-budget")
      if (this.primaryCurrency !== this.secondaryCurrency) {
        this.totalSecondary.classList.add("over-budget")
      }

      const warningDiv = document.createElement("div")
      warningDiv.className = "budget-warning"

      if (this.primaryCurrency === this.secondaryCurrency) {
        // Same currency: display only one line
        const excess = this.total - budgetInPrimaryCurrency
        warningDiv.innerHTML = `
        <div class="budget-warning-line">${translations[this.language].budgetExcess} ${this.formatValue(excess, this.primaryCurrency)}</div>
      `
      } else {
        // Different currencies: display both lines
        const excessSecondary = convertedTotal - this.budgetLimit
        const excessPrimary = excessSecondary / this.conversionRate
        warningDiv.innerHTML = `
        <div class="budget-warning-line">${translations[this.language].budgetExcess} ${this.formatValue(excessSecondary, this.secondaryCurrency)}</div>
        <div class="budget-warning-line">${this.formatValue(excessPrimary, this.primaryCurrency)}</div>
      `
      }

      document.querySelector(".total-section").appendChild(warningDiv)
    } else {
      this.totalPrimary.classList.remove("over-budget")
      if (this.primaryCurrency !== this.secondaryCurrency) {
        this.totalSecondary.classList.remove("over-budget")
      }
    }
  }

  updateDisplay() {
    // Update currency labels
    document.querySelector(".currency-label").textContent = this.primaryCurrency
    this.budgetCurrency.textContent = this.secondaryCurrency

    // Update display
    this.updateInputDisplay()
    this.updateHistoryDisplay()
    this.updateTotal()

    // Update settings
    this.primaryCurrencySelect.value = this.primaryCurrency
    this.secondaryCurrencySelect.value = this.secondaryCurrency
    this.budgetLimitInput.value = this.budgetLimit
    this.languageSelect.value = this.language
  }

  openSettings() {
    this.settingsOverlay.classList.add("active")
  }

  closeSettings() {
    this.settingsOverlay.classList.remove("active")
  }

  removeHistoryItem(index) {
    this.history.splice(index, 1)
    this.updateHistoryDisplay()
    this.updateTotal()
  }

  updateLanguage() {
    // Update interface texts
    document.querySelector(".header h1").textContent = translations[this.language].title
    document.querySelector(".settings-header h2").textContent = translations[this.language].settings

    // Update settings labels
    const labels = document.querySelectorAll(".setting-group label")
    labels[0].textContent = translations[this.language].primaryCurrency
    labels[1].textContent = translations[this.language].secondaryCurrency
    labels[2].textContent = translations[this.language].budgetLimit
    labels[3].textContent = translations[this.language].language

    this.updateHistoryDisplay()
    this.checkBudgetLimit()
  }
}

export { ShoppingCalculator };