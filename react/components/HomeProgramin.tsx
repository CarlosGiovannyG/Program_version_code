import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Table, PageBlock, ButtonWithIcon, IconCalendar } from 'vtex.styleguide'
import { data } from '../data/harcodedData'
import { PropsData } from '../interfaces/interfaceData'

const SchemaHome = {
  properties: {
    idExistent: {
      title: <FormattedMessage
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
      title: 'action',
      cellRenderer: (rowData: PropsData) => {
        return (
          <div className='flex'>
            <ButtonWithIcon
              onClick={() => alert(JSON.stringify(rowData, null, 5))}
              icon={<IconCalendar />}
              variation='secondary'
            />
            <ButtonWithIcon
              icon={<IconCalendar />}
              variation='secondary'
            />
            <ButtonWithIcon
              icon={<IconCalendar />}
              variation='secondary'
            />

          </div >
        )
      }
    }
  }
}

export const HomeProgramin = () => {
  { console.log('===> INFORMATION LOG', data) }
  return (
    <div>
      <PageBlock variation="full">
        <Table
          schema={SchemaHome}
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
