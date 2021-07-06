import * as types from "./actionTypes";

export const getAppointments = (data) => ({
  type: types.GET_APPOINTMENTS,
  payload:data
});

export const getSliderImage = (data) => ({
  type: types.GET_SLIDERIMAGE,
  payload:data
});

export const deleteSliderImage = (index) => ({
  type: types.DELETE_SLIDERIMAGE,
  payload:index
});

export const addSliderImage = (data) => ({
  type: types.ADD_SLIDERIMAGE,
  payload:data
});



export const getAboutInfo = (data) => ({
  type: types.GET_ABOUTINFO,
  payload:data
});
export const addAboutInfo = (data) => ({
  type: types.ADD_ABOUTINFO,
  payload:data
});