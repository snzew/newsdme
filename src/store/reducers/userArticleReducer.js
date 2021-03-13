import { IS_LOADING_ARTICLES,
	GET_USER_ARTICLES_ERROR,
	GET_USER_ARTICLES_SUCCESS,
	ADD_ARTICLE_TO_USER_ARTICLELIST,
} from "../constants/userArticelTypes"


const initialState = {
	isLoading:false,
	articles: []
}
const userArticleReducer = (state = initialState, action='') =>{
	switch(action.type){
		case IS_LOADING_ARTICLES:
			return{
				...state,
				isLoading:true
			}
		case GET_USER_ARTICLES_SUCCESS:
		return {
			...state,
			isLoading: false,
			articles: action.payload
		}
		case GET_USER_ARTICLES_ERROR:
			return{
				...state,
				isLoading: false,
				errorMsg: action.payload
			}
			case ADD_ARTICLE_TO_USER_ARTICLELIST:
			return{
				...state,
				articles: [...state.savedArticles, action.payload]
			}
		default:
			return state;
	}
}

export default userArticleReducer