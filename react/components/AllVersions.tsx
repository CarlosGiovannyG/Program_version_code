import React, {
  FC,
  useState
} from 'react';
import {
  PageBlock,
  Table
} from 'vtex.styleguide'

import {
  PropsAllVersions
} from '../interfaces/interfaceData';
import {
  schemaAllVersions
} from '../schemas/schemaAllVersions';
import {
  SheduleEvent
} from './SheduleEvent';
import {
  useModal
} from '../hooks/useModal';
import '../styles.global.css'

export const
  AllVersions: FC<PropsAllVersions> = (
    {
      data
    }
  ) => {
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
          />
        }
        <PageBlock
          variation="full"
          title="Backend Versions"
          subtitle="Programá una versión para que salga a producción"
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




