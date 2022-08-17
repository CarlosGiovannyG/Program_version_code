import React from "react"
import { FormattedMessage } from "react-intl"

export function schemaHome() {
  return (
    {
      properties: {
        idExistent: {
          title: <FormattedMessage
          id="admin-programversion.header.teble-id"
          />,
          width: 300,
        },
        name: {
          title: 'Name Version',
          width: 350,
        },
        actualDate: {
          title: 'Last Publication',
          width: 350,
        },
        state: {
          title: 'State of Version',
          width: 350,
        },
        newDAte: {
          title: 'New Publication',
          width: 350,
        },
        action: {
          title: 'action'
        }
      },
    }

  )
}
