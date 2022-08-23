import React from "react"
import { Link }
  from 'vtex.render-runtime';
import { FormattedMessage } from "react-intl"
import { ButtonWithIcon, IconMinus, IconEdit } from 'vtex.styleguide'


export function schemaDoneVersions(
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
              <div className='flex'>
                <Link
                  to={`/admin/app/programversion/detail/${rowData.id}`}
                >
                  <ButtonWithIcon
                    onClick={(e: any) => sowModal(e, rowData.id_existent, 'edit')}
                    icon={<IconEdit size={24} color={'green'} />}
                    variation='tertiary'
                  />
                </Link>
                <ButtonWithIcon
                  onClick={(e: any) => sowModal(e, rowData.id_existent, 'delete ')}
                  icon={<IconMinus size={24} color={'red'}  />}
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
