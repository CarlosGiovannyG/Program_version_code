import { pathOr } from 'ramda';
import { useState } from 'react'
import { useQuery } from 'react-apollo';
import GET_DOCUMENTS
  from '../graphql/getDocuments.graphql'
import { documentSerializer } from '../utils/serializer';

export const getVersionsMaster = () => {
  const [dataMaster, setDataMaster] = useState<any>([])

  const { data, loading, error } = useQuery(GET_DOCUMENTS, {
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

  if (!error && !loading) {
    const masterData = documentSerializer(pathOr([], ['documents'], data))
    setDataMaster(masterData)
  }

  console.log('===> INFORMATION LOG VAERSI MASTER', dataMaster);

  return {
    dataMaster
  }
};
