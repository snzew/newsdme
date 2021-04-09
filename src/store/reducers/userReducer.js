import {
  SET_USER_INFO, 
  USER_LOADING, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_ERROR, 
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  SET_GEOLOCATION
}  from "../types/userTypes";

const initialState = {
  isLoading: false,
  loggedIn: false,
  errorMsg:'',
};

const userReducer = (state = initialState, action='') => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        articles: action.payload,
      }
    case USER_LOADING:
      return{
        ...state,
        isLoading: true,
        errorMsg:'',

      }
      case REGISTER_USER_SUCCESS:
      return{
        ...state,
        userName: action.payload.username,
        isLoading: false,
        registerSuccessful: true,
        errorMsg:'',
      }
    case REGISTER_USER_ERROR:
    return{
      ...state,
      errorMsg: action.payload,
      isLoading: false
    }
    case LOGIN_USER_SUCCESS:
      return{
        ...state,
        userName : action.payload.userName,
        isLoading: false,
        loginSuccessful: true,
        loggedIn: true,
        errorMsg:'',

      }
    case LOGIN_USER_ERROR:
      return{
        ...state,
        errorMsg: action.payload,
        isLoading: false,
        loginSuccessful: false
      }
    case LOGOUT_USER:
      return{
        ...state,
        loggedIn:false,
        errorMsg:'',

      } 
    case SET_GEOLOCATION:
      return{
        ...state,
        geoLocation: action.payload
      }

    default:
      return state;
  }
};

export default userReducer ;