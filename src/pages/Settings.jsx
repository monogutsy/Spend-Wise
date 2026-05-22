import { useDispatch, useSelector } from "react-redux";

import {
  setCurrency,
  toggleDarkMode,
} from "../features/settings/settingsSlice";
import {
  selectCurrency,
  selectDarkMode,
} from "../features/settings/settingsSelectors";
import { SUPPORTED_CURRENCIES } from "../utils/constants";

function Settings() {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const darkMode = useSelector(selectDarkMode);

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
    </div>
  );
}

export default Settings;
