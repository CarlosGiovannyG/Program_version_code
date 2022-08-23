import { useState } from "react"
export const useModal = () => {
const [isOpen, setIsOpen] = useState(false);
const handleModal=()=>{
  setIsOpen(!isOpen)
}

  return {
isOpen,
handleModal

  }
}