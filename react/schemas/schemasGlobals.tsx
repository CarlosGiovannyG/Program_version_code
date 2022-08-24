import React from "react"
import { FormattedMessage } from "react-intl"

export function schemaShedule() {
  return (
    {
      properties: {
        id_existent: {
          // title: 'Last Publication',
          title: <FormattedMessage
            id="admin-programversion.header.table-name-version"
          />,
          width: 300,
        },
        name: {
          // title: 'Name Version',
          title: <FormattedMessage
            id="admin-programversion.header.table-name-version"
          />,
          width: 250,
        },
      }
    }

  )
}

export function schemaEditDelRepr() {
  return (
    {
      properties: {
        name: {
          // title: 'Name Version',
          title: <FormattedMessage
            id="admin-programversion.header.table-name-version"
          />,
          width: 150,
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
          width: 150,
        }
      }
    }

  )
}
