import { fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import TextInput from "@app/components/common/Input";

import { render } from "./utils/wrapper";

describe("TextInput Component", () => {
  const onchangeTextMock = jest.fn();
  it("renders correctly with placeholder and value", () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <TextInput
        onChangeText={onchangeTextMock}
        placeholder="Search"
        value="Sample Text"
      />
    );

    const placeholderInput = getByPlaceholderText("Search");
    const valueInput = getByDisplayValue("Sample Text");

    expect(placeholderInput).toBeDefined();
    expect(valueInput).toBeDefined();
  });

  it("triggers onChangeText handler on text input", () => {
    const onChangeTextMock = jest.fn();
    const { getByDisplayValue } = render(
      <TextInput
        placeholder="Search"
        value="Sample Text"
        onChangeText={onChangeTextMock}
      />
    );

    const valueInput = getByDisplayValue("Sample Text");

    fireEvent.changeText(valueInput, "New Text");

    expect(onChangeTextMock).toHaveBeenCalledWith("New Text");
  });

  it("disables input when disabled prop is true", () => {
    const { getByTestId } = render(
      <TextInput
        onChangeText={onchangeTextMock}
        placeholder="Search"
        value="Sample Text"
        disabled={true}
      />
    );

    const valueInput = getByTestId("text-input"); // Add a testID to the input element

    expect(valueInput.props.editable).toBe(false);
  });

  it("should render icon on the right side", () => {
    const input = render(
      <TextInput
        onChangeText={onchangeTextMock}
        placeholder="Search"
        value="Sample Text"
        disabled={true}
        iconRight={<Text>Icon</Text>}
      />
    );

    expect(input).toBeDefined();
  });
});
