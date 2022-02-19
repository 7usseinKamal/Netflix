import { authActions } from "../store/auth-slice";
import { uiActions } from "../store/ui-slice";

// sign up
export const signUp = (data) => {
  return async (dispatch) => {
    const signUpUser = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjDqC0_fZ6Bsxe7kTjERlwyYnTGc-LpSs",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
          throw new Error(errorMessage);
        }
      }
      const successData = await response.json();
      return successData;
    };
    try {
      const done = await signUpUser();
      dispatch(authActions.loginHandler(done.email));
    } catch (err) {
      dispatch(uiActions.showAuthFailed(err.message));
    }
  };
};

// login
export const login = (data) => {
  return async (dispatch) => {
    const loginUpUser = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjDqC0_fZ6Bsxe7kTjERlwyYnTGc-LpSs",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // let errorMessage = "We can't find your membership, please check your email or password";
        throw new Error(errorData.error.message);
      }
      const fallbackData = await response.json();

      return fallbackData;
    };
    try {
      const userData = await loginUpUser();
      dispatch(authActions.loginHandler(userData.email));
    } catch (err) {
      dispatch(uiActions.showAuthFailed(err.message));
    }
  };
};
