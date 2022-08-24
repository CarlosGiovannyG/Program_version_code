import React from "react"
import { FormattedMessage } from "react-intl"
import { Link }
  from 'vtex.render-runtime';
import { ButtonWithIcon, IconVisibilityOn } from 'vtex.styleguide'


export function schemaPendingVersions(
) {
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
            id="admin-programversion.date-actual"
          />,
          width: 200,
        },
        new_date: {
          // title: 'Name Version',
          title: <FormattedMessage
            id="admin-programversion.date-new"
          />,
          width: 200,
        },
        state: {
          // title: 'Name Version',
          title: <FormattedMessage
            id="admin-programversion.state-version"
          />,
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
                <Link
                  to={`/admin/app/programversion/detail/${rowData.id}`}
                >
                  <ButtonWithIcon
                    icon={<IconVisibilityOn size={24} color={'green'} />}
                    variation='tertiary'
                  />
                </Link>
              </div >
            )
          }
        }
      }
    }

  )
}
