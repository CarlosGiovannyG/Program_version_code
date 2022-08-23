import React, {
  FC
} from 'react'
import {
  AllVersions
} from '../components/AllVersions';
import {
  DoneVersions
} from '../components/DoneVersions';
import {
  InProgressVersion
} from '../components/InProgressVersion';
import {
  PendingVersions
} from '../components/PendingVersions';
import {
  getAllVersions
} from '../hooks/getAllVersions';


export const HomeProgramin: FC = () => {
  const {
    dataFiltered,
    pendingVersions,
    progressVersion,
    doneVersions
  } = getAllVersions()

  return (
    <div>

      <AllVersions
        data={dataFiltered}
      />
      <InProgressVersion
        data={progressVersion}
      />
      <PendingVersions
        data={pendingVersions}

      />
      <DoneVersions
        data={doneVersions}
      />

    </div>
  );
};
