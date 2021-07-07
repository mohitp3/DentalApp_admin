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
export const updateAboutInfo = (data) => ({
  type: types.UPDATE_ABOUTINFO,
  payload:data
});
export const deleteAboutInfo = (id) => ({
  type: types.DELETE_ABOUTINFO,
  payload:id
});


export const addDoctor = (data) => ({
  type: types.ADD_DOCTOR,
  payload:data
});
export const getDoctorList = (data) => ({
  type: types.GET_DOCTORLIST,
  payload:data
});
export const updateDoctor = (data) => ({
  type: types.UPDATE_DOCTOR,
  payload:data
});
export const deleteDoctor = (id) => ({
  type: types.DELETE_DOCTOR,
  payload:id
});