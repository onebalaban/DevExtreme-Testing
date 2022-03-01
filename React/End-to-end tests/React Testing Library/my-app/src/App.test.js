// import dependencies
import React from 'react'
// import react-testing methods
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
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

test('Page index is changed from dxPager',  async() => {
  const dataGridRef = React.createRef();
  const { container } = render(<DataGridComponent setRef={dataGridRef} />);

  //DataGrid is rendered asynchronously, so we need to use async/await and waitFor
  await waitFor(() => {
    const rowElements = screen.getAllByText(/test/i);
  })

  // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
  fireEvent.click(container.querySelectorAll('.dx-page')[5]);

  //give time to render
  jest.advanceTimersByTime(200);

  expect(dataGridRef.current.instance.pageIndex()).toBe(5);
});
