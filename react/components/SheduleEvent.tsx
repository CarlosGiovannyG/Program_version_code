import React, { FC, useState } from 'react'
import { useMutation } from 'react-apollo';
import {
  DatePicker,
  ButtonWithIcon,
  IconCheck,
  Table,
  Alert
} from 'vtex.styleguide'
import { addDays } from 'date-fns'
import { PropsShedule } from '../interfaces/interfaceData';
import { ModalComponent } from './ModalComponent';
import CREATE_VERSION
  from '../graphql/createDocuments.graphql'
import { AlertInformation } from './AlertInformation';
import { schemaShedule } from '../schemas/schemasGlobals';
import { FormattedMessage } from "react-intl"
import { getAllVersions } from '../hooks/getAllVersions';
import '../styles.global.css'


export const
  SheduleEvent: FC<PropsShedule> = (
    { isOpen, onClose, idVersion }:any) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [created, setCreated] = useState(false)
    const [isError, setIsError] = useState(false)
    const [message, setMesagge] = useState("")
    const { versBack } = getAllVersions()

    const result = versBack.find(
      (ele: any) => ele.id_existent === idVersion)

    const [createVersion] = useMutation(CREATE_VERSION, {
      onCompleted: async (data:any) => {
        if (data.createVersion.success) {
          setCreated(true)

          setMesagge("Tarea Programada")

          setTimeout(() => {
            setCreated(false)
          }, 3000);
        }
      },
      onError: (error:any) => {
        console.error('===> INFORMATION LOG ERROR', error);
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 4000);

      }
    })

    const handleClick = () => {

        createVersion({
          variables: {
            version:{
              "id_existent": result.id_existent,
              "name": result.name,
              "actual_date": new Date(),
              "new_date":  currentDate,
              "state": 'pending',
              "num_version": result.num_version
            }
          }
        })

      setTimeout(() => {
        setMesagge("")
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
    if (created) {
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
        onClose={onClose}
      >
        <Table
          schema={schemaShedule()}
          items={[result]}
        />
        <div className='picker'>
          <div className='containerPicker' >
            <DatePicker
              label={<h2><FormattedMessage
                id="admin-programversion.title-select-date"
              /></h2>}
              minDate={addDays(new Date(), 1)}
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
              <h2><FormattedMessage
                id="admin-programversion.text-confirm-date"
              /></h2>
            </ButtonWithIcon>
          </div>
        </div>
      </ModalComponent>
    );
  };
