import React, {
  FC, useEffect, useState
} from 'react'
import { AllVersions } from '../components/AllVersions';
import { DoneVersions } from '../components/DoneVersions';
import {
  InProgressVersion
} from '../components/InProgressVersion';
import {
  PendingVersions
} from '../components/PendingVersions';
import { getAllVersions } from '../hooks/getAllVersions';
import '../styles.global.css'
import { useHourPrograming } from '../hooks/useHourPrograming';
// import { UpdateInformation } from '../components/UpdateInformation';

export const HomeProgramin: FC = () => {
  const [updateInfo, setUpdateInfo] = useState(false)

  const {
    dataFiltered,
    pendingVersions,
    progressVersion,
    doneVersions,
  } = getAllVersions()


  let hora = new Date()

  useEffect(() => {
    setTimeout(() => {
      setUpdateInfo(true)
      console.log('===> INFORMATION OF FUUC', useHourPrograming(), hora);
    }, useHourPrograming());
  }, [])

  if (updateInfo) {
    setTimeout(() => {
      setUpdateInfo(false)
    }, 5000)
  }
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
      <div className='containerBlock'>
        <DoneVersions
          data={doneVersions}
        />
      </div>
    </div>
  );
};
