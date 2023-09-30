import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
    admin: string;
}

const initialState: AdminState = {
    admin: "",
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      login: (state, action: PayloadAction<string>) => {
        state.admin = action.payload;
      },
      logout: (state) => {
        state.admin = "";
        localStorage.removeItem("adminData");
      },
    },
  });

  export const { login, logout } = adminSlice.actions;
export const selecttutor = (state: { admin: AdminState }) => state.admin.admin;

export default adminSlice.reducer;
