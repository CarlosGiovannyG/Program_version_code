import React, { FC } from 'react';
import { PageBlock, Table } from 'vtex.styleguide'
import { PropsMasterVersions } from '../interfaces/interfaceData';
import { schemaProgressVersions } from '../schemas/schemaProgressVersion';
import '../styles.global.css'

export const InProgressVersion: FC<PropsMasterVersions> = ({ data }) => {

  return (
    <div>

      <PageBlock
        variation="full"
        title="Progress Versions"
        subtitle="Version en Producción"

      >
        <div className='styleTable'>
          <Table
            schema={schemaProgressVersions()}
            items={data}
          />
        </div>
      </PageBlock>
    </div>
  );
};
