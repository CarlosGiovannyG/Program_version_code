import React, {
  FC,
  useState
} from 'react'
import {
  PageBlock,
  ButtonWithIcon,
  IconEdit,
  IconMinus,
  IconDelete,
  Table
} from 'vtex.styleguide'
import {
  DeleteEvent
} from '../components/DeleteEvent';
import {
  EditEvent
} from '../components/EditEvent';
import {
  ReprogramingVersion
} from '../components/ReprogramingVersion';
import {
  getOneDocument
} from '../hooks/getOneDocument';
import {
  useModal
} from '../hooks/useModal';
import {
  PropsDetail
} from '../interfaces/interfaceData';
import {
  schemaEditDelRepr
} from '../schemas/schemasGlobals';
import '../styles.global.css';
import { FormattedMessage } from "react-intl"


export const HomePrograminDetail: FC<PropsDetail> = ({ params }) => {
  const { isOpen, handleModal } = useModal()
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [
    reprograming,
    setReprograming
  ] = useState(false)
  const { result } = getOneDocument(
    "RM",
    params.id, [
    'id_existent',
    'name',
    'actual_date',
    'new_date',
    'state'
  ])

  const handleEdit = () => {
    setIsEdit(true)
    handleModal()
  }

  const handleDelete = () => {
    setIsDelete(true)
    handleModal()
  }

  const handleReprograming = () => {
    setReprograming(true)
    handleModal()
  }
  return (
    <div className='container'>
      {isEdit &&

        <EditEvent
          isOpen={isOpen}
          onClose={handleModal}
          idVersion={params.id}
        />
      }
      {isDelete &&

        <DeleteEvent
          isOpen={isOpen}
          onClose={handleModal}
          idVersion={params.id}
        />
      }
      {reprograming &&

        <ReprogramingVersion
          isOpen={isOpen}
          onClose={handleModal}
          idVersion={params.id}
        />
      }
      <PageBlock
        variation="full"
        title={<FormattedMessage
          id="admin-programversion.title-detail-page"
        />}
        subtitle={<FormattedMessage
          id="admin-programversion.subtitle-detail-page"
        />}
      >
        {result &&
          <PageBlock
            title={`${result[0]?.name}`}
          >
            <Table
              schema={schemaEditDelRepr()}
              items={result}
            />
          </PageBlock >
        }
        <PageBlock
          subtitle={<FormattedMessage
            id="admin-programversion.select-action-version"
          />}
        >
          <div className='containerButtons'>
            <ButtonWithIcon
              onClick={handleEdit}
              icon={<IconEdit
                size={30}
                color={'green'}
              />}
              variation='tertiary'
            >
              <FormattedMessage
                id="admin-programversion.title-program-version"
              />
            </ButtonWithIcon>
            <ButtonWithIcon
              onClick={handleReprograming}
              icon={<IconMinus
                size={30}
                color={'blue'}
              />}
              variation='tertiary'
            >
              <FormattedMessage
                id="admin-programversion.title-reprogram-version"
              />
            </ButtonWithIcon>
            <ButtonWithIcon
              onClick={handleDelete}
              icon={<IconDelete
                size={30}
                color={'red'}
              />}
              variation='tertiary'
            >
              <FormattedMessage
                id="admin-programversion.title-delete-version"
              />
            </ButtonWithIcon>
          </div>
        </PageBlock >

      </PageBlock>
    </div>
  );
};