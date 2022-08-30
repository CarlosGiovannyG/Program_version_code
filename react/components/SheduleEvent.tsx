import React, { FC, useState } from 'react'
import { useMutation } from 'react-apollo';
import {
  DatePicker,
  ButtonWithIcon,
  IconCheck,
  Table,
  Alert
} from 'vtex.styleguide'
import { addDays} from 'date-fns'
import { PropsShedule } from '../interfaces/interfaceData';
import { ModalComponent } from './ModalComponent';
import CREATE_DOCUMENT
  from '../graphql/createDocuments.graphql'
import { createdDocument } from '../hooks/useCreateDoc';
import { AlertInformation } from './AlertInformation';
import { schemaShedule } from '../schemas/schemasGlobals';
import { FormattedMessage } from "react-intl"
import { getAllVersions } from '../hooks/getAllVersions';
import '../styles.global.css'
import axios from 'axios';

export const
  SheduleEvent: FC<PropsShedule> = (
    { isOpen, onClose, idVersion }) => {
    const [currentDate, setCurrentDate ] = useState(new Date())
    const [created, setCreated] = useState(false)
    const [isError, setIsError] = useState(false)
    const [message,setMesagge ] = useState("")
    const { versBack } = getAllVersions()

    const result = versBack.find(
      (ele: any) => ele.id_existent === idVersion)

    const [createDocument] = useMutation(CREATE_DOCUMENT, {
      onCompleted:async (data) => {
        if (data.createDocument.id) {
          setCreated(true)
         await axios.get("https://carlosgiovanny--tiendasjumboqaio.myvtex.com/shedule")
            .then(resp => {

              console.log("RESPONSE", resp.data.message)
              setMesagge(resp.data.message)

            }).catch(error => {
              console.log("RESPONSE err", error)
            })

          setTimeout(() => {
            setCreated(false)
          }, 3000);
        }
      },
      onError: (error) => {
        console.error('===> INFORMATION LOG ERROR', error);
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 4000);

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
          value: result.id_existent
        },
        {
          key: 'name',
          value: result.name,
        },
        {
          key: 'new_date',
          value: currentDate,
        },
        {
          key: 'state',
          value: 'pending'
        },
        {
          key: 'num_version',
          value: result.num_version
        }
      ]

     createdDocument(createDocument, "RM", newEvent)



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
