import { configureStore} from '@reduxjs/toolkit'
import companyReducer from './reducers/companySlice'




export default configureStore({
  reducer: {
    companies: companyReducer
  }
})