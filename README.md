# React Table 7 implementation example


This is the [link](https://medium.com/@blaiseiradukunda/react-table-7-tutorial-3d8ba6ac8b16)  to a tutorial made after reading the concepts of this new version, that is currently in on it 15th release candidate

```
ReactTableInfinite.propTypes = {
  // Same as the previous versions
  columns: PropTypes.array.isRequired,
  // Same as the previous versions
  data: PropTypes.array.isRequired,
  // function that receives an json { startIndex, stopIndex }
  // this is meant to load more data and add it to the data prop
  loadMoreRows: PropTypes.func.isRequired,
  // the row count
  rowCount: PropTypes.func.isRequired,
  // height of the reac-table body by default it will be 800px
  height: PropTypes.number
};
```


