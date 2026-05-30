import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerWithEmail,
} from "../../services/authService";
import { isFirebaseConfigured } from "../../services/firebase";

const initialState = {
  user: null,
  status: "idle",
  error: "",
  initialized: false,
  isFirebaseConfigured,
};

function handleAuthError(error, rejectWithValue) {
  return rejectWithValue(
    error?.message || "Authentication failed."
  );
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    if (!isFirebaseConfigured) {
      return rejectWithValue(
        "Firebase auth is disabled. Configure VITE_FIREBASE_* variables to enable sign in."
      );
    }

    try {
      return await registerWithEmail(payload);
    } catch (error) {
      return handleAuthError(error, rejectWithValue);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    if (!isFirebaseConfigured) {
      return rejectWithValue(
        "Firebase auth is disabled. Configure VITE_FIREBASE_* variables to enable sign in."
      );
    }

    try {
      return await loginWithEmail(payload);
    } catch (error) {
      return handleAuthError(error, rejectWithValue);
    }
  }
);

export const loginWithGoogleProvider = createAsyncThunk(
  "auth/loginWithGoogleProvider",
  async (_, { rejectWithValue }) => {
    if (!isFirebaseConfigured) {
      return rejectWithValue(
        "Firebase auth is disabled. Configure VITE_FIREBASE_* variables to enable sign in."
      );
    }

    try {
      return await loginWithGoogle();
    } catch (error) {
      return handleAuthError(error, rejectWithValue);
    }
  }
);

export const logoutCurrentUser = createAsyncThunk(
  "auth/logoutCurrentUser",
  async (_, { rejectWithValue }) => {
    if (!isFirebaseConfigured) {
      return null;
    }

    try {
      await logoutUser();
    } catch (error) {
      return handleAuthError(error, rejectWithValue);
    }

    return null;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    clearAuthError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(
        loginWithGoogleProvider.pending,
        (state) => {
          state.status = "loading";
          state.error = "";
        }
      )
      .addCase(
        loginWithGoogleProvider.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addCase(
        loginWithGoogleProvider.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )
      .addCase(logoutCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(logoutCurrentUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(
        logoutCurrentUser.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearAuthError,
  setAuthInitialized,
  setAuthUser,
} = authSlice.actions;

export default authSlice.reducer;
