
////https://redux-toolkit.js.org/usage/usage-with-typescript#createslice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state) => {
      state.value = [...state.value, randomRgb()];
    },
    editColor: (state, action) => {
      const [ oldColor, newColor ] = action.payload;
      console.log( action.payload);
      console.log(oldColor, newColor);
      const index = state.value.indexOf(oldColor);
      if (index !== -1) {
        state.value[index] = newColor;
      }
    },
    deleteColor: (state, action) => {
      const colorToDelete = action.payload;
      
      state.value = state.value.filter((color) => color !== colorToDelete);
    },
  },
});

// Action creators are generated for each case reducer function
export const {  setColor, editColor, deleteColor } = colorSlice.actions;

export default colorSlice.reducer;


// case DELETE_USER:
//       // Implement logic to delete a user from the state by their ID
//       const updatedUsersDelete = state.users.filter((user) => user.id !== action.payload.id);
//       return { ...state, users: updatedUsersDelete };
//     case EDIT_USER:
//       // Implement logic to edit a user in the state by their ID
//       const updatedUsersEdit = state.users.map((user) =>
//         user.id === action.payload.oldUser.id ? action.payload.newUser : user