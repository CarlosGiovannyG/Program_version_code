import React, { FC } from 'react'
import { Alert } from 'vtex.styleguide'
import { PropsAlertInformation }
  from '../interfaces/interfaceData'


export const
  AlertInformation: FC<PropsAlertInformation> = (
    { message, type, onClose }) => {

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
