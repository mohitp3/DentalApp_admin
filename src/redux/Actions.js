import * as types from "./actionTypes";
import axios from "axios";

export const setLoader = (data) => ({
  type: types.SET_LOADER,
  payload: data,
});

export const getAppointments = (data) => ({
  type: types.GET_APPOINTMENTS,
  payload: data,
});

export const deleteAppointment = (index,notify) => {
  return (dispatch) => {
    axios
      .delete(process.env.REACT_APP_PROD_URL + "api/deleteAppointment/" + index)
      .then((response) => {
        dispatch({
          type: types.DELETE_APPOINTMENTS,
          payload: index,
        });
        notify("success", "Deleted Successfully")
      })
      .catch((err) => {
        notify("error", "Error in Deleting")
      });
  };
};

export const getSliderImage = (data) => ({
  type: types.GET_SLIDERIMAGE,
  payload: data,
});

export const deleteSliderImage = (index) => ({
  type: types.DELETE_SLIDERIMAGE,
  payload: index,
});

export const addSliderImage = (data) => ({
  type: types.ADD_SLIDERIMAGE,
  payload: data,
});

export const getAboutInfo = (data) => ({
  type: types.GET_ABOUTINFO,
  payload: data,
});
export const addAboutInfo = (data) => ({
  type: types.ADD_ABOUTINFO,
  payload: data,
});
export const updateAboutInfo = (data) => ({
  type: types.UPDATE_ABOUTINFO,
  payload: data,
});
export const deleteAboutInfo = (id) => ({
  type: types.DELETE_ABOUTINFO,
  payload: id,
});

export const addDoctor = (data) => ({
  type: types.ADD_DOCTOR,
  payload: data,
});
export const getDoctorList = (data) => ({
  type: types.GET_DOCTORLIST,
  payload: data,
});
export const updateDoctor = (data) => ({
  type: types.UPDATE_DOCTOR,
  payload: data,
});
export const deleteDoctor = (id) => ({
  type: types.DELETE_DOCTOR,
  payload: id,
});

export const getServices = (data) => ({
  type: types.GET_SERVICES,
  payload: data,
});
export const addService = (data) => ({
  type: types.ADD_SERVICES,
  payload: data,
});
export const updateService = (data) => ({
  type: types.UPDATE_SERVICES,
  payload: data,
});
export const deleteService = (id) => ({
  type: types.DELETE_SERVICES,
  payload: id,
});

export const addGalleryImage = (data) => ({
  type: types.ADD_GAL_IMAGE,
  payload: data,
});
export const getGalleryImage = (data) => ({
  type: types.GET_GAL_IMAGE,
  payload: data,
});
export const deleteGalleryImage = (id) => ({
  type: types.DELETE_GAL_IMAGE,
  payload: id,
});

export const getBlog = (data) => ({
  type: types.GET_BLOG,
  payload: data,
});
export const addBlog = (data) => ({
  type: types.ADD_BLOG,
  payload: data,
});
export const deleteBlog = (id) => ({
  type: types.DELETE_BLOG,
  payload: id,
});
export const updateBlog = (data) => ({
  type: types.UPDATE_BLOG,
  payload: data,
});

export const getClinicData = (data) => ({
  type: types.GET_CLINIC_DATA,
  payload: data,
});
export const updateClinicData = (data) => ({
  type: types.UPDATE_CLINIC_DATA,
  payload: data,
});


export const getAppointmentinit = (page=1,limit=5) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    axios
      .get(process.env.REACT_APP_PROD_URL + "api/getAppointments?page="+page+"&limit="+limit)
      .then((response) => {
        dispatch(getAppointments(response.data));
        dispatch(setLoader(false));
      })
      .catch((err) => {
        dispatch(getAppointments([]));
      });
  };
};