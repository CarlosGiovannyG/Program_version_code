import React, {
  FC,
  useState
} from 'react'
import {
  useMutation
} from 'react-apollo';
import {
  DatePicker,
  ButtonWithIcon,
  IconCheck,
  Table
} from 'vtex.styleguide'

import {
  PropsShedule
} from '../interfaces/interfaceData';
import {
  ModalComponent
} from './ModalComponent';
import CREATE_DOCUMENT
  from '../graphql/createDocuments.graphql'
import {
  createdDocument
} from '../hooks/useCreateDoc';
import {
  AlertInformation
} from './AlertInformation';
import '../styles.global.css'
import {
  schemaShedule
} from '../schemas/schemasGlobals';
import {
  format
} from 'date-fns';
import { getAllVersions } from '../hooks/getAllVersions';


export const
  SheduleEvent: FC<PropsShedule> = (
    {
      isOpen,
      onClose,
      idVersion
    }
  ) => {
    const [
      currentDate,
      setCurrentDate
    ] = useState(new Date())
    const [created, setCreated] = useState(false)
    const [isError, setIsError] = useState(false)
    const { versBack} = getAllVersions()

    const result = versBack.find((ele:any) => ele.id_existent === idVersion)


console.log('===> INFORMATION LOG', result);

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
          value: format(new Date(),
            'yyyy-MM-dd'),
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
          value: format(currentDate, 'yyyy-MM-dd'),
        },
        {
          key: 'state',
          value: 'pending'
        }
      ]

      createdDocument(createDocument, "RM", newEvent)
      setTimeout(() => {
        onClose()
      }, 3000);
    }


    if (created) {
      return <AlertInformation
        message='Guardando Información....'
        type='success'
      />
    }
    if (isError) {
      return <AlertInformation
        message='Ocurrio un error....'
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
              label={<h2>Seleccionar Fecha</h2>}
              minDate={new Date()}
              value={currentDate}
              onChange={(
                date: any
              ) => setCurrentDate(date)}
              locale="es-ES"
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
              Confirmar Fecha
            </ButtonWithIcon>
          </div>
        </div>
      </ModalComponent>
    );
  };
