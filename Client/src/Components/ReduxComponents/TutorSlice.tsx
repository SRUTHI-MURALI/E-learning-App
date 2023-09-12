
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface TutorState{
    tutor:string;
}

const initialState : TutorState={
    tutor:'',
}

const tutorSlice= createSlice({
    name:'tutor',
    initialState,
    reducers:{
        login : (state,action:PayloadAction<string>)=>{
            state.tutor=action.payload;
        },
        logout:(state)=>{
            state.tutor='' ;
        },
    },
})

export const {login,logout}= tutorSlice.actions;
export const  selecttutor=(state:{tutor:TutorState})=>state.tutor.tutor

export default tutorSlice.reducer
