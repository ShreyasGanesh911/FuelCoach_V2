import {Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export  function MyToastSuccess(msg:string){
    toast.success(` ${msg}!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition:Bounce,
        
        
        });
}
export  function MyToastWarn(msg:string){
    toast.warn(` ${msg}!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition:Bounce,
        
        
        });
}
export  function MyToastError(msg:string){
    toast.error(` ${msg}!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition:Bounce,
        
        
        });
}