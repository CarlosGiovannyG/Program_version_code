import React, {
  FC, useEffect, useState
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
import { DataBack, PropsVersions } from '../interfaces/interfaceData';
import '../styles.global.css'

export const HomeProgramin: FC = () => {
  const [versionsBack, setVersionsBack] = useState<DataBack>()
  const [versionPend, setVersionPend] = useState<PropsVersions>()
  const [versionProgr, setVersionProgr] = useState<PropsVersions>()
  const [versionsDone, setVersionsDone] = useState<PropsVersions>()
  const {
    dataFiltered,
    pendingVersions,
    progressVersion,
    doneVersions,
    loadMaster,
    loadbackVers
  } = getAllVersions()

  console.log('===> INFORMATION LOG dataFiltered', dataFiltered );
  console.log('===> INFORMATION LOG pendingVersions', pendingVersions );
  console.log('===> INFORMATION LOG progressVersion', progressVersion);

  useEffect(() => {
    setVersionsBack(dataFiltered)
    setVersionPend(pendingVersions)
    setVersionProgr(progressVersion)
    setVersionsDone(doneVersions)
  }, [loadMaster, loadbackVers])


  return (
    <div className='containerHome'>
      {versionProgr &&
        <div className='containerBlock'>
          <InProgressVersion
            data={versionProgr}
          />
        </div>
      }
      {versionsBack &&
        <div className='containerBlock'>
          <AllVersions
            data={versionsBack}
          />
        </div>
      }
      {versionPend &&
        <div className='containerBlock'>
          <PendingVersions
            data={versionPend}
          />
        </div>
      }
      {versionsDone &&
        <div className='containerBlock'>
          <DoneVersions
            data={versionsDone}
          />
        </div>
      }

    </div>
  );
};
