import { useQuery } from "react-apollo"
import GET_DOCUMENTS from '../graphql/getDocuments.graphql'
import { documentSerializer } from "../utils/serializer"
import { pathOr } from 'ramda';



export const getAllVersions = () => {

  const { data: dataBack, loading: loadBAck, error: errorBack } = useQuery(GET_DOCUMENTS, {
    variables: {
      acronym: "ZZ",
      fields: [
        'id_existent',
        'name',
      ]
    }
  })

  const { data: dataMaster, loading: loadMaster, error: errorMaster } = useQuery(GET_DOCUMENTS, {
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

  let globalData: any;
  const pendingVersions: any = []

  if (
    !loadBAck &&
    !loadMaster &&
    !errorBack &&
    !errorMaster
  ) {

    globalData = backData
      .filter((res : any) => masterData.some((dat: any) => dat.id_existent !== res.id_existent))

    // for (let i = 0; i < backData.length; i++) {
    //   const elementOne = backData[i];
    //   for (let j = 0; j < masterData.length; j++) {
    //     const elementTwo = masterData[j];
    //     if (elementOne.id_existent !== elementTwo.id_existent) {
    //       globalData.push(backData[i])
    //     }

    //   }

    // }

    // backData.filter((d:any) => {
    //   masterData.filter((s:any) => {
    //     console.log(d.id_existent === s.id_existent);

    //         if (d.id_existent !== s.id_existent ) {
    //           globalData.push(d)
    //         }
    //     })
    // })

    masterData.filter((d: any) => {
      if (d.state === 'pending') {
        pendingVersions.push(d)
      }
    })

  }

  // console.log(masterData);
  // console.log(backData);


  function removeDuplicates(originalArray: any, prop: string) {
    var newArray = [];
    var lookupObject: any = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  let uniqueArray = removeDuplicates(globalData, 'id_existent')

  return {
    uniqueArray,
    pendingVersions,
  }

}

