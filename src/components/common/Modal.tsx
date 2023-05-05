import React from "react";

interface ModalIType {
    children? : React.ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

const Modal = (props: ModalIType) => {
    if (!props.isOpen) return null;

    return ( 
        <>
            <div className="modal-overlay" onClick={props.toggle}>
                <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default Modal;