import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-apollo';
import { AlertInformation } from './AlertInformation';
import CREATE_DOCUMENT from '../graphql/createDocuments.graphql'
import UPDATE_DOCUMENT from '../graphql/updateDocuments.graphql'
import { PropsSheduleEvent } from '../interfaces/interfaceData';
import { DatePicker, Button } from 'vtex.styleguide'
import { ModalComponent } from './ModalComponent';
import '../styles.global.css'
import { createdDocument } from '../hooks/useCreatedDocument';
import { getOneDocument } from '../hooks/useQueryOneVersion';

export const SheduleEvent = ({ idVersion, isOpen, onClose, event }: PropsSheduleEvent) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [created, setCreated] = useState(false)
  const [acronym, setAcronym] = useState('')
  const { result} = getOneDocument(
    acronym,
    idVersion)
    const [updateDocument] = useMutation(UPDATE_DOCUMENT)



  useEffect(() => {
    switch (event) {
      case 'schedule':
        setAcronym("ZZ")
        break;
      default:
        setAcronym("RM")
    }
  }, [event])

  const [createDocument] = useMutation(CREATE_DOCUMENT, {
    onCompleted: (data) => {
      if (data.createDocument.id) {
        setCreated(true)
        setTimeout(() => {
          setCreated(false)
        }, 3000);
      }
    },
    onError: (error) => {
      console.log('===> INFORMATION LOG ERROR', error);

    }
  })


  const handleClick = () => {
    switch (event) {
      case 'schedule':
        const fields = {
          id_existent: result[0].id_existent,
          name: result[0].name,
          actual_date: new Date(),
          new_date: currentDate,
          state: 'pending'
        }
        createdDocument(createDocument, "RM", fields)
        break;
        case 'edit':
          const fieldsEdit = {
            id_existent: result[0].id_existent,
            name: result[0].name,
            actual_date: result[0].actual_date,
            new_date: currentDate,
            state: 'pending'
          }
          console.log('===> INFORMATION LOG', event,result);
        updateDocument({
          variables:{
            acronym:"RM",
            document:{
              fields:fieldsEdit
            }
          }
        })
        break;
    }

  }



  if (created) {
    return <AlertInformation
      message='Guardando Información....'
      type='success'
    />
  }




  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='containerPicker' >
        <DatePicker
          label="Date range"
          minDate={new Date()}
          value={currentDate}
          onChange={(date:any) => setCurrentDate( date )}
          locale="es-ES"
        />
      </div>
      <div>
        <Button
          onClick={handleClick}
          variation="primary" block>
          Pragramar Version
        </Button>
      </div>
    </ModalComponent>

  );
};
