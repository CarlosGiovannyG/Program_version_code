import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Table, PageBlock } from 'vtex.styleguide'
// import {  PageBlock } from 'vtex.styleguide'
import { data } from '../data/harcodedData'
// import { schemaHome } from '../schemas/schemaHome'


const schemaHOme =
{
  properties: {
    idExistent: {
      title:  <FormattedMessage
      id="admin-programversion.header.table-id"
      />,
      width: 300,
    },
    name: {
      // title: 'Name Version',
      title: <FormattedMessage
      id="admin-programversion.header.table-name-version"
      />,
      width: 350,
    },
    date: {
      // title: 'Last Publication',
      title: <FormattedMessage
      id="admin-programversion.header.table-last-publication"
      />,
      width: 350,
    },
    state: {
      // title: 'State of Version',
      title: <FormattedMessage
      id="admin-programversion.header.table-state-version"
      />,
      width: 350,
    },
    newDAte: {
      // title: 'New Publication',
      title: <FormattedMessage
      id="admin-programversion.header.table-new-publication"
      />,
      width: 350,
    },
    action: {
      title: 'action'
    }
  },
}


export const HomeProgramin = () => {
  { console.log('===> INFORMATION LOG', data) }
  return (
    <div>
      <PageBlock variation="full">
        <Table
          schema={schemaHOme}
          items={data}
          toolbar={
            {
              inputSearch:{
                placeholder:'Busqueda'
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

