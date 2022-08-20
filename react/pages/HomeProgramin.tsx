import React, { useState } from 'react'
import { Table, PageBlock } from 'vtex.styleguide'
import { useModal } from '../hooks/useModal'
import { schemaHome } from '../schemas/schemaHome'
import '../styles.global.css'
import { useQueryAllVersions } from '../hooks/useQueryAllVersions'
import { SheduleEvent } from '../components/SheduleEvent'

export const HomeProgramin = () => {
  const { handleModal, isOpen } = useModal()
  const [idVersion, setIdVersion] = useState<string>('');
  const { result } = useQueryAllVersions()

  const sowModal = (e: any, id: string) => {
    e.preventDefault()

    handleModal()
    setIdVersion(id)
  }

  return (
    <div className='container' >
      <PageBlock
        variation="full"
        title="Programar Version"
        subtitle="Promara una versión expecifica para que salga a producción"

      >
        {
          isOpen &&
          <SheduleEvent
            idVersion={idVersion}
            isOpen={true}
            onClose={handleModal}
          />
        }
        <div className="styleTable">
          <Table

            schema={schemaHome(sowModal)}
            items={result}
            toolbar={
              {
                inputSearch: {
                  placeholder: 'Busqueda'
                },
                density: {
                  buttonLabel: 'Line density',
                  lowOptionLabel: 'Low',
                  mediumOptionLabel: 'Medium',
                  highOptionLabel: 'High',
                },
                newLine: {
                  label: "Actualizar Tabla",
                  handleCallback: () => { }
                }
              }
            }


          />
        </div>
      </PageBlock>
    </div >
  )
}
