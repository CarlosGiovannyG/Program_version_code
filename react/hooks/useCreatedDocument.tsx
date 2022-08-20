


type fields = {
    key: string
    value: string | undefined
}

export const createdDocument = (createDocument: any, acronym: string, fields: fields[]) => {

    createDocument({
        variables: {
            acronym: acronym,
            document: {
                fields: fields
            }
          }
    })

}