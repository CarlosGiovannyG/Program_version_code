import { data } from "../data/harcodedData"


export const useQueryOneVersion=(idVersion:string)=>{

  const result = data.find((dato) => dato.id_existent === idVersion)

return{
  result
}
}