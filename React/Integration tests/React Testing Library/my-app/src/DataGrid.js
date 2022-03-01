import React from 'react';
import DataGrid, { Editing } from 'devextreme-react/data-grid';

const dataSource = {key: 'id', store: [{ id: 1, text: 'test' }, { id: 2, text: 'test' }, { id: 3, text: 'test' }, { id: 4, text: 'test' }]};

export default function DataGridComponent(props) {
  return (
    <DataGrid
      ref={props.setRef}
      dataSource={dataSource}
    >
      <Editing mode={'batch'} />
    </DataGrid>
  );
}
