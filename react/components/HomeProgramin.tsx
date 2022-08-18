import React from 'react'
import { Table, PageBlock} from 'vtex.styleguide'
import { data } from '../data/harcodedData'
import { useModal } from '../hooks/useModal'
import { schemaHome } from '../schemas/schemaHome'
import {  ModalComponent } from './ModalComponent'


export const HomeProgramin = () => {
const {handleModal,isOpen}= useModal()
  return (
    <div>
      <PageBlock variation="full">
        {
          isOpen &&
          <ModalComponent
          isOpen={isOpen}
          onClose={handleModal}
          />
        }
        <Table
          schema={schemaHome(handleModal)}
          items={data}
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
            }
          }
        />
      </PageBlock>
    </div>
  )
}
