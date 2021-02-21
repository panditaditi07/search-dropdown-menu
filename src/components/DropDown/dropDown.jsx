import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faTimesCircle,
  faCheckSquare,
  faSquare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../SearchBox/searchBox";
import styles from "./dropDown.module.scss";
import propTypes from "prop-types";

class DropDown extends Component {
  state = {
    resultList: [],
    OptionList: [],

    showList: false,
    selectAll: false,
    hideList: false,
    searchInput: "",
  };

  handleChange = (onChange) => {
    this.setState({ searchInput: onChange });
  };
  /**
   *
   * @param {result} result
   * stores the result
   */
  getResult = (result) => {
    this.setState({ resultList: [...result] });
  };
  /**
   *
   * @param {event} event
   * focuses on searchBar
   */

  /**
   * removes all selected Options
   */
  removeAllOption = () => {
    this.setState({ OptionList: [], selectAll: false });
    if (this.state.OptionList.length && this.state.hideList === true) {
      this.setState({ showList: true });
    }
  };

  /**
   *
   * @param {option} option
   * removes selected options
   */
  removeOption = (option) => {
    const { OptionList } = this.state;
    const { showKey, getList } = this.props;
    let result = OptionList.filter((selectedoption) => {
      return selectedoption[showKey] !== option[showKey];
    });

    this.setState({ OptionList: result }, () => {
      getList(this.state.OptionList);
    });

    if (result.length === 0 || result.length - 1) {
      this.setState({ selectAll: false });
    }
  };
  /**
   *
   * @param {option} option
   * if the option is selected it removes it
   * and if the option is not selected it adds
   * to the list.
   */

  removeSelectedOption = (option) => {
    this.isSelected(option)
      ? this.removeOption(option)
      : this.addToList(option);
  };

  /**
   * it returns the select All data and sets the states.
   */
  selectAllData = () => {
    const { data } = this.props;
    const { selectAll } = this.state;
    const result = data.map((options) => {
      return options;
    });
    this.setState({ OptionList: result, selectAll: !selectAll }, () => {
      if (selectAll === true) {
        this.setState({ OptionList: [] });
      } else {
        this.setState({ OptionList: result });
      }
    });
  };

  /**
   *
   * @param {option}
   * stores array of Objects of the selected option
   */
  addToList = (option) => {
    const { OptionList } = this.state;
    const { multipleSelect } = this.props;
    const options = [...OptionList, { ...option }];
    this.setState({ OptionList: options });

    if (!multipleSelect) {
      this.setState({ OptionList: [{ ...option }] });

      const { getList } = this.props;
      getList(option);
      this.toggle();
    }
  };
  /**
   *
   * @param {event} event
   * it hides the list when out of Focus
   */
  hideList = (event) => {
    const { multipleSelect, getList } = this.props;
    const { OptionList } = this.state;
    if (
      event.currentTarget.id === "dropdown-div" &&
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      this.toggle();

      this.setState({ hideList: !this.state.hideList });
    }

    if (multipleSelect && OptionList.length) {
      getList(OptionList);
    }
  };

  /**
   * arrow angle is changed
   */
  toggle = () => {
    this.setState({ showList: !this.state.showList });
  };

  /**
   * @param {option}
   * checks wheather the option is selected
   */
  isSelected = (option) => {
    const { showKey } = this.props;
    return this.state.OptionList.some(
      (options) => options[showKey] === option[showKey]
    );
  };
  /**
   * it checks for selectAllOptions & OptionList length and
   * returns true else true false
   */
  isAllSelected = () => {
    if (this.state.resultList.length) return false;
    return true;
  };
  /**
   * toggles the dropdown menu
   */

  DropDownToggle = () => {
    const { OptionList, resultList } = this.state;
    if (!OptionList.length) {
      this.toggle();
    } else if (this.state.hideList === true) {
      if (OptionList.length--) {
        this.setState({ showList: false });
      } else {
        this.toggle();
      }
    } else if (this.state.hideList === false && OptionList.length) {
      this.setState({ showList: true });
    } else if (
      this.state.hideList === false &&
      OptionList.length &&
      resultList.length
    ) {
      this.setState({ showList: true });
    }
  };
  /**
   * checks for no result
   */
  noResults = () => {
    const { showKey } = this.props;
    const result = this.state.resultList.some(
      (options) => this.state.searchInput !== options[showKey]
    );
    console.log(result);
    if (result === false && !this.state.searchInput.length) {
      return true;
    }
    if (result === true) {
      return true;
    } else if (result === false) {
      return false;
    }
  };
  /**
   * returns dropdown list
   */
  render() {
    console.log(this.state.resultList);
    const { showList, resultList, OptionList, selectAll } = this.state;
    const {
      placeholder,
      data,
      searchList,
      showKey,
      multipleSelect,
    } = this.props;
    const list = resultList.length ? resultList : data;

    return (
      <>
        <div
          tabIndex="0"
          id="dropdown-div"
          onBlur={this.hideList}
          className={styles["dropdown-div"]}
          data-test="DropdownComponent"
        >
          <div
            onClick={this.DropDownToggle}
            className={`${styles["dropdown-button"]} ${
              styles[OptionList.length > 10 ? "adjustheight" : ""]
            }`}
          >
            <div className={styles["button-heading"]}>
              {OptionList.length ? (
                <div className={styles["selectedOptions"]}>
                  {multipleSelect ? (
                    OptionList.map((optionSelected, i) => {
                      return (
                        <div className={styles["multiSelectOption"]} key={i}>
                          {optionSelected[showKey].length > 10
                            ? optionSelected[showKey].substring(0, 10) + "..."
                            : optionSelected[showKey]}
                          <FontAwesomeIcon
                            onClick={() => {
                              this.removeOption(optionSelected);
                            }}
                            className={styles["removeOption"]}
                            icon={faTimesCircle}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div>{OptionList[0][showKey]}</div>
                  )}
                </div>
              ) : (
                <>{placeholder}</>
              )}
            </div>
            <div className={styles["icons"]}>
              {OptionList.length ? (
                <FontAwesomeIcon
                  className={styles["removeIcon"]}
                  onClick={this.removeAllOption}
                  icon={faTimes}
                />
              ) : (
                <></>
              )}
              <FontAwesomeIcon
                onClick={this.toggle}
                data-test="icon"
                icon={showList ? faAngleUp : faAngleDown}
                className={styles["icon"]}
              />
            </div>
          </div>

          {showList && (
            <div
              id="lists"
              className={`${styles["dropdownlist"]}`}
              onBlur={this.hideList}
            >
              <div
                id="searchInput"
                className={styles["searchBar-div"]}
                onFocus={this.onSearchFocus}
                onBlur={this.onSearchBlur}
              >
                <SearchBox
                  data={data}
                  result={this.getResult}
                  searchkeys={searchList.searchkeys}
                  placeholder={searchList.placeholder}
                  className={styles["searchbar"]}
                  onChange={this.handleChange}
                />
              </div>

              {this.noResults() ? (
                <div className={styles["allListDiv"]}>
                  {multipleSelect && this.isAllSelected() ? (
                    <div
                      className={styles["selectAll"]}
                      onClick={this.selectAllData}
                    >
                      {multipleSelect ? (
                        <FontAwesomeIcon
                          className={styles["check-icon"]}
                          color="#3483eb"
                          size="2x"
                          icon={selectAll ? faCheckSquare : faSquare}
                        />
                      ) : (
                        <></>
                      )}
                      <p className={styles["selectAll-heading"]}>Select All</p>
                    </div>
                  ) : (
                    <></>
                  )}

                  {list.map((option, i) => {
                    return (
                      <div
                        className={styles["lists"]}
                        key={i}
                        onClick={() => {
                          this.removeSelectedOption(option);
                        }}
                        data-test="list"
                      >
                        {multipleSelect ? (
                          <FontAwesomeIcon
                            color="#3483eb"
                            size="2x"
                            icon={
                              this.isSelected(option) ? faCheckSquare : faSquare
                            }
                          />
                        ) : (
                          <></>
                        )}
                        <button
                          className={`${styles["list-button"]} ${
                            styles[this.isSelected(option) ? "selected" : ""]
                          }`}
                        >
                          {option[showKey]}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles["no-result"]}>
                  <i>No results</i>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

DropDown.propTypes = {
  /**
   *  must be array of objects
   */
  data: propTypes.array.isRequired,
  /**
   * must be a string (searchInput)
   */
  showKey: propTypes.string.isRequired,
  /**
   * must be a string
   */
  placeholder: propTypes.string,
  /**
   * must be an object
   */
  searchList: propTypes.object,
  /**
   * must be array of object keys and it is an object of searchList
   */
  searchkeys: propTypes.arrayOf(propTypes.string.isRequired),
  /**
   * will give the result
   */
  getList: propTypes.func.isRequired,
  multipleSelect: propTypes.bool,
};

DropDown.defaultProps = {
  placeholder: "Select",
};
export default DropDown;
