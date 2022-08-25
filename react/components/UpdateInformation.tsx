import React, {  useEffect, useState } from 'react'
import { useMutation } from 'react-apollo';
import { useTaks } from '../hooks/useTaks';
import UPDATE_DOCUMENT
  from '../graphql/updateDocuments.graphql';
import CREATE_DOCUMENT
  from '../graphql/createDocuments.graphql'
import UPDATE_CMSGlobalData
  from '../graphql/updateVersion.graphql'
import { AlertInformation } from './AlertInformation';
import { FormattedMessage } from 'react-intl';

interface Props{
  itExist:any
  progressVersion:any
  pendingVersions:any
  versionsAvailable:any
}

export const UpdateInformation = ({itExist,pendingVersions,progressVersion,versionsAvailable}:Props) => {
  const [success, setSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const [createDocument] = useMutation(CREATE_DOCUMENT, {
    onCompleted: (data) => {
      if (data.createDocument.id) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000);
      }
    },
    onError: (error) => {
      console.error('===> INFORMATION ERROR', error);
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 4000);

    }
  })

  const [updateDocument] = useMutation(UPDATE_DOCUMENT, {
    onCompleted: (data) => {
      if (data.updateDocument.id) {

        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 4000);
      }
    },
    onError(error) {
      console.error('===> INFORMATION LOG ERROR', error);
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 4000);
    },
  })

  const [updateCMSGlobalData] = useMutation(UPDATE_CMSGlobalData, {
    onCompleted: (data) => {
      console.log('===> INFORMATION LOG CMS', data);
    },
    onError(error) {
      console.log('===> LOG ERROR CMS', error);
    },
  })



 useEffect(() => {
   useTaks(
     itExist,
     createDocument,
     updateDocument,
     progressVersion,
     updateCMSGlobalData,
     pendingVersions,
     versionsAvailable
   )
 }, [])



  if (success) {
    return <AlertInformation
      message={<FormattedMessage
        id="admin-programversion.alert-update-information"
      />}
      type='success'
    />

  }
  if (isError) {
    return <AlertInformation
      message={<FormattedMessage
        id="admin-programversion.message-error"
      />}
      type='error'
    />
  }


  return (
    <AlertInformation
      message={<FormattedMessage
        id="admin-programversion.alert-update-information"
      />}
      type='success'
    />
  );
};
