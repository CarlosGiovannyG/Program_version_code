import React, {
  FC
} from 'react'
import {
  PageBlock,
  Table
} from 'vtex.styleguide'
import {
  PropsMasterVersions
} from '../interfaces/interfaceData';
import {
  schemaPendingVersions
} from '../schemas/schemaPendingVersions';
import '../styles.global.css'


export const
  PendingVersions: FC<PropsMasterVersions> = (
    {
      data
    }
  ) => {


    return (
      <div>
        <PageBlock
          variation="full"
          title="Pending Version"
          subtitle="Versiones pendientes por salir a producción"
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
