# Searchable DropDown Menu

# This Searchable DropDown Menu is used to search data according to the user's Input and can multi-select or deselect the list options.

### DropDown Component:

```js
<DropDown
  data={searchData}
  getList={this.getList}
  showKey="name"
  multipleSelect={true}
  placeholder="Select"
  searchList={{ searchkeys: ["name"], placeholder: "Search" }}
/>
```

---

# Props:

- ### `data` - The array of objects. This prop is required.
- ### `getList`- It gives the filtered array of objects of searchBox.
- ### `showKey` - It must be a key value(string) from data which is supposed to be selected.
- ### `placeholder` - The placeholder text for the dropdown box.
- ### `multipleSelect`- It must be boolean. And must be true if multi-select is required.
- ### `searchList` - It must be object and must have properties of searchBox.
- ### `searchkeys` - The array of object keys.This prop is required.This is the searchBox property.
