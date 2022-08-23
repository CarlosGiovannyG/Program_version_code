import React from 'react'
import '../styles.global.css'
import { DoneVersions } from '../components/DoneVersions'
import { InProgressVersion } from '../components/InProgressVersion'
import { PendingVersions } from '../components/PendingVersions'
import { VersionsAll } from '../components/VersionsAll'
import { getAllVersions } from '../hooks/getAllVersions'



export const HomeProgramin = () => {
  const { uniqueArray, pendingVersions } = getAllVersions()


  return (
    <div className='container' >
      <VersionsAll
        data={uniqueArray}
      />
      <InProgressVersion />
      <PendingVersions

        data={pendingVersions}
      />
      <DoneVersions />

    </div >
  )
}


