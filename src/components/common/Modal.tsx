import React from "react";

interface ModalIType {
    children? : React.ReactNode;
    width?: string,
    isOpen: boolean;
    toggle: () => void;
}

const Modal = (props: ModalIType) => {
    if (!props.isOpen) return null;

    return ( 
        <>
            <div className="modal-overlay" onClick={props.toggle}>
                <div className="modal-box" style={{width:props.width}} onClick={(e) => e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default Modal;