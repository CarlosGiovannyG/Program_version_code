
export interface DataBack {
  id_existent: string
  name: string
}

export interface PropsVersions {
  id_existent: string
  name: string
  actual_date: string,
  new_date: string
  state: 'progress' | 'pending' | 'done'
}

export interface PropsAllVersions {
  data: DataBack
}

export interface PropsMasterVersions {
  data: PropsVersions
}


export interface PropsAlertInformation {
  message: string
  type: "success" | "error" | "warning"
  onClose?: () => void
}

export interface PropsModalComponent {
  onClose: Function
  isOpen: boolean
  children: JSX.Element | JSX.Element[]
}

export interface PropsFields {
  key: string
  value: string | Date
}

export interface PropsShedule {
  onClose: Function
  isOpen: boolean
  idVersion: string
}

export interface PropsEditDelEventRepr {
  data: PropsVersions
  onClose: Function
  isOpen: boolean
}

export interface PropsDetail {
  params: any
}