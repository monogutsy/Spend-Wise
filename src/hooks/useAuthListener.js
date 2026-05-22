import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setAuthInitialized,
  setAuthUser,
} from "../features/auth/authSlice";
import { watchAuthState } from "../services/authService";

export function useAuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = watchAuthState((user) => {
      dispatch(setAuthUser(user));
      dispatch(setAuthInitialized(true));
    });

    return unsubscribe;
  }, [dispatch]);
}
