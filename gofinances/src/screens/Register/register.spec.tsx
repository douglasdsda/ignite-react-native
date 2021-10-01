import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Register } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";
import { NavigationContainer } from "@react-navigation/native";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
const mockNavigation = jest.fn();

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigation: mockNavigation,
    }),
  };
});

describe("Register Screen", () => {
  it("should be open category modal when user click on the category button", async () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");
    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
