import { ListItem, ListItemText } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const Row = ({ data, index, style }) => {
  const { rows, page, rowsPerPage, searchStr, className } = data;
  const item = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )[index];
  let text = item?.title;
  if (
    text?.toLowerCase().includes(searchStr.toLowerCase()) &&
    searchStr !== ''
  ) {
    let strIndexArray = new Set();
    for (let idx = 0; idx < text.length; idx++) {
      const strIndex = text
        .toLowerCase()
        .indexOf(searchStr.toLowerCase(), idx);
      if (strIndex !== -1) {
        strIndexArray.add(strIndex);
        idx = strIndex;
      } else {
        idx = text.length - 1;
      }
    }
    let formatedText = [];
    let counter = 0;
    for (let idx = 0; idx < text.length; idx++) {
      if (
        strIndexArray.has(idx) ||
        (counter > 0 && counter < searchStr.length)
      ) {
        counter++;
        formatedText.push(
          <span
            key={text[idx] + idx}
            data-row="true"
            className={className}
          >
            {text[idx]}
          </span>,
        );
      } else {
        counter = 0;
        formatedText.push(
          <span key={text[idx] + idx}>{text[idx]}</span>,
        );
      }
    }
    text = formatedText;
  }

  const handleRowClick = () => {
    if (!item?.url) return;
    window.open(item.url, '_blank');
  };

  return (
    <ListItem button style={style} onClick={handleRowClick}>
      <ListItemText primary={text} />
    </ListItem>
  );
};

function TableBodyRows({
  itemCount,
  rows,
  page,
  rowsPerPage,
  searchStr,
  numOfStrRef,
  className,
}) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          ref={numOfStrRef}
          className="List"
          height={height}
          itemCount={itemCount}
          itemSize={Math.max(height / itemCount, 35)}
          width={width}
          itemData={{
            rows,
            page,
            rowsPerPage,
            searchStr,
            className,
          }}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}

export default TableBodyRows;
