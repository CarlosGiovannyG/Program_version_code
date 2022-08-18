import React from "react"
import { FormattedMessage } from "react-intl"
import {  ButtonWithIcon, IconCalendar,IconCheck,IconFailure } from 'vtex.styleguide'

export function schemaHome(handleModal
:any) {
  return (
    {
      properties: {
        name: {
          // title: 'Name Version',
          title: <FormattedMessage
            id="admin-programversion.header.table-name-version"
          />,
          width: 200,
        },
        date: {
          // title: 'Last Publication',
          title: <FormattedMessage
            id="admin-programversion.header.table-last-publication"
          />,
          width: 200,
        },
        state: {
          // title: 'State of Version',
          title: <FormattedMessage
            id="admin-programversion.header.table-state-version"
          />,
          width: 200,
        },
        newDAte: {
          // title: 'New Publication',
          title: <FormattedMessage
            id="admin-programversion.header.table-new-publication"
          />,
          width: 200,
        },
        action: {
          title: 'action',
          width: 200,
          cellRenderer: () => {
            return (
              <div className='flex'>
                <ButtonWithIcon
                  onClick={handleModal}
                  icon={<IconCalendar size={24} />}
                  variation='tertiary'
                />
                <ButtonWithIcon
                  icon={<IconCheck size={24}/>}
                  variation='secondary'
                />
                <ButtonWithIcon
                  icon={<IconFailure size={24} />}
                  variation='danger'
                />

              </div >
            )
          }
        }
      }
    }

  )
}
