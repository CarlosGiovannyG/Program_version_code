import {
  pathOr
} from "ramda"
import {
  useQuery
} from "react-apollo"
import GET_DOCUMENTS
  from '../graphql/getDocuments.graphql'
import {
  documentSerializer
} from "../utils/serializer"

export const
 getAllVersions = () => {
  const {
    data: dataBack,
    loading: loadBack,
    error: errBack
  } = useQuery(GET_DOCUMENTS, {
    variables: {
      acronym: "ZZ",
      fields: [
        'id_existent',
        'name',
      ]
    }
  })

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

  const backData = documentSerializer(pathOr([], ['documents'], dataBack))
  let dataFiltered: any = []
  let progressVersion: any = []
  const pendingVersions: any = []
  const doneVersions: any = []


  if (
    !loadBack &&
    !loadMaster &&
    !errBack &&
    !errMaster
  ) {

    //& FILTRANDO LAS VERSIONES QUE ESTAN EN EL BACK Y NO EN MASTER DATA

    let aux: any = backData.filter((x: any) => {
      for (let i = 0; i < masterData.length; i++) {
        if (x.id_existent === masterData[i].id_existent) return x

      }
    })
    dataFiltered = backData.filter((x: any) => !aux.includes(x))

    //! FILTARNDO LA VERSION QUE ESTA EN PRODUCCION
    masterData.filter((d: any) => {
      if (d.state === 'progress') {
        progressVersion.push(d)
      }
    })

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
  return {
    dataFiltered,
    pendingVersions,
    progressVersion,
    doneVersions
  }
}