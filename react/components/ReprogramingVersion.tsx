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
import UPDATE_DOCUMENT
  from '../graphql/updateDocuments.graphql'
import { AlertInformation } from './AlertInformation';
import { format } from 'date-fns';
import { FormattedMessage } from "react-intl"
import axios from 'axios';

export const
  ReprogramingVersion: FC<PropsEditDelEventRepr> = (
    { isOpen, onClose, idVersion }) => {
    const [success, setSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [message, setMesagge] = useState("")
    const { result } = getOneDocument(
      "RM",
      idVersion, [
      'id_existent',
      'name',
      'actual_date',
      'new_date',
      'state'
    ])
    const [updateDocument] = useMutation(UPDATE_DOCUMENT, {
      onCompleted: async(data) => {
        if (data.updateDocument.id) {
          const response = await axios.get("https://carlosgiovanny--tiendasjumboqaio.myvtex.com/shedule")

          try {
            console.log(response.data)
          } catch (error) {
            console.log(error)
          }
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
    const handleClick =async () => {
      let fields: any;

      fields = [
        {
          key: 'id',
          value: result[0].id,
        },
        {
          key: 'actual_date',
          value: result[0].actula_date,
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

      await axios.get("https://carlosgiovanny--tiendasjumboqaio.myvtex.com/shedule")
        .then(resp => {

          console.log("RESPONSE", resp.data.message)
          setMesagge(resp.data.message)

        }).catch(error => {
          console.log("RESPONSE err", error)
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
              minDate={new Date()}
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
