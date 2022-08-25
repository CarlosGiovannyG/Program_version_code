import { useState } from 'react'
import { useQuery } from 'react-apollo';

import GET_VERSIONS
  from '../graphql/getVersions.graphql'




export const getVersionsBack = () => {
  const [latesVersion, setLatesVersion] = useState<any>()
  const [versionAvailable, setVersionAvailable] = useState()
  let versBack: any = []

  const { data, error, loading } = useQuery(GET_VERSIONS)

  if (!error && !loading) {
    const { availableVersions } = data.getCMSGlobalData
    const { latestVersion } = data.getCMSGlobalData
    const auxLatest = {
      name: `Version-${latestVersion}`,
      id_existent: `CMSGlobalData-lates-${latestVersion}`,
      state: 'progress',
      num_version: Number(latestVersion)
    }
    setLatesVersion(auxLatest)

    for (let i = 0; i < availableVersions.length; i++) {
      const auxAvai = {
        name: `Version-${availableVersions[i]}`,
        id_existent: `CMSGlobalData-available-${availableVersions[i]}`,
        num_version: Number(availableVersions[i])
      }
      versBack.push(auxAvai)
    }
    setVersionAvailable(availableVersions)

  }
  console.log('===> INFORMATION LOG VERSION BACK', versBack,
    latesVersion,
    versionAvailable );

    return {
      versBack,
      latesVersion,
      versionAvailable
    }
};
