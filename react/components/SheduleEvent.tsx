import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-apollo';
import { createdDocument } from '../hooks/useCreatedDocument';
import { useQueryOneVersion } from '../hooks/useQueryOneVersion';
import { useScheduleEvent } from '../hooks/useScheduleEvent';
import { AlertInformation } from './AlertInformation';
import CREATE_DOCUMENT from '../graphql/createDocuments.graphql'
import { PropsSheduleEvent } from '../interfaces/interfaceData';
import { DatePicker } from 'vtex.styleguide'
import { addDays, format } from 'date-fns'
import { ModalComponent } from './ModalComponent';
import '../styles.global.css'

export const SheduleEvent = ({ idVersion, isOpen, onClose }: PropsSheduleEvent) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [created, setCreated] = useState(false)
    const { result, error, loading } = useScheduleEvent(idVersion, ["name", "id_existent"], "RM")

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

    useEffect(() => {
        if (!result.length && loading === false) {
            const { result } = useQueryOneVersion(idVersion)
            let fields: any;

            if (result) {
                const fecha = new Date();
                fields = [
                    {
                        key: 'actual_date',
                        value: fecha
                    },
                    {
                        key: 'id_existent',
                        value: result.id_existent
                    },
                    {
                        key: 'name',
                        value: result.name
                    },
                    {
                        key: 'new_date',
                        value: fecha
                    },
                    {
                        key: 'state',
                        value: result.state
                    }
                ]

            }

            createdDocument(createDocument, "RM", fields)


        }

    }, [loading])



    const onChange = (value: any) => {
        console.log('===> INFORMATION LOG currentDate', currentDate);
        console.log('===> INFORMATION LOG FECHA', format(new Date(value), 'MM/dd/yyyy'));
        setCurrentDate(value)
    }


    if (error) {
        return null
    }
    if (loading) {
        return <AlertInformation
            message='Obteniendo Información....'
            type='warning'
        />
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
                    maxDate={addDays(new Date(), 5)}
                    minDate={new Date()}
                    value={new Date()}
                    onChange={onChange}
                    locale="es-ES"
                />
            </div>
        </ModalComponent>

    );
};
