# Dynamic SearchBox

# This searchBox is a dynamic Search Bar component used to search Data according to the user's Input.

### SearchBox Component:

```js
<SearchBox
  data={searchData}
  placeholder="Search here"
  iconPosition="right"
  className="searchInput"
  searchkeys={searchkeys}
  result={getResult}
/>
```

---

# Props:

- ### `data` - The array of objects. This prop is required.
- ### `placeholder` - The placeholder text for the input box.
- ### `iconPosition` - it defines the icon position. Must be left/right. Default `right`
- ### `className` - className must string. Default `""`
- ### `searchkeys` - The array of object keys.This prop is required.
- ### `result` - Callback function will print the data that is searched.
- ### `onChange` - A function which acts as a callback when the input value is changed.
