<div class="app-container">
    <div class="mobile-frame">
        <!-- Header avec bouton paramètres -->
        <header class="header">
            <button class="settings-btn" id="settingsBtn">
                <span class="settings-icon">⚙️</span>
            </button>
            <h1>Calculatrice Courses</h1>
        </header>

        <!-- Résultat total -->
        <div class="total-section">
            <div class="total-primary" id="totalPrimary">0,00 DKK</div>
            <div class="total-secondary" id="totalSecondary">0,00 EUR</div>
        </div>

        <!-- Historique des entrées -->
        <div class="history-section" id="historySection">
            <div class="history-placeholder">Aucune entrée</div>
        </div>

        <!-- Champ de saisie et conversion -->
        <div class="input-section">
            <div class="input-display">
                <input type="text" id="inputField" class="input-field" placeholder="0,00" readonly>
                <span class="currency-label">DKK</span>
            </div>
            <div class="converted-display">
                <span id="convertedValue">0,00 EUR</span>
            </div>
        </div>

        <!-- Clavier virtuel -->
        <div class="keyboard">
            <div class="keyboard-row">
                <button class="key number-key" data-value="1">1</button>
                <button class="key number-key" data-value="2">2</button>
                <button class="key number-key" data-value="3">3</button>
            </div>
            <div class="keyboard-row">
                <button class="key number-key" data-value="4">4</button>
                <button class="key number-key" data-value="5">5</button>
                <button class="key number-key" data-value="6">6</button>
            </div>
            <div class="keyboard-row">
                <button class="key number-key" data-value="7">7</button>
                <button class="key number-key" data-value="8">8</button>
                <button class="key number-key" data-value="9">9</button>
            </div>
            <div class="keyboard-row">
                <button class="key number-key" data-value=",">,</button>
                <button class="key number-key" data-value="0">0</button>
                <button class="key delete-key" id="deleteKey">⌫</button>
            </div>
            <div class="keyboard-row">
                <button class="key ok-key" id="okKey">OK</button>
            </div>
        </div>
    </div>
</div>