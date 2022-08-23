import React, { FC } from 'react'
import { Table } from 'vtex.styleguide'
import {  PropsEditDelEventRepr } from '../interfaces/interfaceData';
import {  schemaEditDelRepr } from '../schemas/schemasGlobals';
import { ModalComponent } from './ModalComponent';


export const EditEvent: FC<PropsEditDelEventRepr> = ({ isOpen, onClose,data }) => {

  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}>
      <Table
        schema={schemaEditDelRepr()}
      items={data}
      />
    </ModalComponent>
  );
};
