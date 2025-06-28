import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadingScreenOpen: true
}

const loadingSlice = createSlice({
  name: "loading", 
  initialState,
  reducers: {
    openLoadingScreen: (state) => {
      state.loadingScreenOpen = true
    },
    closeLoadingScreen: (state) => {
      state.loadingScreenOpen = false
    },
  }
})

export const { openLoadingScreen, closeLoadingScreen } = loadingSlice.actions

export default loadingSlice.reducer