import {
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCurrency,
  toggleDarkMode,
} from "../features/settings/settingsSlice";
import {
  selectCurrency,
  selectDarkMode,
} from "../features/settings/settingsSelectors";
import { saveState } from "../services/localStorageService";
import { SUPPORTED_CURRENCIES } from "../utils/constants";

function isBackupShapeValid(data) {
  return (
    Boolean(data) &&
    typeof data === "object" &&
    Array.isArray(data?.transactions?.transactions) &&
    Array.isArray(data?.budgets?.budgets) &&
    Array.isArray(data?.goals?.goals) &&
    Array.isArray(data?.bills?.bills) &&
    Array.isArray(data?.categories?.categories) &&
    typeof data?.settings?.currency === "string" &&
    typeof data?.settings?.darkMode === "boolean"
  );
}

function getBackupFilename() {
  const date = new Date().toISOString().slice(0, 10);
  return `spendwise-backup-${date}.json`;
}

function Settings() {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const darkMode = useSelector(selectDarkMode);
  const persistedState = useSelector((state) => ({
    transactions: state.transactions,
    budgets: state.budgets,
    goals: state.goals,
    bills: state.bills,
    categories: state.categories,
    settings: state.settings,
  }));
  const fileInputRef = useRef(null);
  const [backupMessage, setBackupMessage] = useState("");
  const [backupError, setBackupError] = useState("");

  function clearBackupStatus() {
    setBackupMessage("");
    setBackupError("");
  }

  function handleDownloadBackup() {
    clearBackupStatus();

    try {
      const payload = JSON.stringify(
        persistedState,
        null,
        2
      );
      const blob = new Blob([payload], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = getBackupFilename();
      link.click();
      URL.revokeObjectURL(url);

      setBackupMessage("Backup downloaded successfully.");
    } catch (error) {
      setBackupError(
        error?.message || "Failed to create backup file."
      );
    }
  }

  async function handleRestoreBackup(event) {
    clearBackupStatus();

    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw);

      if (!isBackupShapeValid(parsed)) {
        throw new Error(
          "Invalid backup format. Please select a SpendWise backup file."
        );
      }

      saveState(parsed);
      setBackupMessage("Backup restored. Reloading app...");

      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (error) {
      setBackupError(
        error?.message || "Failed to restore backup."
      );
    }
  }

  return (
    <div className="page settings-page">
      <h1>Settings</h1>
      <p className="page-subtitle">
        Personalize appearance and preferred currency.
      </p>

      <div className="panel">
        <h3>Currency</h3>
        <select
          value={currency}
          onChange={(event) =>
            dispatch(setCurrency(event.target.value))
          }
        >
          {SUPPORTED_CURRENCIES.map(
            ({ code }) => (
              <option key={code} value={code}>
                {code}
              </option>
            )
          )}
        </select>
      </div>

      <div className="panel">
        <h3>Theme</h3>
        <label className="settings-toggle">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              dispatch(toggleDarkMode())
            }
          />
          Dark mode
        </label>
      </div>

      <div className="panel">
        <h3>Backup & Restore</h3>
        <p className="page-subtitle">
          Download your app data and restore it later on this device.
        </p>

        <div className="settings-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleDownloadBackup}
          >
            Download Backup
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            Restore Backup
          </button>
        </div>

        <input
          ref={fileInputRef}
          className="hidden-file-input"
          type="file"
          accept="application/json"
          onChange={handleRestoreBackup}
        />

        {backupMessage ? (
          <p className="settings-note settings-note-success">
            {backupMessage}
          </p>
        ) : null}

        {backupError ? (
          <p className="settings-note settings-note-error">
            {backupError}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Settings;
