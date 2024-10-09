import { createSlice } from "@reduxjs/toolkit";



const textSlice = createSlice({
    name: 'text',
    initialState:{
        inputText: ''
    },
    reducers:{
        setInputText: (state, action) => {
            state.inputText = action.payload
        }
    }
})

export const {setInputText} = textSlice.actions;
export default textSlice.reducer;