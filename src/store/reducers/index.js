import * as type from "../actions/actionType";

const initialState = {
    // currentUser: null,
    user: null,
    tasks: [],
    Flag: false,
    // users:[]

}

const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case type.CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }

        case type.SELECT_TASKS:
            return {
                ...state,
                tasks: action.payload
            }

        case type.ADD_TASKS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case type.DELETE_TASK:
            let arr = [...state.tasks].filter(x => x.id != action.payload);

            return {
                ...state,
                tasks: arr
            }
        case type.UPDATE_TASK:
            return {
                ...state
            }
        // case type.ADD_USER:
        //     return{
        //         ...state,
        //         user:action.payload,
        //         // tasks:[],
        //       //  users:[...state.users,action.payload]
        //     }
        case type.LOG_OUT:
            return {
                ...state,
                user: null,
                tasks: []
            }

        case type.HISTORY_TASKS:
            return {
                ...state,
                tasks: [...action.payload]
            }

        case type.CHANGE_FLAG_TRUE:
            return {
                ...state,
                Flag: true
            }

        case type.CHANGE_FLAG_FALSE:
            return {
                ...state,
                Flag: false
            }



    }


    return state

}


export default Reducer;