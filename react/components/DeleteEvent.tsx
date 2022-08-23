import React, { FC } from 'react'
import { Table } from 'vtex.styleguide'
import {  PropsEditDelEventRepr } from '../interfaces/interfaceData';
import {  schemaEditDelRepr } from '../schemas/schemasGlobals';
import { ModalComponent } from './ModalComponent';


export const DeleteEvent: FC<PropsEditDelEventRepr> = ({isOpen,onClose}) => {


   return (
     <ModalComponent
       isOpen={isOpen}
       onClose={onClose}>
       <Table
         schema={schemaEditDelRepr()}
       // items={result}
       />
     </ModalComponent>
   );
};
