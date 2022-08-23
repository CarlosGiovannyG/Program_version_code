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
import '../styles.global.css'

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
        title="Pagina de detalle de la version"
        subtitle="Opciones sobre la versión actual"
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
          subtitle="Seleccione la acción para la versión"
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
              Programar Version
            </ButtonWithIcon>
            <ButtonWithIcon
              onClick={handleReprograming}
              icon={<IconMinus
                size={30}
                color={'blue'}
              />}
              variation='tertiary'
            >
              Reprogramar Versión
            </ButtonWithIcon>
            <ButtonWithIcon
              onClick={handleDelete}
              icon={<IconDelete
                size={30}
                color={'red'}
              />}
              variation='tertiary'
            >
              Eliminar Versión
            </ButtonWithIcon>
          </div>
        </PageBlock >

      </PageBlock>
    </div>
  );
};