import { useReducer } from 'react'
import User from '../types/User'

export type action = {
  type: string,
  data: User
}

const userReducer = (state: User,action:action): User => {
  switch (action.type) {
    case 'LOG IN':
      console.log(action.data);
      
      return {
        ...state, ...action.data
      }
    case 'UPDATE':
      return {
        ...state,...action.data
      }
    default:
      return state
  }
}
const Usereduser = () => {
  const [user, userDispatch] = useReducer(userReducer, {} as User)


  return(
    { user, userDispatch }
  )
}

export default Usereduser
