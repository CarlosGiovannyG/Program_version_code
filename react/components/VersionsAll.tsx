import React, { useState } from 'react'
import { PageBlock, Table } from 'vtex.styleguide'
import { useModal } from '../hooks/useModal';
import { PropsDataBack } from '../interfaces/interfaceData';
import { schemaAllVersions } from '../schemas/schemaAllVersions';
import { SheduleEvent } from './SheduleEvent';
import '../styles.global.css'

interface Props {
    data: PropsDataBack[]
}

export const VersionsAll = ({ data }: Props) => {
    const { handleModal, isOpen } = useModal()
    const [idVersion, setIdVersion] = useState<string>('');

    const sowModal = (e: any, id: string) => {
        e.preventDefault()

        handleModal()
        setIdVersion(id)
    }

    return (
        <div className='container'>
            {
                isOpen &&
                <SheduleEvent
                    idVersion={idVersion}
                    isOpen={true}
                    onClose={handleModal}
                    event='schedule'

                />
            }
            <PageBlock
                variation="full"
                title="Backend Versions"
                subtitle="Programá una versión expecifica para que salga a producción"

            >
                <div className='styleTable'>
                    <Table
                        schema={schemaAllVersions(sowModal)}
                        items={data}
                    />
                </div>

            </PageBlock>
        </div>
    );
};
