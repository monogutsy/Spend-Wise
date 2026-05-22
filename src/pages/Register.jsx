import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthForm from "../components/auth/AuthForm";
import {
  clearAuthError,
  loginWithGoogleProvider,
  registerUser,
} from "../features/auth/authSlice";
import {
  selectAuthError,
  selectFirebaseConfigured,
  selectIsAuthLoading,
  selectIsAuthenticated,
} from "../features/auth/authSelectors";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );
  const firebaseConfigured = useSelector(
    selectFirebaseConfigured
  );

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleRegister(payload) {
    dispatch(registerUser(payload));
  }

  function handleGoogleSignIn() {
    dispatch(loginWithGoogleProvider());
  }

  return (
    <AuthForm
      title="Create your SpendWise account"
      subtitle="Start tracking spending and budgets in one place."
      submitLabel="Register"
      loading={isLoading}
      error={error}
      firebaseConfigured={firebaseConfigured}
      onSubmit={handleRegister}
      onGoogleSignIn={handleGoogleSignIn}
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      }
    />
  );
}

export default Register;
