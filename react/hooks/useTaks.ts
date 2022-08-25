

export const useTaks =  (
  exist: any,
  createDocument: any,
  updateDocument: any,
  versionProgr: any,
  updateCMSGlobalData: any,
  versionPend: any,
  versionsAvailable: any
) => {


  let versionInProg: any;

  if (versionPend.length) {
    versionInProg = versionPend[0]
  }

  let numVersionForProg: any;

  if (versionPend.length) {
    numVersionForProg = versionInProg.num_version
  }

  let numVersionInProg: any;

  if (versionProgr.length) {
    numVersionInProg = versionProgr[0].num_version
  }

  console.log("exist", exist);
  console.log("versionPend", versionPend[0]);
  console.log("updateDocument", updateDocument);
  console.log("createDocument", createDocument);
  console.log("updateCMSGlobalData", updateCMSGlobalData);
  console.log("versionsAvailable", versionsAvailable);
  console.log("numVersionForProg", numVersionForProg);
  console.log("numVersionInProg", numVersionInProg);



/*

    if (exist && versionProgr.length) {
    updateDocument({
      variables: {
        acronym: "RM",
        document: {
          fields: [
            {
              key: 'id',
              value: versionProgr[0].id,
            },
            {
              key: 'actual_date',
              value: versionProgr[0].new_date,
            },
            {
              key: 'id_existent',
              value: versionProgr[0].id_existent
            },
            {
              key: 'name',
              value: versionProgr[0].name,
            },
            {
              key: 'new_date',
              value: versionProgr[0].new_date,
            },
            {
              key: 'state',
              value: 'done'
            },
            {
              key: 'num_version',
              value: versionProgr[0].num_version
            }
          ]
        }
      }
    })
    }

    if (!exist && versionProgr.length) {
   createDocument({
      variables: {
        acronym: "RM",
        document: {
          fields: [
            {
              key: 'actual_date',
              value: new Date(),
            },
            {
              key: 'id_existent',
              value: versionProgr[0].id_existent
            },
            {
              key: 'name',
              value: versionProgr[0].name,
            },
            {
              key: 'new_date',
              value: new Date(),
            },
            {
              key: 'state',
              value: 'done'
            },
            {
              key: 'num_version',
              value: versionProgr[0].num_version
            }
          ]
        }
      }
    })
    }

  if (versionInProg) {
    updateDocument({
      variables: {
        acronym: "RM",
        document: {
          fields: [
            {
              key: 'id',
              value: versionInProg.id,
            },
            {
              key: 'actual_date',
              value: versionInProg.actual_date,
            },
            {
              key: 'id_existent',
              value: versionInProg.id_existent
            },
            {
              key: 'name',
              value: versionInProg.name,
            },
            {
              key: 'new_date',
              value: versionInProg.new_date,
            },
            {
              key: 'state',
              value: 'progress'
            },
            {
              key: 'num_version',
              value: versionInProg.num_version
            }
          ]
        }
      }
    })
  }

  if (versionPend.length && versionProgr.length) {
  const auxAvailables = versionsAvailable.filter((item: any) => item !== numVersionForProg)
  auxAvailables.push(numVersionInProg)

    updateCMSGlobalData({
      variables: {
        data: {
          "latestVersion": `${numVersionForProg}`,
          "availableVersions": auxAvailables
        }
      }
    })

  }
*/
  return
}