import { ShoppingCalculator } from "./calculator.js";

let calculator

// Initialisation de l'application
document.addEventListener("DOMContentLoaded", () => {
  calculator = new ShoppingCalculator()
  window.removeHistoryItem = (index) => calculator.removeHistoryItem(index)
})

// Prévenir le zoom sur double-tap sur mobile
let lastTouchEnd = 0
document.addEventListener(
  "touchend",
  (event) => {
    const now = new Date().getTime()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  },
  false,
)

// Prévenir le scroll élastique sur iOS
document.addEventListener(
  "touchmove",
  (e) => {
    if (e.target.closest(".history-section")) {
      return // Permettre le scroll dans l'historique
    }
    e.preventDefault()
  },
  { passive: false },
)
