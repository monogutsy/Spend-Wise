import { useState } from "react";

function AuthForm({
  title,
  subtitle,
  submitLabel,
  loading,
  error,
  firebaseConfigured,
  onSubmit,
  onGoogleSignIn,
  footer,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>{title}</h1>
        <p className="page-subtitle">{subtitle}</p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="••••••••"
              required
              minLength={6}
            />
          </label>

          {error ? (
            <p className="form-error">{error}</p>
          ) : null}

          {!firebaseConfigured ? (
            <p className="auth-hint">
              Firebase credentials are missing. Add
              `VITE_FIREBASE_*` env values to enable
              authentication.
            </p>
          ) : null}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Please wait..." : submitLabel}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onGoogleSignIn}
            disabled={loading}
          >
            Continue with Google
          </button>
        </form>

        <div className="auth-footer">{footer}</div>
      </div>
    </div>
  );
}

export default AuthForm;
