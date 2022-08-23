import { useQuery } from "react-apollo"
import GET_DOCUMENTS from '../graphql/getDocuments.graphql'
import { documentSerializer } from "../utils/serializer"
import { pathOr } from 'ramda';



export const getOneDocument = (acronym: string, idVersion: string) => {


  const { data, loading, error } = useQuery(GET_DOCUMENTS, {
    variables: {
      acronym: acronym,
      fields: [
        'actual_date',
        'id_existent',
        'name',
        'new_date',
        'state',
      ],
      where: `id_existent=${idVersion}`
    }
  })

  const result = documentSerializer(pathOr([], ['documents'], data))

  return {
    result,
    loading,
    error
  }

}