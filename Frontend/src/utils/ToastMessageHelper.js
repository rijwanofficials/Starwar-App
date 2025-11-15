import { Bounce, toast } from "react-toastify";

const ShowErrorToast = (txt) => {
    toast.error(txt, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
    });
};

const ShowSuccessToast = (txt, options = {}) => {
    toast.success(txt, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
        ...options,
    });
};

export { ShowErrorToast, ShowSuccessToast };
