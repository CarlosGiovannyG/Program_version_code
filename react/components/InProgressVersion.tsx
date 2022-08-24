import React, {
  FC
} from 'react';
import {
  PageBlock,
  Table
} from 'vtex.styleguide'
import {
  PropsMasterVersions
} from '../interfaces/interfaceData';
import {
  schemaProgressVersions
} from '../schemas/schemaProgressVersion';
import '../styles.global.css'
import { FormattedMessage } from "react-intl"


export const
  InProgressVersion: FC<PropsMasterVersions> = (
    {
      data
    }
  ) => {

    return (
      <div>

        <PageBlock
          variation="full"
          title={<FormattedMessage
            id="admin-programversion.title-in-progress-version"
          />}
          subtitle={<FormattedMessage
            id="admin-programversion.subtitle-in-progress-version"
          />}

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
