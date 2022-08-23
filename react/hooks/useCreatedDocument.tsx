


export const createdDocument = (createDocument: any, acronym: string, fields: any) => {

    const { id_existent,
        name,
        actual_date,
        new_date,
        state } = fields


    createDocument({
        variables: {
            acronym: acronym,
            document: {
                fields: [
                    {
                        key: 'actual_date',
                        value: actual_date
                    },
                    {
                        key: 'id_existent',
                        value: id_existent
                    },
                    {
                        key: 'name',
                        value: name
                    },
                    {
                        key: 'new_date',
                        value: new_date
                    },
                    {
                        key: 'state',
                        value: state
                    }
                ]
            }
        }
    })

}