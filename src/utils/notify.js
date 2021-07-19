import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
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
export const confirmation = (data) => {
  confirmAlert(data);
}
