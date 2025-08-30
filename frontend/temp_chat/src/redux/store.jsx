import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSliceReduzer from './slice/UserProfileSlice.jsx'


const persistConfigAuth = {
    key:"auth",
    storage
}


const persistedAuth = persistReducer(persistConfigAuth,userSliceReduzer)

const store = configureStore({
    reducer :{
        auth:persistedAuth
    }
})

export const persistor = persistStore(store)
export default store