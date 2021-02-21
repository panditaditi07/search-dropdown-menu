import React from "react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DropDown from "./dropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

Enzyme.configure({ adapter: new Adapter() });
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
describe("Dropdown Component", () => {
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
    searchList: { searchkeys: ["name"] },
    showKey: "name",

    result: [
      {
        name: "Aditi",
      },
    ],

    getList: jest.fn(),
  };
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
    const properties1 = { ...properties, icon: faAngleUp };
    const component = shallow(<DropDown {...properties1} />);
    simulateFuncIcon(component);
    expect(component.instance().props.icon["iconName"]).toBe("angle-up");
  });
  it("should check for class AngleDown", () => {
    const properties1 = { ...properties, icon: faAngleDown };
    const component = shallow(<DropDown {...properties1} />);
    expect(component.instance().props.icon["iconName"]).toBe("angle-down");
  });
  it("should check for selected className", () => {
    const component = shallow(<DropDown {...properties} />);
    simulateFuncIcon(component);
    simulateFuncList(component);
    simulateFuncIcon(component);
    expect(
      component.find("button").first().hasClass("list-button selected")
    ).toEqual(true);
  });
});
