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
import '../styles.global.css';
import { FormattedMessage } from "react-intl"


export const
  AllVersions: FC<PropsAllVersions> = (
    {
      data
    }
  ) => {
    const { handleModal, isOpen } = useModal()
    const [idVersion, setIdVersion] = useState<string>('');

    const sowModal = (e: any, id: string) => {
console.log(e);

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
          title={<FormattedMessage
            id="admin-programversion.title-backend-versions"
          />}
          subtitle={<FormattedMessage
            id="admin-programversion.subtitle-backend-versions"
          />}
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




