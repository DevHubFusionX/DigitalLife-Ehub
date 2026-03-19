"use client";

import { useModal } from "@/context/ModalContext";
import ConsultationModal from "../registration/ConsultationModal";

export default function ModalRenderer() {
    const { isModalOpen, closeModal } = useModal();
    
    return (
        <ConsultationModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
        />
    );
}
