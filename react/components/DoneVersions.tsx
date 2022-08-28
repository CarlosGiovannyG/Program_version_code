import React, { FC } from 'react'
import { PropsMasterVersions }
  from '../interfaces/interfaceData';
import { PageBlock, Table } from 'vtex.styleguide'
import { schemaDoneVersions }
  from '../schemas/schemaDoneVersions';
import { FormattedMessage } from "react-intl"
import '../styles.global.css'


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
          title={<FormattedMessage
            id="admin-programversion.title-done-version"
          />}
          // title="Done Versions"
          subtitle={<FormattedMessage
            id="admin-programversion.subtitle-done-version"
          />}
        // subtitle="Versiones que fueron programadas"
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
