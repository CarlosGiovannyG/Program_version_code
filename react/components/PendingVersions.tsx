import React, { FC } from 'react'
import { PageBlock, Table } from 'vtex.styleguide'
import {
  PropsMasterVersions
} from '../interfaces/interfaceData';
import { schemaPendingVersions }
  from '../schemas/schemaPendingVersions';
import { FormattedMessage } from "react-intl"
import '../styles.global.css'

//& COMENTARIO PARA PROBAR RAMA Y PULL

export const
  PendingVersions: FC<PropsMasterVersions> = (
    { data }) => {

    return (
      <div>
        <PageBlock
          variation="full"
          title={<FormattedMessage
            id="admin-programversion.title-pending-version"
          />}
          subtitle={<FormattedMessage
            id="admin-programversion.subtitle-pending-version"
          />}
        >
          <div className='styleTable'>
            <Table
              schema={schemaPendingVersions()}
              items={data}
            />
          </div>
        </PageBlock>
      </div>
    );
  };
