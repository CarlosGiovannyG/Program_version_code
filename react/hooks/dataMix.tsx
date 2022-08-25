import { useState } from 'react';
import { getVersionsBack } from './getVersionsBack';
import { getVersionsMaster } from './getVersionsMaster';



export const dataMix = () => {
  const [itExist, setItExist] = useState(false)
  const [latesVersionProgress, setLatesVersionProgress] = useState<any>()

  const { versBack, latesVersion } = getVersionsBack()
  const { dataMaster } = getVersionsMaster()
  let dataFiltered: any = []


  //& FILTRANDO LAS VERSIONES QUE ESTAN EN EL BACK Y NO EN MASTER DATA
  let aux: any = versBack.filter((x: any) => {

    for (let i = 0; i < dataMaster.length; i++) {
      if (x.id_existent === dataMaster[i].id_existent) return x
    }
  })
  dataFiltered = versBack.filter((x: any) => !aux.includes(x))

  //^ FILTARNDO LAS VERSIONES QUE ESTAN PENDIENTES POR SALIR A PRODUCCION
  const pendingVersions = dataMaster.filter((d: any) => {
    if (d.state === 'pending') {
      pendingVersions.push(d)
    }
  })

  //~~ FILTARNDO LAS VERSIONES YA NO ESTAN EN PRODUCCION
  const doneVersions = dataMaster.filter((d: any) => {
    if (d.state === 'done') {

    }
  })


  // * COMPORBANDO SI YA ESTA REGISTRADA LA VERSION
  if (dataMaster.map((ele: any) => ele.num_version).includes(latesVersion.num_version)) {
    setItExist(true)
  }


  if (itExist) {
    let filteredProgress = dataMaster.filter((ele: any) => ele.num_version === latesVersion.num_version
    )
    setLatesVersionProgress(filteredProgress)
  } else {
    setLatesVersionProgress([latesVersion])
  }


  function sortByDate(a: any, b: any): Number {
    let c: any = new Date(a.new_date)
    let d: any = new Date(b.new_date)
    return c - d
  }

  pendingVersions.sort(sortByDate)


  console.log('===> INFORMATION LOG MIX', dataFiltered,
    pendingVersions,
    doneVersions,
    itExist,
    latesVersionProgress);

    return {
      dataFiltered,
      pendingVersions,
      doneVersions,
      itExist,
      latesVersionProgress
    }
};
