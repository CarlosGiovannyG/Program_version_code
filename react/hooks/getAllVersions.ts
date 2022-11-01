import { useQuery } from "react-apollo"
import GET_VERSIONS
  from '../graphql/getVersions.graphql'
import GET_ALL_VERSIONS
  from '../graphql/getAllVersions.graphql'

export const getAllVersions = () => {
  let versBack: any = []
  let dataFiltered: any = []
  let progressVersion: any = []
  let pendingVersions: any = []
  const doneVersions: any = []
  const { data: backVers, error: errbackVers, loading: loadbackVers } = useQuery(GET_VERSIONS)


  const { data, error, loading } = useQuery(GET_ALL_VERSIONS)
console.log('====================================');
console.log({backVers});
console.log('====================================');
console.log({data});

  if (!errbackVers && !loadbackVers) {
    const { availableVersions ,latestVersion} = backVers.getCMSGlobalData

    for (let i = 0; i < availableVersions.length; i++) {

      const auxAvail = {
        name: `Version-${availableVersions[i]}`,
        id_existent: `CMSGlobalData-available-${availableVersions[i]}`,
        num_version: availableVersions[i]
      }
            if (availableVersions[i] > latestVersion) {
        versBack.push(auxAvail)
      }
    }
  }

  if (!loading && !error) {
    //& FILTRANDO LAS VERSIONES QUE ESTÁN EN EL BACK Y NO EN MASTER DATA
    let aux: any = versBack.filter((x: any) => {

      for (let i = 0; i < data.getVersions.length; i++) {
        if (x.id_existent === data.getVersions[i].id_existent) return x
      }
    })
    dataFiltered = versBack.filter((x: any) => !aux.includes(x))

    //* FILTRANDO LA VERSION QUE ESTA EN PRODUCCIÓN
    data.getVersions.filter((d: any) => {
      if (d.state === 'progress') {
        progressVersion.push(d)
      }
    })

    //^ FILTRANDO LAS VERSIONES QUE ESTÁN PENDIENTES POR SALIR A PRODUCCIÓN
    data.getVersions.filter((d: any) => {
      if (d.state === 'pending') {
        pendingVersions.push(d)
      }
    })

    //~~ FILTRANDO LAS VERSIONES YA NO ESTÁN EN PRODUCCIÓN
    data.getVersions.filter((d: any) => {
      if (d.state === 'done') {
        doneVersions.push(d)
      }
    })
  }


  function sortByDate(a: any, b: any): Number {
    let c: any = new Date(a.new_date)
    let d: any = new Date(b.new_date)
    return c - d
  }

  pendingVersions.sort(sortByDate)


  return {
    versBack,
    dataFiltered,
    pendingVersions,
    progressVersion,
    doneVersions,
  }
}