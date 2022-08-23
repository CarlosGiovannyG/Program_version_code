import React, { FC, useState } from 'react'
import { useMutation } from 'react-apollo';
import { DatePicker, Button, Table } from 'vtex.styleguide'

import { PropsShedule } from '../interfaces/interfaceData';
import { ModalComponent } from './ModalComponent';
import CREATE_DOCUMENT from '../graphql/createDocuments.graphql'
import { getOneDocument } from '../hooks/getOneDocument';
import { createdDocument } from '../hooks/useCreateDoc';
import { AlertInformation } from './AlertInformation';
import '../styles.global.css'
import { schemaShedule } from '../schemas/schemasGlobals';


export const SheduleEvent: FC<PropsShedule> = ({ isOpen, onClose, idVersion }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [created, setCreated] = useState(false)
  const { result } = getOneDocument(
    "ZZ",
    idVersion, [
    'id_existent',
    'name',
  ])


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

    const newEvent = [
      {
        key: 'actual_date',
        value: new Date(),
      },
      {
        key: 'id_existent',
        value: result[0].id_existent
      },
      {
        key: 'name',
        value: result[0].name,
      },
      {
        key: 'new_date',
        value: currentDate,
      },
      {
        key: 'state',
        value: 'pending'
      }
    ]

    console.log('===> INFORMATION LOG', newEvent);
    createdDocument(createDocument, "RM", newEvent)
    setTimeout(() => {
      onClose()
    }, 4000);
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
      <Table
        schema={schemaShedule()}
        items={result}
      />
      <div className='picker'>
        <div className='containerPicker' >
          <DatePicker
            label={<h2>Seleccionar Fecha</h2>}
            minDate={new Date()}
            value={currentDate}
            onChange={(date: any) => setCurrentDate(date)}
            locale="es-ES"
          />
        </div>
        <div className='containerButton'>
          <Button
            onClick={handleClick}
            variation="primary">
            Pragramar Version
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
};
