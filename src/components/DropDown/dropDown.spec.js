import React from "react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DropDown from "./dropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faAngleDown,
//   faAngleUp,
//   faCheckSquare,
//   faSquare,
// } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../SearchBox/searchBox";

Enzyme.configure({ adapter: new Adapter() });

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
    {
      name: "Clive",
    },
  ],
  searchList: { searchkeys: ["name"] },
  showKey: "name",

  result: [
    {
      name: "Aditi",
    },
  ],

  multipleSelect: true,
  getList: jest.fn(),
};
/**
 *
 * @param {component} component
 * simulate func for onClick icon
 */
const simulateFuncIcon = (component) => {
  const simulatefunc = component
    .find(`[data-test='${"icon"}']`)
    .simulate("click");
  return simulatefunc;
};
const DropdownToggle = (component) => {
  const simulatefunc = component
    .find(`[data-test='${"dropdown-button"}']`)
    .simulate("click", { target: component, currentTarget: component });
  return simulatefunc;
};
/**
 *
 * @param {component} component
 * simulate func for onClick list
 */
const simulateFuncList = (component) => {
  const simulatefunc = component
    .find(`[data-test='${"list"}']`)
    .first()
    .simulate("click");
  return simulatefunc;
};

const simulateSelectAllData = (component) => {
  const simulatefunc = component
    .find(`[data-test='${"selectAllData"}']`)
    .simulate("click");
  return simulatefunc;
};
describe("Dropdown Component", () => {
  it("should render without errors", () => {
    const component = shallow(<DropDown {...properties} />);
    component.find(`[data-test='${"DropDownComponent"}']`);
    expect(component.length).toBe(1);
  });

  it("should toggle - button test", () => {
    const component = shallow(<DropDown {...properties} />);
    simulateFuncIcon(component);
    expect(component.state("showList")).toEqual(true);
  });
  it("Should check for resultList", () => {
    const component = shallow(<DropDown {...properties} />);
    component.instance().getResult(properties.result);
    expect(component.state("resultList").length).toEqual(1);
  });
  it(" should add to the list - function test", () => {
    const properties1 = { ...properties, option: { name: "Aditi" } };
    const component = shallow(<DropDown {...properties1} />);
    component.instance().addToList(properties1.option);
    expect(component.state("OptionList").length).toEqual(1);
  });
  it("Should check for add to list - button test", () => {
    const component = shallow(<DropDown {...properties} />);
    simulateFuncIcon(component);
    simulateFuncList(component);
    expect(component.state("OptionList").length).toEqual(1);
  });
  it("should check for icon AngleUp", () => {
    const component = shallow(<DropDown {...properties} />);
    simulateFuncIcon(component);
    expect(component.find(FontAwesomeIcon).first().props().icon.iconName).toBe(
      "angle-up"
    );
  });
  it("should check for class AngleDown", () => {
    const component = shallow(<DropDown {...properties} />);
    expect(component.find(FontAwesomeIcon).first().props().icon.iconName).toBe(
      "angle-down"
    );
  });
  it("should check for selected className", () => {
    const properties1 = { ...properties, multipleSelect: false };
    const component = shallow(<DropDown {...properties1} />);
    simulateFuncIcon(component);
    simulateFuncList(component);
    simulateFuncIcon(component);
    expect(component.find("button").first().hasClass("selected")).toEqual(true);
  });
});

describe("Multiple Select DropDown Component", () => {
  it("should toggle the dropdown", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    expect(component.state("showList")).toEqual(true);
  });
  it("should not toggle the dropdown ", () => {
    const component = shallow(<DropDown {...properties} />);
    component
      .find(`[data-test='${"dropdown-button"}']`)
      .simulate("click", { target: {} });
    expect(component.state("showList")).toEqual(false);
  });

  it("should check for greater than 10 substring", () => {
    const properties1 = {
      ...properties,
      data: [{ name: "Naruto Uzumaki" }],
    };
    const component = shallow(<DropDown {...properties1} />);
    DropdownToggle(component);
    simulateFuncList(component);
    component.find(`[data-test='${"multi-select"}']`);
    expect(component.text()).toContain("Naruto Uzu...");
  });
  it("should check for results and its className", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    component.find(SearchBox).props().onChange("Aditi");
    component.find(SearchBox).props().result(properties.result);
    expect(
      component.find(`[data-test='${"ifResult"}']`).hasClass("allListDiv")
    ).toEqual(true);
  });
  it("should check for no results , className and text", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    component.find(SearchBox).props().onChange("Naruto");
    component.find(SearchBox).props().result([]);
    expect(component.instance().isResult()).toBe(false);
    expect(
      component.find(`[data-test='${"no-result"}']`).hasClass("no-result")
    ).toEqual(true);
    expect(component.find(`[data-test='${"no-result"}']`).text()).toBe(
      "No results"
    );
  });
  it("should remove selected option", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    simulateSelectAllData(component);
    component
      .find(`[data-test='${"remove-option"}']`)
      .first()
      .simulate("click");
    expect(component.state("OptionList").length).toBe(3);
  });
  it("should deselect option and check for square icon ", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    simulateFuncList(component);
    simulateFuncList(component);
    expect(component.state("OptionList").length).toEqual(0);
    const wrapper = component.find(`[data-test='${"list"}']`);
    expect(wrapper.first().find(FontAwesomeIcon).props().icon.iconName).toBe(
      "square"
    );
  });
  it("should select the option ,check for selected className and check for check-square icon ", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    simulateFuncList(component);
    expect(component.state("OptionList").length).toEqual(1);
    expect(component.find("button").first().hasClass("selected")).toEqual(true);
    const wrapper = component.find(`[data-test='${"list"}']`);
    expect(wrapper.find(FontAwesomeIcon).first().props().icon.iconName).toBe(
      "check-square"
    );
  });
  it("should check for no options selected and check for square icon", () => {
    const properties1 = { ...properties };
    const component = shallow(<DropDown {...properties1} />);
    DropdownToggle(component);
    simulateSelectAllData(component);
    simulateSelectAllData(component);
    const wrapper = component.find(`[data-test='${"selectAllData"}']`);
    expect(component.state("OptionList").length).toEqual(0);
    expect(wrapper.find(FontAwesomeIcon).first().props().icon.iconName).toBe(
      "square"
    );
  });
  it("should check for selectAll option, className and check for square icon", () => {
    const properties1 = { ...properties };
    const component = shallow(<DropDown {...properties1} />);
    DropdownToggle(component);
    expect(component.instance().isAllSelected()).toBe(true);
    expect(
      component.find(`[data-test='${"selectAllData"}']`).hasClass("selectAll")
    ).toBe(true);
    const wrapper = component.find(`[data-test='${"selectAllData"}']`);
    expect(wrapper.find(FontAwesomeIcon).first().props().icon.iconName).toBe(
      "square"
    );
  });
  it("should check for no selectAll option when using search Bar", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    component.find(SearchBox).props().onChange("Aditi");
    expect(component.instance().isAllSelected()).toBe(false);
  });
  it("should close dropdown onblur", () => {
    const component = shallow(<DropDown {...properties} />);
    const dropdown = component.find(`[data-test='${"DropdownComponent"}']`);

    dropdown.simulate("blur", {
      currentTarget: {
        id: "dropdown-div",
        contains: () => null,
      },
    });

    expect(component.state("showList")).toBe(false);
  });

  it("should not close dropdown onblur", () => {
    const component = shallow(<DropDown {...properties} />);
    component.setState({ showList: true });
    component.instance().hideList({
      currentTarget: {
        id: "",
        contains: () => false,
      },
    });

    expect(component.state("showList")).toBe(true);
  });
  it("should check for all selected options in that one to be deselected and check for square icon", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    simulateSelectAllData(component);
    simulateFuncList(component);
    expect(component.state("OptionList").length).toBe(3);
    const wrapper = component.find(`[data-test='${"selectAllData"}']`);
    expect(wrapper.find(FontAwesomeIcon).first().props().icon.iconName).toBe(
      "square"
    );
  });
  it("should remove all options and check for square icon", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    simulateSelectAllData(component);
    expect(
      component
        .find(`[data-test='${"removeAllOptions"}']`)
        .hasClass("removeIcon")
    ).toEqual(true);
    component.find(`[data-test='${"removeAllOptions"}']`).simulate("click");
    expect(component.state("OptionList").length).toBe(0);
    const wrapper = component.find(`[data-test='${"selectAllData"}']`);
    expect(wrapper.find(FontAwesomeIcon).first().props().icon.iconName).toBe(
      "square"
    );
  });
  it("should check for searchInput value", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    component.find(SearchBox).props().onChange("Aditi");
    expect(component.state("searchInput")).toEqual("Aditi");
  });
  it("should check for searchBar", () => {
    const component = shallow(<DropDown {...properties} />);
    DropdownToggle(component);
    expect(component.find(SearchBox).length).toBe(1);
  });
});

// import React from "react";
// import Enzyme from "enzyme";
// import { shallow } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import DropDown from "./dropDown";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

// Enzyme.configure({ adapter: new Adapter() });
// /**
//  *
//  * @param {component} component
//  * simulate func for onClick icon
//  */
// const simulateFuncIcon = (component) => {
//   const simulatefunc = component
//     .find(`[data-test='${"icon"}']`)
//     .simulate("click");
//   return simulatefunc;
// };
// /**
//  *
//  * @param {component} component
//  * simulate func for onClick list
//  */
// const simulateFuncList = (component) => {
//   const simulatefunc = component
//     .find(`[data-test='${"list"}']`)
//     .first()
//     .simulate("click");
//   return simulatefunc;
// };
// describe("Dropdown Component", () => {
//   const properties = {
//     data: [
//       {
//         name: "Aditi",
//       },
//       {
//         name: "Talib",
//       },
//       {
//         name: "Venu",
//       },
//     ],
//     searchList: { searchkeys: ["name"] },
//     showKey: "name",

//     result: [
//       {
//         name: "Aditi",
//       },
//     ],

//     getList: jest.fn(),
//   };
//   it("should render without errors", () => {
//     const component = shallow(<DropDown {...properties} />);
//     component.find(`[data-test='${"DropDownComponent"}']`);
//     expect(component.length).toBe(1);
//   });

//   it("should toggle - button test", () => {
//     const component = shallow(<DropDown {...properties} />);
//     simulateFuncIcon(component);
//     expect(component.state("showList")).toEqual(true);
//   });
//   it("Should check for resultList", () => {
//     const component = shallow(<DropDown {...properties} />);
//     component.instance().getResult(properties.result);
//     expect(component.state("resultList").length).toEqual(1);
//   });
//   it(" should add to the list - function test", () => {
//     const properties1 = { ...properties, option: { name: "Aditi" } };
//     const component = shallow(<DropDown {...properties1} />);
//     component.instance().addToList(properties1.option);
//     expect(component.state("OptionList").length).toEqual(1);
//   });
//   it("Should check for add to list - button test", () => {
//     const component = shallow(<DropDown {...properties} />);
//     simulateFuncIcon(component);
//     simulateFuncList(component);
//     expect(component.state("OptionList").length).toEqual(1);
//   });
//   it("should check for icon AngleUp", () => {
//     const properties1 = { ...properties, icon: faAngleUp };
//     const component = shallow(<DropDown {...properties1} />);
//     simulateFuncIcon(component);
//     expect(component.instance().props.icon["iconName"]).toBe("angle-up");
//   });
//   it("should check for class AngleDown", () => {
//     const properties1 = { ...properties, icon: faAngleDown };
//     const component = shallow(<DropDown {...properties1} />);
//     expect(component.instance().props.icon["iconName"]).toBe("angle-down");
//   });
//   it("should check for selected className", () => {
//     const component = shallow(<DropDown {...properties} />);
//     simulateFuncIcon(component);
//     simulateFuncList(component);
//     simulateFuncIcon(component);
//     expect(
//       component.find("button").first().hasClass("list-button selected")
//     ).toEqual(true);
//   });
// });
