import { Component } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./searchBox.module.scss";
import propTypes from "prop-types";

class SearchBox extends Component {
  state = {
    searchField: "",
    filteredResult: [],
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.searchField !== this.state.searchField) this.searchKeys();
  };
  handleChange = (event) => {
    this.setState({ searchField: event.target.value }, () => {
      this.props.onChange(this.state.searchField);
    });
  };

  /**
   * searchkeys returns the array of objects as output
   *
   */
  searchKeys = () => {
    let data = this.props.data;
    const { searchField } = this.state;
    let result = [];
    let searchkeys = this.props.searchkeys;
    searchkeys.forEach((searchkey) => {
      data.forEach((getData) => {
        if (!getData[searchkey]) {
          return;
        }
        if (
          searchField.length &&
          getData[searchkey].toLowerCase().includes(searchField.toLowerCase())
        ) {
          result.push(getData);
        }
      });
    });

    console.log(result);
    this.setState({ filteredResult: result });
    // this.props.result([...result]);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.props.result([...result]));
      }, 300);
    });
  };
  render() {
    /**
     * this will render the searchBar component
     */

    let { className, iconPosition, placeholder } = this.props;

    return (
      <>
        <div
          data-testid="searchBox"
          className={`${styles["container"]} ${styles[iconPosition]} ${
            className ? className : styles["default"]
          } ${iconPosition}`}
        >
          <input
            type="text"
            className={styles["search-field"]}
            placeholder={placeholder}
            onChange={this.handleChange}
            data-testid="input"
          />
          <div className={styles["icon-button"]} data-testid="searchiconDiv">
            <FontAwesomeIcon
              data-testid="searchicon"
              icon={faSearch}
              className={styles["icon"]}
            />
          </div>
        </div>
      </>
    );
  }
}
SearchBox.propTypes = {
  /**
   *  must be array of objects
   */
  data: propTypes.array.isRequired,
  /**
   * must be array of object keys
   */
  searchkeys: propTypes.arrayOf(propTypes.string.isRequired),
  /**
   * must be a string (searchInput)
   */
  className: propTypes.string,
  /**
   * must be a string
   */
  placeholder: propTypes.string,

  /**
   * must be a funct
   */
  onChange: propTypes.func,
  /**
   *must be a function which returns the result
   */
  result: propTypes.func.isRequired,
  /**
   * must be a string and must have value left/right
   */
  iconPosition: propTypes.oneOf(["left", "right"]),
};

SearchBox.defaultProps = {
  placeholder: "",
  className: "",
  iconPosition: "right",
};

export default SearchBox;
