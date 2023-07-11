import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import React from "react";
import './message.css';

export default function SuccessMessage(msg) {
    console.log('success')
    return (
        <>
            {toast.success(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })}
        </>
    )
}

export const ErrorMessage = (msg) => {
    console.log('error')
    return (
        <>
            {toast.error(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })}
        </>
    )
}

export const Loader = (props) => {

    return (
        <div className={props.clss ?props.clss : "loader-contentV1"}>
            <div className="loader">
                <div className="loading"></div>
                <h5>Loading...</h5>
            </div>
        </div>

    );
}
// export default SuccessMessage;