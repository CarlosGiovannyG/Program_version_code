import React, {
  FC,
  useState
} from 'react'
import {
  useMutation
} from 'react-apollo';
import {
  Table,
  ButtonWithIcon,
  IconCheck
} from 'vtex.styleguide'
import {
  getOneDocument
} from '../hooks/getOneDocument';
import {
  PropsEditDelEventRepr
} from '../interfaces/interfaceData';
import {
  schemaEditDelRepr
} from '../schemas/schemasGlobals';
import {
  ModalComponent
} from './ModalComponent';
import DELETE_DOCUMENT
  from '../graphql/deleteDocuments.graphql'
import {
  AlertInformation
} from './AlertInformation';
import { FormattedMessage } from "react-intl"


export const
  DeleteEvent: FC<PropsEditDelEventRepr> = (
    {
      isOpen,
      onClose,
      idVersion
    }
  ) => {
    const [success, setSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [stateConfirm, setStateConfirm] = useState(false)
    const [idDelete, setIdDelete] = useState('')
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
      deleteDocument
    ] = useMutation(DELETE_DOCUMENT, {
      onCompleted: (data) => {
        if (data.deleteDocument.id) {

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
      setIdDelete(result[0].id)
      setStateConfirm(true)
    }

    const handleClick = () => {
      deleteDocument({
        variables: {
          acronym: "RM",
          idDocument: idDelete,
        }
      })

      setTimeout(() => {
        onClose()
      }, 4000);

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
                  id="admin-programversion.delete-button-text"
                />
                {/* Eliminar Versión */}
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
              // message='Al dar click se eliminará la version....'
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
