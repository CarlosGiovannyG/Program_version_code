import React, { FC, useState } from 'react'
import { useMutation } from 'react-apollo';
import {
  Table,
  ButtonWithIcon,
  IconCheck
} from 'vtex.styleguide'
import { getOneDocument } from '../hooks/getOneDocument';
import { PropsEditDelEventRepr }
  from '../interfaces/interfaceData';
import { schemaEditDelRepr } from '../schemas/schemasGlobals';
import { ModalComponent } from './ModalComponent';
import DELETE_VERSION
  from '../graphql/deleteDocuments.graphql'
import { AlertInformation } from './AlertInformation';
import { FormattedMessage } from "react-intl"


export const
  DeleteEvent: FC<PropsEditDelEventRepr> = (
    { isOpen, onClose, idVersion }
  ) => {
    const [success, setSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [stateConfirm, setStateConfirm] = useState(false)
    const { result } = getOneDocument(idVersion)

    const [
      deleteVersion
    ] = useMutation(DELETE_VERSION, {
      onCompleted: (data) => {
        if (data.deleteVersion.success) {
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

    const confirm = () => {
      setStateConfirm(true)
    }

    const versiondeleted = {
      "id": result[0].id,
      "id_existent": result[0].id_existent,
      "name": result[0].name,
      "actual_date": result[0].actual_date,
      "new_date": result[0].actual_date||new Date(),
      "state": result[0].state,
      "num_version": result[0].num_version
    }

    const handleClick = () => {
      deleteVersion({
        variables: {
          version: versiondeleted
        }
      })

      setTimeout(() => {
        onClose()
      }, 3000);

    }
    if (success) {
      return <AlertInformation
        message={<FormattedMessage
          id="admin-programversion.message-delete-loading"
        />}
        // message='Eliminando Información....'
        type='success'
      />
    }
    if (isError) {
      return <AlertInformation
        message={<FormattedMessage
          id="admin-programversion.message-error"
        />}
        // message='Se produjo un error....'
        type='error'
      />
    }
    return (
      <>
        <ModalComponent
          isOpen={isOpen}
          onClose={onClose}>
          <Table
            schema={schemaEditDelRepr()}
            items={result}
          />
          <div className='picker'>
            <div className='containerButton'>
              <ButtonWithIcon
                onClick={confirm}
                icon={<IconCheck
                  size={30}
                  color={'red'}
                />}
                variation='tertiary'
              >
                <FormattedMessage
                  id="admin-programversion.message-delete"
                />
              </ButtonWithIcon>
            </div>
          </div>
        </ModalComponent>
        {stateConfirm &&
          <ModalComponent
            isOpen={isOpen}
            onClose={onClose}>
            <AlertInformation
              message={<FormattedMessage
                id="admin-programversion.delete-confirmation"
              />}
              type='warning'
            />
            <div className='picker'>
              <div className='containerButton'>
                <ButtonWithIcon
                  onClick={handleClick}
                  icon={<IconCheck
                    size={30}
                    color={'red'}
                  />}
                  variation='tertiary'
                >
                  <FormattedMessage
                    id="admin-programversion.message-delete"
                  />
                </ButtonWithIcon>
              </div>
            </div>
          </ModalComponent>
        }
      </>
    );
  };
