import {
  useQuery
} from "react-apollo"
import GET_DOCUMENTS
  from '../graphql/getDocuments.graphql'
import {
  documentSerializer
} from "../utils/serializer"
import {
  pathOr
} from 'ramda';



export const getOneDocument = (
  acronym: string,
  idVersion: string,
  fields: string[]
) => {
  let where;

  if (acronym === "ZZ") {
    where = `id_existent=${idVersion}`
  }
  if (acronym === "RM") {
    where = `id=${idVersion}`
  }

  const { data, loading, error } = useQuery(GET_DOCUMENTS, {
    variables: {
      acronym: acronym,
      fields: fields,
      where: where
    },
    fetchPolicy: 'no-cache'
  })

  const result = documentSerializer(
    pathOr([], ['documents'], data)
  )

  return {
    result,
    loading,
    error
  }

}