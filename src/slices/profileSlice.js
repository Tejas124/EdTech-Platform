import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const profileSLice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        }
    }
})
 
export const {setUser} = profileSLice.actions;
export default profileSLice.reducer

