import React, {
  FC
} from 'react'
import {
  PropsMasterVersions
} from '../interfaces/interfaceData';
import {
  PageBlock,
  Table
} from 'vtex.styleguide'
import '../styles.global.css'
import {
  schemaDoneVersions
} from '../schemas/schemaDoneVersions';

export const
  DoneVersions: FC<PropsMasterVersions> = (
    {
      data
    }
  ) => {

    return (
      <div>
        <PageBlock
          variation="full"
          title="Done Versions"
          subtitle="Versiones que fueron programadas"
        >
          <div className='styleTable'>
            <Table
              schema={schemaDoneVersions()}
              items={data}
            />
          </div>
        </PageBlock>
      </div>
    );
  };
