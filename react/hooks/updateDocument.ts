import { pathOr } from 'ramda';
import { useQuery } from 'react-apollo';
import { documentSerializer } from '../utils/serializer';


export const useScheduleEvent = (
  idVersion: string,
  fields: string[],
  acronym: string
) => {

  console.log('===> INFORMATION LOG ID VERSIONS', idVersion);


  const { data, loading, error } = useQuery(GET_DOCUMENTS, {
    variables: {
      acronym: acronym,
      fields: fields,
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
