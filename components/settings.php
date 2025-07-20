<div class="settings-overlay" id="settingsOverlay">
    <div class="settings-page">
        <header class="settings-header">
            <h2>Paramètres</h2>
            <button class="close-btn" id="closeSettingsBtn">✕</button>
        </header>

        <div class="settings-content">
            <div class="setting-group">
                <label for="primaryCurrency">Devise initiale</label>
                <select id="primaryCurrency">
                    <option value="DKK">DKK - Couronne danoise</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="USD">USD - Dollar américain</option>
                </select>
            </div>

            <div class="setting-group">
                <label for="secondaryCurrency">Devise à convertir</label>
                <select id="secondaryCurrency">
                    <option value="EUR">EUR - Euro</option>
                    <option value="DKK">DKK - Couronne danoise</option>
                    <option value="USD">USD - Dollar américain</option>
                </select>
            </div>

            <div class="setting-group">
                <label for="budgetLimit">Valeur plafond</label>
                <div class="budget-input-group">
                    <input type="number" id="budgetLimit" placeholder="100" step="0.01">
                    <span class="budget-currency" id="budgetCurrency">EUR</span>
                </div>
            </div>

            <div class="setting-group">
                <label for="language">Langue</label>
                <select id="language">
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                </select>
            </div>
        </div>
    </div>
</div>