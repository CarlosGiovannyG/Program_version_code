import { useQuery } from "react-apollo"
import GET_ONE_VERSION
  from '../graphql/getOneVersion.graphql'


export const getOneDocument = (idVersion: string) => {

  const { data, loading, error } = useQuery(GET_ONE_VERSION, {
    variables: {
      id: idVersion
    }
  })

  const result = data?.getOneVersion

  return {
    result,
    loading,
    error
  }

}
