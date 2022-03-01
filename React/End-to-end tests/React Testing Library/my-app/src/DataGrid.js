import React from 'react';
import DataGrid, { Pager, Paging } from 'devextreme-react/data-grid';

const array = [];
for (let i = 0; i < 100; i++) {
  array.push({id: i, text: 'test ' + i})
}

const dataSource = {key: 'id', store: array};

export default function DataGridComponent(props) {
  return (
    <DataGrid
      ref={props.setRef}
      dataSource={dataSource}
    >
      <Pager enabled visible allowedPageSizes={[5, 10]} showPageSizeSelector />
      <Paging enabled pageSize={10} />
    </DataGrid>
  );
}
