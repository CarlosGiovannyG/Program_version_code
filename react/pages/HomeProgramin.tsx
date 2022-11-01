import React, { FC, } from 'react'
import { AllVersions } from '../components/AllVersions';
import { InProgressVersion }
  from '../components/InProgressVersion';
import { PendingVersions }
  from '../components/PendingVersions';
import { getAllVersions } from '../hooks/getAllVersions';
import '../styles.global.css'

export const HomeProgramin: FC = () => {
  const {
    dataFiltered,
    pendingVersions,
    progressVersion,
  } = getAllVersions()

  return (
    <div className='containerHome'>
      <div className='containerBlock'>
        <InProgressVersion
          data={progressVersion}
        />
      </div>
      <div className='containerBlock'>
        <AllVersions
          data={dataFiltered}
        />
      </div>
      <div className='containerBlock'>
        <PendingVersions
          data={pendingVersions}
        />
      </div>
    </div>
  );
};
