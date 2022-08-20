import { endsWith } from 'ramda'

export const documentSerializer = (documents: any) => {

  if (!documents) {
    return []
  }

  const fieldsReducer = (
    acummulator: any,
    field: any
  ) => {
    if (!endsWith('__typename', field.key)) {
      acummulator[field.key] = field.value
    }
    if (endsWith('__typename', field.key)) {
      acummulator[field.key] = JSON.parse(field.value)
    }

    return acummulator
  }
  const documentReducer = (acumulador: any,
    document: any
  ) => {
    if (!document || !document.fields) {
      return acumulador
    }

    acumulador.push(document.fields.reduce(fieldsReducer, {}))

    return acumulador


  }
  return documents.reduce(documentReducer, [])

}

