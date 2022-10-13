import React, { FC, useState } from 'react'
import { useMutation } from 'react-apollo';
import {
  Table,
  DatePicker,
  ButtonWithIcon,
  Alert,
  IconCheck,
} from 'vtex.styleguide'
import { getOneDocument } from '../hooks/getOneDocument';
import { PropsEditDelEventRepr }
  from '../interfaces/interfaceData';
import { schemaEditDelRepr } from '../schemas/schemasGlobals';
import { ModalComponent } from './ModalComponent';
import UPDATE_VERSION
  from '../graphql/updateDocuments.graphql'
import { AlertInformation } from './AlertInformation';
import { addDays } from 'date-fns';
import { FormattedMessage } from "react-intl"

export const
  ReprogramingVersion: FC<PropsEditDelEventRepr> = (
    { isOpen, onClose, idVersion }:any) => {
    const [success, setSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [message, setMessage] = useState("")
    const { result } = getOneDocument(idVersion)
    const [updateVersion] = useMutation(UPDATE_VERSION, {
      onCompleted: async(data:any) => {
        if (data.updateVersion.success) {

          setSuccess(true)

          setTimeout(() => {
            setSuccess(false)
          }, 4000);
        }
      },
      onError(error:any) {
        console.log('===> INFORMATION LOG ERROR', error);
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 4000);
      },
    })
    const handleClick =async () => {
      const versionUpdated = {
        "id": result[0]?.id,
        "id_existent": result[0]?.id_existent,
        "name": result[0]?.name,
        "actual_date": result[0]?.actual_date,
        "new_date": currentDate,
        "state": result[0]?.state,
        "num_version": result[0]?.num_version
      }


      updateVersion({
        variables: {
          version: versionUpdated
        }
      })

      setTimeout(() => {
        setMessage("")
        onClose()
      }, 4000);

    }

    if (message) {
      return <Alert
        type={'success'}
      >
        {message}
      </Alert>
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
              label={<h2><FormattedMessage
                id="admin-programversion.title-select-date"
              /></h2>}
              minDate={addDays(new Date(), 1)}
              value={currentDate}
              onChange={(date: any) => setCurrentDate(date)}
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
            </ButtonWithIcon>
          </div>
        </div>
      </ModalComponent>
    );
  };
