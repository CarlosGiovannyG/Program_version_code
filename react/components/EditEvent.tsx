import React, { FC, useState } from 'react'
import { useMutation } from 'react-apollo';
import {
  Table,
  DatePicker,
  ButtonWithIcon,
  IconCheck
} from 'vtex.styleguide'
import { format } from 'date-fns'
import UPDATE_DOCUMENT
  from '../graphql/updateDocuments.graphql'
import { PropsEditDelEventRepr }
  from '../interfaces/interfaceData';
import { schemaEditDelRepr } from '../schemas/schemasGlobals';
import { ModalComponent } from './ModalComponent';
import { AlertInformation } from './AlertInformation';
import { getOneDocument } from '../hooks/getOneDocument';
import { FormattedMessage } from "react-intl"
import '../styles.global.css'


export const
  EditEvent: FC<PropsEditDelEventRepr> = (
    { isOpen, onClose, idVersion }
  ) => {
    const [success, setSuccess] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [isError, setIsError] = useState(false)
    const { result } = getOneDocument(
      "RM",
      idVersion, [
      'id_existent',
      'name',
      'actual_date',
      'new_date',
      'state'
    ])

    const [
      updateDocument
    ] = useMutation(UPDATE_DOCUMENT, {
      onCompleted: (data) => {
        if (data.updateDocument.id) {

          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 4000);
        }
      },
      onError(error) {
        console.log('===> INFORMATION LOG ERROR', error);
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 4000);
      },
    })

    const handleClick = () => {
      let fields: any;

      fields = [
        {
          key: 'id',
          value: result[0].id,
        },
        {
          key: 'actual_date',
          value: result[0].new_date,
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
          value: format(currentDate, 'yyyy-MM-dd'),
        },
        {
          key: 'state',
          value: 'pending'
        }
      ]

      updateDocument({
        variables: {
          acronym: "RM",
          document: {
            fields: fields
          }
        }
      })

      setTimeout(() => {
        onClose()
      }, 4000);

    }
    if (success) {
      return <AlertInformation
        message={<FormattedMessage
          id="admin-programversion.alert-update-information"
        />}
        type='success'
      />
    }
    if (isError) {
      return <AlertInformation
        message={<FormattedMessage
          id="admin-programversion.message-error"
        />}
        type='error'
      />
    }
    return (
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}>
        <Table
          schema={schemaEditDelRepr()}
          items={result}
        />
        <div className='picker'>
          <div className='containerPicker' >
            <DatePicker
              label={<h2>
                <FormattedMessage
                  id="admin-programversion.title-select-date"
                />
                {/* Seleccionar Fecha */}
              </h2>}
              minDate={new Date()}
              value={currentDate}
              onChange={(
                date: any
              ) => setCurrentDate(date)}
              locale="en-US"
            />
          </div>
          <div className='containerButton'>
            <ButtonWithIcon
              onClick={handleClick}
              icon={<IconCheck
                size={30}
                color={'green'}
              />}
              variation='tertiary'
            >
              <FormattedMessage
                id="admin-programversion.text-confirm-date"
              />
              {/* Confirmar Nueva Fecha */}
            </ButtonWithIcon>
          </div>
        </div>
      </ModalComponent>
    );
  };
