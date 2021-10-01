import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe("Profile", () => {
  it("should have placeholder correctly in input user name input", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");
    expect(inputName).toBeTruthy();
  });

  it("should be loaded user data", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputsurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Douglas");
    expect(inputsurname.props.value).toEqual("Souza");
  });

  it("should exist title correctly", () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId("text-title");
    expect(textTitle.props.children).toContain("Perfil");
  });
});
