import { Component } from "react";
import "./App.scss";
// import { searchData } from "./data/searchData";
import searchData from "./data/jsonData.json";
// import SearchBox from "./components/SearchBox/searchBox";
import DropDown from "./components/DropDown/dropDown";

class App extends Component {
  state = {
    searchData: "",
  };
  getList = (result) => {
    console.log(result);
  };
  getSearchInput = (searchInput) => {
    console.log(searchInput);
  };
  /**
   * Use searchBar component to Search the data
   */
  render() {
    return (
      <>
        <div className="App">
          {/* <SearchBox
            data={searchData}
            placeholder="Search here"
            iconPosition="right"
            className="searchInput"
            searchkeys={["name", "description"]}
            // result={this.getResult}
            onChange={(value) => {
              console.log("res", value);
            }}
          /> */}
          <h2 className="heading">DropDown Menu</h2>

          <DropDown
            data={searchData}
            getList={this.getList}
            showKey="name"
            multipleSelect={true}
            placeholder="Select"
            searchList={{ searchkeys: ["name"], placeholder: "Search" }}
            onChange={this.getSearchInput}
          />
        </div>
      </>
    );
  }
}

export default App;
