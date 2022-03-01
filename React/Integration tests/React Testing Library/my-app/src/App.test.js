// import dependencies
import React from 'react'
// import react-testing methods
import {render, screen, waitFor} from '@testing-library/react'
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
// the component to test
import DataGridComponent from './DataGrid'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('renders DataGrid',  async() => {
  const dataGridRef = React.createRef();

  render(<DataGridComponent setRef={dataGridRef} />);

  //DataGrid is rendered asynchronously, so we need to use async/await and waitFor
  await waitFor(() => {
    const rowElements = screen.getAllByText('test', {exact: false});
  })

  dataGridRef.current.instance.addRow();

  //give time to render
  jest.advanceTimersByTime(200);

  dataGridRef.current.instance.saveEditData();

  //give time to render
  jest.advanceTimersByTime(200);

  expect(dataGridRef.current.instance.getVisibleRows().length).toBe(5);
  // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
  expect(dataGridRef.current.instance.hasEditData()).toBe(false);
});
