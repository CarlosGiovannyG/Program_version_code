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
import { DataBack } from "../interfaces/interfaceData"
import {
  documentSerializer
} from "../utils/serializer"

export const getAllVersions = () => {

  let versionsAvailable: any = []

  let versBack: DataBack[]=[];
  let dataFiltered: any = []
  let progressVersionProv: any = []
  let progressVersion: any = []
  let pendingVersions: any = []
  const doneVersions: any = []
  let itExist: any;

  const { data: backVers, error: errbackVers, loading: loadbackVers } = useQuery(GET_VERSIONS, {
    fetchPolicy: 'no-cache'
  })

  if (!errbackVers && !loadbackVers) {
    const { availableVersions } = backVers.getCMSGlobalData
    const { latestVersion } = backVers.getCMSGlobalData
    const auxLatest = {
      name: `Version-${latestVersion}`,
      id_existent: `CMSGlobalData-lates-${latestVersion}`,
      state: 'progress',
      num_version: latestVersion
    }

    progressVersionProv.push(auxLatest)

    for (let i = 0; i < availableVersions.length; i++) {
      const auxAvai = {
        name: `Version-${availableVersions[i]}`,
        id_existent: `CMSGlobalData-available-${availableVersions[i]}`,
        num_version: availableVersions[i]
      }
      versBack.push(auxAvai)
    }
    versionsAvailable = availableVersions
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
        "num_version"
      ]
    },
    fetchPolicy: 'no-cache'
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

    console.log("ANTES INCLUDES", masterData);
    let auxOne = masterData.map((ele: any) => ele.num_version).includes(progressVersionProv[0].num_version)
    console.log("INCLUDES", auxOne);
    itExist = auxOne



  }

  // * COMPORBANDO SI YA ESTA REGISTRADA LA VERSION

  // if (masterData.length && progressVersionProv.length) {

  //   let auxOne = masterData.map((ele: any) => ele.num_version).includes(progressVersionProv[0].num_version)
  //   console.log("INCLUDES", auxOne);
  //   itExist = auxOne
  // }


  if (itExist) {
    let filteredProgress = masterData.filter((ele: any) => ele.num_version === progressVersionProv[0].num_version
    )
    progressVersion = filteredProgress
  }

  if (!itExist && progressVersionProv.length) {
    progressVersion = progressVersionProv

  }


  function sortByDate(a: any, b: any): Number {
    let c: any = new Date(a.new_date)
    let d: any = new Date(b.new_date)
    return c - d
  }

  pendingVersions.sort(sortByDate)

  console.log(
    "versBack All", versBack, itExist
  );


  return {
    versionsAvailable,
    versBack,
    dataFiltered,
    pendingVersions,
    progressVersion,
    doneVersions,
    loadMaster,
    loadbackVers
  }
}