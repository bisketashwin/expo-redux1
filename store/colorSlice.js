
////https://redux-toolkit.js.org/usage/usage-with-typescript#createslice

import { createSlice } from "@reduxjs/toolkit";
import ColorNameConverter from "../plugIns/ColorNameConverter";

const initialState = {
  value: [],
};


function rgbToHex(red, green, blue) {
  // Convert each component to a hexadecimal string and pad with zeros if needed
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');
  
  // Combine the components to form the hex color code
  return `#${redHex}${greenHex}${blueHex}`;
}

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const hexColor = rgbToHex(red,green,blue)
  const color = `rgb(${red}, ${green}, ${blue})`
  return ({color,hexColor});
};

const generateColorName = ()=>{
  const inputColor = randomRgb()
  const {rgbColor,hexColor} = inputColor
  const colorName = ColorNameConverter(hexColor)
  console.log(colorName)

  return(
    color
  )
}

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state) => {
      state.value = [...state.value, generateColorName()];
    },
    editColor: (state, action) => {
      const [oldColor, newColor] = action.payload;
      console.log(action.payload);
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
export const { setColor, editColor, deleteColor } = colorSlice.actions;

export default colorSlice.reducer;
