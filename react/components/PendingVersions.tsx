import React, { useState } from 'react'
import { PageBlock, Table } from 'vtex.styleguide'
import { useModal } from '../hooks/useModal';
import { PropsVersions } from '../interfaces/interfaceData';
import { schemaPendingVersions } from '../schemas/schemaPendingVersions';
import { SheduleEvent } from './SheduleEvent';


interface Props {
  data: PropsVersions[]
}

export const PendingVersions = ({ data }: Props) => {
  const { handleModal, isOpen } = useModal()
  const [idVersion, setIdVersion] = useState<string>('');
  const [edit, setEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)


  const sowModal = (e: any, id: string, event: string) => {
    e.preventDefault()

    switch (event) {
      case 'edit':
        setEdit(true)
        break;
      case 'delete':
        setIsDelete(true)
        break
    }

    handleModal()
    setIdVersion(id)
  }

  return (
    <div>
      {
        isOpen && edit &&
        <SheduleEvent
          idVersion={idVersion}
          isOpen={true}
          onClose={handleModal}
          event='edit'
        />
      }
      {
        isOpen && isDelete &&
        <SheduleEvent
          idVersion={idVersion}
          isOpen={true}
          onClose={handleModal}
          event='delete'
        />
      }
      <PageBlock
        variation="full"
        title="Pending Version"
        subtitle="Promara una versión expecifica para que salga a producción"

      >
        <Table
          schema={schemaPendingVersions(sowModal)}
          items={data}
        />
      </PageBlock>
    </div>
  );
};
