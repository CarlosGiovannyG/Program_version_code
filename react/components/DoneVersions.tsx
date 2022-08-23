import React, { FC, useState } from 'react'
import { useModal } from '../hooks/useModal';
import { PropsMasterVersions } from '../interfaces/interfaceData';
import { SheduleEvent } from './SheduleEvent';
import { PageBlock, Table } from 'vtex.styleguide'
import '../styles.global.css'
import { schemaDoneVersions } from '../schemas/schemaDoneVersions';

export const DoneVersions: FC<PropsMasterVersions> = ({ data }) => {
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
        title="Done Versions"
        subtitle="Versiones que fueron programadas"
      >
        <div className='styleTable'>
          <Table
            schema={schemaDoneVersions(sowModal)}
            items={data}
          />
        </div>
      </PageBlock>
    </div>
  );
};
