import {
  pathOr
} from "ramda"
import {
  useQuery
} from "react-apollo"
import GET_DOCUMENTS
  from '../graphql/getDocuments.graphql'
import GET_VERSIONS
  from '../graphql/getVersions.graphql'
import {
  documentSerializer
} from "../utils/serializer"

export const getAllVersions = () => {
  let versBack: any = []
  let dataFiltered: any = []
  let progressVersion: any = []
  let pendingVersions: any = []
  const doneVersions: any = []

  const { data: backVers, error: errbackVers, loading: loadbackVers } = useQuery(GET_VERSIONS)


  if (!errbackVers && !loadbackVers) {
    const { availableVersions } = backVers.getCMSGlobalData
    const { latestVersion } = backVers.getCMSGlobalData
    const auxLatest = {
      name: `Version - ${latestVersion}`,
      id_existent: `CMSGlobalData-lates-${latestVersion}`,
      state: 'progress'
    }
    progressVersion.push(auxLatest)


    for (let i = 0; i < availableVersions.length; i++) {
      const auxAvai = {
        name: `Version-${availableVersions[i]}`,
        id_existent: `CMSGlobalData-available-${availableVersions[i]}`,
      }
      versBack.push(auxAvai)
    }
  }


  const { data: dataMaster, loading: loadMaster, error: errMaster } = useQuery(GET_DOCUMENTS, {
    variables: {
      acronym: "RM",
      fields: [
        'actual_date',
        'id_existent',
        'name',
        'new_date',
        'state',
      ]
    }
  })

  const masterData = documentSerializer(pathOr([], ['documents'], dataMaster))



  if (!loadMaster && !errMaster) {
    //& FILTRANDO LAS VERSIONES QUE ESTAN EN EL BACK Y NO EN MASTER DATA
    let aux: any = versBack.filter((x: any) => {

      for (let i = 0; i < masterData.length; i++) {
        if (x.id_existent === masterData[i].id_existent) return x
      }
    })
    dataFiltered = versBack.filter((x: any) => !aux.includes(x))

    //^ FILTARNDO LAS VERSIONES QUE ESTAN PENDIENTES POR SALIR A PRODUCCION
    masterData.filter((d: any) => {
      if (d.state === 'pending') {
        pendingVersions.push(d)
      }
    })

    //~~ FILTARNDO LAS VERSIONES YA NO ESTAN EN PRODUCCION
    masterData.filter((d: any) => {
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