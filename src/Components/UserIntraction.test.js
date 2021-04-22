import React from 'react';
import ReactDOM from 'react-dom';
import { render,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  UserIntraction from './UserIntraction';

afterEach(cleanup);

test("it works", () => {
  const { getByText, getByLabelText } = render(<UserIntraction />);

  getByLabelText("Name");
  getByText("Add client secret");
});


// userEvent
test("user-events allows users to add...", () => {
  const { getByText, getByLabelText } = render (<UserIntraction />);

  const input = getByLabelText("Name");
  const button = getByText("Add client secret");

  userEvent.type(input, "Hello User");
  userEvent.click(button);

  getByText("Hello User");
});
