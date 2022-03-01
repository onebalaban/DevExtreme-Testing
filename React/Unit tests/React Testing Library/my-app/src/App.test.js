// import dependencies
import React from 'react'
// import react-testing methods
import {render, screen, waitFor} from '@testing-library/react'
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
// the component to test
import DataGridComponent from './DataGrid'

test('renders DataGrid', async () => {
  render(<DataGridComponent />);

  //DataGrid is rendered asynchronously, so we need to use async/await and waitFor
  await waitFor(() => {
    const rowElements = screen.getAllByText('test', {exact: false});
    expect(rowElements.length).toBe(4);
  })
});
