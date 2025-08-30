import { createSlice } from "@reduxjs/toolkit";

const initialState = {userId:null, username:null}


const userSlice = createSlice({ name:"auth",
    initialState,
    reducers:{
        setUserProfile: (state, action) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;

          },
          clearAuth: (state) => {
            state.userId = null;
            state.username = null;

          },
    }
}
)

export const{setUserProfile,clearAuth}= userSlice.actions
export default userSlice.reducer;