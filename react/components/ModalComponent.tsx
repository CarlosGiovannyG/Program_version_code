import React from 'react';
import {Modal} from 'vtex.styleguide'


interface Props {
  onClose: Function
  isOpen: boolean

}



export const ModalComponent = ({ onClose, isOpen }: Props) => {
  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}

  >
    <div className="dark-gray">
      <p>
        The Payments module is the system responsible for managing all
        actions regarding your store's cash flow.
      </p>

      <p>
        Before we explore the features within VTEX Admin Payments, let's
        clarify some important concepts regarding the payment flow of an
        order. This process is performed by some actors within the
        Brazilian financial system, which make up the Payments module
        architecture.
      </p>
      <div
        style={{
          backgroundColor: '#edf4fa',
          borderRadius: '4px',
          border: 'solid #368df7',
          borderWidth: '0 0 0 4px',
          boxSizing: 'border-box',
          padding: '12px 16px',
        }}>
        It is important to remember that each store has its own
        particularities and its own operation, which influence how to
        build your business' Payment module. To set up your cash flow, it
        is therefore crucial to keep in mind the real needs and purposes
        of the retailer and of the desired project.
      </div>
    </div>
  </Modal>
  )
}

