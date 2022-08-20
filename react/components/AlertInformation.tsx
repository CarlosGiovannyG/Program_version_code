import React from 'react'
import { Alert } from 'vtex.styleguide'

interface Props {
    message: string
    type: "success" | "error" | "warning"
    onClose?: () => void
}

export const AlertInformation = ({ message, type, onClose
}: Props) => {


    return (
        <div>
            <Alert
                type={type}
                onClose={onClose}
            >
                {message}
            </Alert>
        </div>
    );
};
