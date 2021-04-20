import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SearchBox from "./searchBox";

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);
const simulateFunc = (component) => {
  let event = {
    target: { value: "A" },
  };
  const InputonChange = component.find("input").simulate("change", event);
  return InputonChange;
};
const properties = {
  data: [
    {
      name: "Aditi",
    },
    {
      name: "Talib",
    },
    {
      name: "Venu",
    },
  ],
  searchkeys: ["name"],
  result: jest.fn(),
  onChange: jest.fn(),
  className: "searchInput",
  placeholder: "Search",
};

// using enzyme

it("Should check for the search data in state", () => {
  const component = shallow(<SearchBox {...properties} />);
  simulateFunc(component);
  expect(component.state("searchField")).toBe("A");
});
it("Should check for the search data and it's length", () => {
  const component = shallow(<SearchBox {...properties} />);
  simulateFunc(component);
  expect(component.state("filteredResult")[0]["name"]).toBe(
    properties.data[0]["name"]
  );
  expect(component.state("filteredResult").length).toEqual(2);
});

//using react testing library

//using render
// it("should render without error and check for children's length", () => {
//   const { asFragment, getByTestId } = render(<SearchBox {...properties} />);
//   expect(asFragment()).toMatchSnapshot();
//   expect(getByTestId("searchBox").children.length).toBe(2);
// });
// it("should check for className", () => {
//   const { getByTestId } = render(<SearchBox {...properties} />);
//   expect(getByTestId("searchBox")).toHaveClass("searchInput");
// });

// it("should check for no className", () => {
//   const properties1 = {
//     ...properties,
//     className: "",
//   };
//   const { getByTestId } = render(<SearchBox {...properties1} />);
//   expect(getByTestId("searchBox")).toHaveClass("default");
// });
// it("should search for Data", () => {
//   const { getByTestId } = render(<SearchBox {...properties} />);
//   const input = getByTestId("input");
//   fireEvent.change(input, { target: { value: "A" } });
//   expect(input.value).toBe("A");

//   // expect(properties.result(input.value)).toBeCalled();
// });

// it("should check for search icon", () => {
//   const { getByTestId } = render(<SearchBox {...properties} />);
//   expect(getByTestId("searchiconDiv").children.length).toBe(1);
//   expect(getByTestId("searchicon")).toHaveClass("fa-search");
// });

// it("should check for icon's default position", () => {
//   const { getByTestId } = render(<SearchBox {...properties} />);
//   expect(getByTestId("searchBox")).toHaveClass("right");
// });
// it("should check for icon position left", () => {
//   const properties1 = { ...properties, iconPosition: "left" };
//   const { getByTestId } = render(<SearchBox {...properties1} />);
//   expect(getByTestId("searchBox")).toHaveClass("left");
// });

//using screen
it("should render without error and check for children's length using screen", () => {
  // const { asFragment, getByTestId } = render(<SearchBox {...properties} />);
  render(<SearchBox {...properties} />);
  expect(screen.getByTestId("searchBox")).toBeTruthy();
});
it("should check for className using screen", () => {
  render(<SearchBox {...properties} />);
  expect(screen.getByTestId("searchBox")).toHaveClass("searchInput");
});
it("should check for no className using screen", () => {
  const properties1 = {
    ...properties,
    className: "",
  };
  render(<SearchBox {...properties1} />);
  // console.log(screen);
  expect(screen.getByTestId("searchBox")).toHaveClass("default");
});
it("should search for Data and check for the result and onchange func using screen", async () => {
  render(<SearchBox {...properties} />);
  const input = screen.getByTestId("input");
  fireEvent.change(input, { target: { value: "A" } });
  expect(input.value).toBe("A");
  await waitFor(() =>
    expect(properties.result).toHaveBeenCalledWith([
      { name: "Aditi" },
      { name: "Talib" },
    ])
  );
  // expect(properties.result).toHaveBeenCalledWith([
  //   { name: "Aditi" },
  //   { name: "Talib" },
  // ]);
  expect(properties.onChange).toHaveBeenCalled();
});
it("should check for placeholder's value", () => {
  render(<SearchBox {...properties} />);
  expect(screen.getByTestId("input")).toHaveProperty("placeholder", "Search");
});
it("should check for search icon using screen", () => {
  render(<SearchBox {...properties} />);
  expect(screen.getByTestId("searchiconDiv").children.length).toBe(1);
  expect(screen.getByTestId("searchicon")).toHaveClass("fa-search");
});

it("should check for icon's default position using screen", () => {
  render(<SearchBox {...properties} />);
  expect(screen.getByTestId("searchBox")).toHaveClass("right");
});
it("should check for icon position left using screen", () => {
  const properties1 = { ...properties, iconPosition: "left" };
  render(<SearchBox {...properties1} />);
  expect(screen.getByTestId("searchBox")).toHaveClass("left");
});
