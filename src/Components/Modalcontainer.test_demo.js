import React from "react";
import { render,cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import  ModalContainer  from "./Modalcontainer";

it("user-events allows users to add...", () => {
    const { getByTestId, getByLabelText } = render(<ModalContainer />);
  
    const input = getByTestId("name");
    const button = getByText("Add new secret");
  
    userEvent.type(input, "Learn spanish");
    userEvent.click(button);
  
    getByText("Learn spanish");
  });