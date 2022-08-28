import {  PropsFields} from "../interfaces/interfaceData"

export const createdDocument = (
  createDocument: any,
  acronym: string,
  fields: PropsFields[]
) => {

  createDocument({
    variables: {
      acronym: acronym,
      document: {
        fields: fields
      }
    }
  })

}