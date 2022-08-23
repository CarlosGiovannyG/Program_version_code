import React from "react"
import { FormattedMessage } from "react-intl"
import { ButtonWithIcon, IconMinus, IconEdit } from 'vtex.styleguide'


export function schemaPendingVersions(
  sowModal

    : any) {
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
        actual_date: {
          // title: 'Name Version',
          title: <FormattedMessage
            id="admin-programversion.header.table-name-version"
          />,
          width: 200,
        },
        new_date: {
          // title: 'Name Version',
          title: <FormattedMessage
            id="admin-programversion.header.table-name-version"
          />,
          width: 200,
        },
        state: {
          // title: 'Name Version',
          title: <FormattedMessage
            id="admin-programversion.header.table-name-version"
          />,
          width: 200,
        },
        action: {
          title: 'action',
          width: 200,
          cellRenderer: ({ rowData }: any) => {
            return (
              <>
                <div className='flex'>
                  <ButtonWithIcon
                    onClick={(e: any) => sowModal(e, rowData.id_existent,'edit')}
                    icon={<IconEdit size={24} />}
                    variation='tertiary'
                  />
                </div >
                <div className='flex'>
                  <ButtonWithIcon
                    onClick={(e: any) => sowModal(e, rowData.id_existent, 'delete ')}
                    icon={<IconMinus size={24} />}
                    variation='tertiary'
                  />
                </div >
              </>
            )
          }
        }
      }
    }

  )
}
