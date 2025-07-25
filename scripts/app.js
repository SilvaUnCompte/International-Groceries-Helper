import { ShoppingCalculator } from "./calculator.js";

let calculator

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  calculator = new ShoppingCalculator()
  window.removeHistoryItem = (index) => calculator.removeHistoryItem(index)
})

// Prevent zoom on double-tap on mobile
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

// Prevent elastic scroll on iOS
document.addEventListener(
  "touchmove",
  (e) => {
    if (e.target.closest(".history-section")) {
      return // Allow scrolling in history
    }
    e.preventDefault()
  },
  { passive: false },
)

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
