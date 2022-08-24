import React from "react"
import { FormattedMessage } from "react-intl"
import { ButtonWithIcon, IconCalendar } from 'vtex.styleguide'


export function schemaAllVersions(
  sowModal

    : any) {
  return (
    {
      properties: {
        id_existent: {
          // title: 'Last Publication',
          title: "ID version",
          width: 200,
        },
        name: {
          // title: 'Name Version',
          title: <FormattedMessage
            id="admin-programversion.header.table-name-version"
          />,
          width: 200,
        },
        new_date: {
          width: 200,
        },
        state: {
          width: 200,
        },
        action: {
          title: <FormattedMessage
            id="admin-programversion.text-action"
          />,
          width: 200,
          cellRenderer: ({ rowData }: any) => {
            return (
              <div className='flex'>
                <ButtonWithIcon
                  onClick={(e: any) => sowModal(e, rowData.id_existent)}
                  icon={<IconCalendar size={24} />}
                  variation='tertiary'
                />
              </div >
            )
          }
        }
      }
    }

  )
}
