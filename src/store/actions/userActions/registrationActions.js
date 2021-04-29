import * as types from "../../types/userTypes";

/**********Register actions */

export const registerUserAction = (user) =>
  async (dispatch, getState, {backendFetcher}) => {
    dispatch(registerUserLoading());
    await backendFetcher({url:"/auth/login", method:'get'}).catch(e => console.log(e))

    const options = {url: "/auth/register", method: "post",data: JSON.stringify(user)}

    try{
      const response = await backendFetcher(options);
      console.log(response.data.token);
      dispatch(registerUserSucceeded(user.username, response.data.token))
    }catch(error){
      console.log(error.message);
      dispatch(registerUserFailed(error.message));
    }
  };


export const registerUserLoading = () => {
  return {
    type: types.IS_LOADING
  }
};

export const registerUserSucceeded = (username,token) => {
  return {
    type: types.USER_REGISTER_SUCCEEDED,
    payload: {user: username, confirmationToken: token }
  }
};

export const registerUserFailed =(errorMsg)=>{
  return{
    type: types.USER_REGISTRATION_FAILED,
    payload: errorMsg
  }
};

export const confirmRegistration = (token) =>
    async (dispatch, getState, { backendFetcher }) => {
      dispatch(doConfirmRegistration());

      const options = {
        url: `/auth/confirm?token=${token}`,
        method: "get"}

      try{
        const response = await backendFetcher(options);
        console.log(response)
        dispatch(confirmRegistrationSucceeded())
      }catch(error){
        console.log(error.message);
        dispatch(confirmRegistrationFailed(error.message))
      }
  };

export const doConfirmRegistration= () =>{
  return{
    type: types.DO_CONFIRM_REGISTRATION
  }
};

export const confirmRegistrationSucceeded = () =>{
  return{
    type: types.CONFIRM_REGISTRATION_SUCCEEDED,
  }
};

export const confirmRegistrationFailed = msg => {
  return {
    type: types.CONFIRM_REGISTRATION_FAILED,
    payload: msg
  }
};


