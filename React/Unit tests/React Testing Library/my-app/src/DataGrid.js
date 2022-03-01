import React from 'react';
import DataGrid from 'devextreme-react/data-grid';

const dataSource = [{ id: 1, text: 'test' }, { id: 2, text: 'test' }, { id: 3, text: 'test' }, { id: 4, text: 'test' }]

export default function DataGridComponent() {
  return (
    <DataGrid
      dataSource={dataSource}
    />
  );
}
