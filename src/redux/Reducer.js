import * as types from "./actionTypes";

const initialState = {
  appointments: [],
  sliderImage: [],
  aboutInfo: [],
  doctorList: [],
  services: [],
  gallery: [],
  blogs: [],
  totalAppointments:0,
  loader:false,
  clinicData: [{ rooms: 0, dentists: 0, machines: 0, patients: 0, _id: 0 }],
};

const appointmentReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.SET_LOADER:
      return {
        ...state,
        loader:payload
      };
    case types.GET_APPOINTMENTS:
      return {
        ...state,
        totalAppointments : payload.total,
        appointments: payload.appointments,
      };
    case types.DELETE_APPOINTMENTS:
      const delAppointment = state.appointments.findIndex(
        (item) => item._id === payload
      );
      const delAPP = [...state.appointments];
      if (delAppointment > -1) {
        delAPP.splice(delAppointment, 1);
      }
      return {
        ...state,
        appointments: delAPP
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

    case types.GET_SERVICES:
      return {
        ...state,
        services: payload,
      };
    case types.ADD_SERVICES:
      const newServ = [...state.services, payload];
      return {
        ...state,
        services: newServ,
      };
    case types.UPDATE_SERVICES:
      const editSerIndex = state.services.findIndex(
        (item) => item._id === payload._id
      );
      const updatedserv = [...state.services];
      if (editSerIndex) {
        updatedserv[editSerIndex] = payload;
      }
      return {
        ...state,
        services: updatedserv,
      };
    case types.DELETE_SERVICES:
      const delSerIndex = state.services.findIndex(
        (item) => item._id === payload
      );
      const delSer = [...state.services];
      if (delSerIndex > -1) {
        delSer.splice(delSerIndex, 1);
      }
      return {
        ...state,
        services: delSer,
      };
    case types.ADD_GAL_IMAGE:
      let addedGalImage = [...state.gallery, payload];

      return {
        ...state,
        gallery: addedGalImage,
      };
    case types.GET_GAL_IMAGE:
      return {
        ...state,
        gallery: payload.images,
      };
    case types.DELETE_GAL_IMAGE:
      let newgal = [...state.gallery];
      const galIndex = state.gallery.findIndex((item) => item._id === payload);
      if (galIndex > -1) {
        newgal.splice(galIndex, 1);
      }
      return {
        ...state,
        gallery: newgal,
      };
    case types.ADD_BLOG:
      let addedBlog = [...state.blogs, payload];

      return {
        ...state,
        blogs: addedBlog,
      };
    case types.GET_BLOG:
      return {
        ...state,
        blogs: payload,
      };
    case types.DELETE_BLOG:
      let newBlog = [...state.blogs];
      const blogIndex = state.blogs.findIndex((item) => item._id === payload);
      if (blogIndex > -1) {
        newBlog.splice(blogIndex, 1);
      }
      return {
        ...state,
        blogs: newBlog,
      };
    case types.UPDATE_BLOG:
      const editBlog = state.blogs.findIndex(
        (item) => item._id === payload._id
      );
      const updatedBlog = [...state.blogs];
      if (editBlog) {
        updatedBlog[editBlog] = payload;
      }
      return {
        ...state,
        blogs: updatedserv,
      };
    case types.GET_CLINIC_DATA:
      return {
        ...state,
        clinicData: payload,
      };

    case types.UPDATE_CLINIC_DATA:
      const editedCLIndex = state.clinicData.findIndex(
        (item) => item._id === payload._id
      );
      const updatedClInfo = [...state.clinicData];
      if (editedCLIndex) {
        updatedClInfo[editedCLIndex] = payload;
      }

      return {
        ...state,
        clinicData: updatedClInfo,
      };

    default:
      return state;
  }
};

export default appointmentReducer;
