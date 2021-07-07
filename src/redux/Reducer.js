import * as types from "./actionTypes";

const initialState = {
  appointments: [],
  sliderImage: [],
  aboutInfo: [],
  doctorList: [],
};

const appointmentReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.GET_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
      };
    case types.GET_SLIDERIMAGE:
      return {
        ...state,
        sliderImage: payload,
      };
    case types.DELETE_SLIDERIMAGE:
      let newSLider = [...state.sliderImage];
      const index = state.sliderImage.findIndex((item) => item._id === payload);
      if (index > -1) {
        newSLider.splice(index, 1);
      }
      return {
        ...state,
        sliderImage: newSLider,
      };
    case types.ADD_SLIDERIMAGE:
      let addedImage = [...state.sliderImage, payload];

      return {
        ...state,
        sliderImage: addedImage,
      };
    case types.GET_ABOUTINFO:
      return {
        ...state,
        aboutInfo: payload,
      };
    case types.ADD_ABOUTINFO:
      const newInfo = [...state.aboutInfo, payload];
      return {
        ...state,
        aboutInfo: newInfo,
      };
    case types.UPDATE_ABOUTINFO:
      const editedIndex = state.aboutInfo.findIndex(
        (item) => item._id === payload._id
      );
      const updatedInfo = [...state.aboutInfo];
      if (editedIndex) {
        updatedInfo[editedIndex] = payload;
      }

      return {
        ...state,
        aboutInfo: updatedInfo,
      };
    case types.DELETE_ABOUTINFO:
      const delIndex = state.aboutInfo.findIndex(
        (item) => item._id === payload
      );
      const delAi = [...state.aboutInfo];
      if (delIndex > -1) {
        delAi.splice(delIndex, 1);
      }
      return {
        ...state,
        aboutInfo: delAi,
      };
    case types.GET_DOCTORLIST:
      return {
        ...state,
        doctorList: payload,
      };
    case types.ADD_DOCTOR:
      const newdoc = [...state.doctorList, payload];
      return {
        ...state,
        doctorList: newdoc,
      };
    case types.UPDATE_DOCTOR:
      const docIndex = state.doctorList.findIndex(
        (item) => item._id === payload._id
      );
      const docInfo = [...state.doctorList];
      if (docIndex) {
        docInfo[docIndex] = payload;
      }
      return {
        ...state,
        doctorList: docInfo,
      };
    case types.DELETE_DOCTOR:
      const delDocIndex = state.doctorList.findIndex(
        (item) => item._id === payload
      );
      const deldoc = [...state.doctorList];
      if (delDocIndex > -1) {
        deldoc.splice(delDocIndex, 1);
      }
      return {
        ...state,
        doctorList: deldoc,
      };

      

    default:
      return state;
  }
};

export default appointmentReducer;
