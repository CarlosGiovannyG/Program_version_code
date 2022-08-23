import React from 'react';
import {
  Modal
} from 'vtex.styleguide'
import {
  PropsModalComponent
} from '../interfaces/interfaceData';
import '../styles.global.css'


export const
  ModalComponent = (
    {
      children,
      onClose,
      isOpen
    }: PropsModalComponent) => {

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className='styledModal' >
          {children}
        </div>
      </Modal>
    )
  }

