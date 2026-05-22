import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AuthForm from "../components/auth/AuthForm";
import {
  clearAuthError,
  loginUser,
  loginWithGoogleProvider,
} from "../features/auth/authSlice";
import {
  selectAuthError,
  selectFirebaseConfigured,
  selectIsAuthLoading,
  selectIsAuthenticated,
} from "../features/auth/authSelectors";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );
  const firebaseConfigured = useSelector(
    selectFirebaseConfigured
  );

  const from =
    location.state?.from?.pathname || "/";

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, navigate]);

  function handleLogin(payload) {
    dispatch(loginUser(payload));
  }

  function handleGoogleSignIn() {
    dispatch(loginWithGoogleProvider());
  }

  return (
    <AuthForm
      title="Sign in to SpendWise"
      subtitle="Manage your expenses with secure account access."
      submitLabel="Login"
      loading={isLoading}
      error={error}
      firebaseConfigured={firebaseConfigured}
      onSubmit={handleLogin}
      onGoogleSignIn={handleGoogleSignIn}
      footer={
        <p>
          New to SpendWise?{" "}
          <Link to="/register">Create account</Link>
        </p>
      }
    />
  );
}

export default Login;
