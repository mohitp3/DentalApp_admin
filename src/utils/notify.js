import { toast } from "react-toastify";
const toastConf = {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  export const notify = (typeofToast, message) => {
    if (typeofToast == "success") {
      toast.info(message, toastConf);
    } else {
      toast.error(message, toastConf);
    }
  };