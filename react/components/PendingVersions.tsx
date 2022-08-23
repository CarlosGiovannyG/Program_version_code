import React, { FC, useState } from 'react'
import { PageBlock, Table } from 'vtex.styleguide'
import { useModal } from '../hooks/useModal';
import { PropsMasterVersions } from '../interfaces/interfaceData';
import { schemaPendingVersions } from '../schemas/schemaPendingVersions';
import '../styles.global.css'
import { SheduleEvent } from './SheduleEvent';


export const PendingVersions: FC<PropsMasterVersions> = ({ data }) => {
  const { handleModal, isOpen } = useModal()
  const [idVersion, setIdVersion] = useState<string>('');

  const sowModal = (e: any, id: string) => {
    e.preventDefault()

    handleModal()
    setIdVersion(id)
  }

  return (
    <div>
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
        title="Pending Version"
        subtitle="Versiones pendientes por salir a producción"
      >
        <div className='styleTable'>
          <Table
            schema={schemaPendingVersions(sowModal)}
            items={data}
          />
        </div>
      </PageBlock>
    </div>
  );
};
