
export interface PropsDataBack {
  id: string
  name: string
}


export interface PropsVersions {
  id_existent: string
  name: string
  actual_date: string,
  new_date: string
  state: 'progress' | 'pending' | 'done'
}

export interface PropsModalComponent {
  onClose: Function
  isOpen: boolean
  children: JSX.Element | JSX.Element[]
}

export interface PropsSheduleEvent {
  onClose: Function
  isOpen: boolean
  idVersion: string
  event: 'schedule' | 'edit' | 'delete' | 'reschedule'
}