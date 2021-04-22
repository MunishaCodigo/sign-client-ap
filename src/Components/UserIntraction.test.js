import React from 'react';
import ReactDOM from 'react-dom';
import { render,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  UserIntraction from './UserIntraction';

afterEach(cleanup);

test("it works", () => {
  const { getByText, getByLabelText } = render(<UserIntraction />);

  getByText("TODOS");
  getByLabelText("What needs to be done?");
  getByText("Add #1");
});


// userEvent
test("user-events allows users to add...", () => {
  const { getByText, getByLabelText } = render (<UserIntraction />);

  const input = getByLabelText("What needs to be done?");
  const button = getByText("Add #1");

  userEvent.type(input, "Hello User");
  userEvent.click(button);

  getByText("Hello User");
});
