import React, { forwardRef, useEffect, useRef, useState } from "react";
import { commonInputClass } from "../utils/CommonTheme";
import { results } from "./admin/fakeData";

const LiveSearch = () => {
  const [displaySearch, setdisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const handleOnFocus = () => {
    if (results.length) setdisplaySearch(true);
  };

  const handleOnBlur = () => {
    setdisplaySearch(false);
    setFocusedIndex(-1);
  };
  const handleSelection = (selection) => {
    console.log(selection);
  };

  const handleKeydown = ({ key }) => {
    let nextCount;
    // console.log(key);
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    if (!keys.includes(key)) return;
    //move selection up and down
    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length; //  this will give infinite loop FORMULA
    }
    if (key === "ArrowUp") {
      nextCount = (focusedIndex + results.length - 1) % results.length; // this will give infinite loop FORMULA
    }
    if (key == "Enter") {
      return handleSelection(results[focusedIndex]);
    }
    setFocusedIndex(nextCount);
  };
  return (
    <div className="relative">
      <input
        type="text"
        className={commonInputClass + " border-2 rounded p-1 text-lg"}
        placeholder="Search profile"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeydown}
      />
      <SearchResults
        focusedIndex={focusedIndex}
        results={results}
        visible={displaySearch}
        onSelect={handleSelection}
      />
    </div>
  );
};

// const renderItem = ({id,name,avatar}) => {
//   return (<div className="flex">
//     <img src={avatar} alt="" />
//     <p>{name}</p>
//   </div>)
// }

export default LiveSearch;
const SearchResults = ({
  visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  selectedResultStyle,
  resultcontainerStyle,
}) => {
  const resultContainer = useRef();
  useEffect(() => {
    // console.log(resultContainer);
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);

  if (!visible) return null;
  const getSelectedClass = () => {
    return selectedResultStyle
      ? selectedResultStyle
      : "dark:bg-dark-subtile bg-light-subtile";
  };

  return (
    <div className="absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 overflow-auto space-y-2 mt-1 custom-scroll-bar">
      {results.map((result, index) => {
        return (
          <ResultCard
            key={result.id}
            item={result}
            renderItem={renderItem}
            resultcontainerStyle={resultcontainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onMouseDown={() => onSelect(result)}
            ref={index===focusedIndex?resultContainer:null}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  // we use forwardRef because we can't pass ref as such to the function
  const {
    onMouseDown, // this will be onclick function
    item, //this is the result thing
    renderItem, // this is the
    resultcontainerStyle,
    selectedResultStyle,
  } = props;
  const getClasses = () => {
    if (resultcontainerStyle)
      return resultcontainerStyle + " " + selectedResultStyle;

    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition flex space-x-2 "
    );
  };
  return (
    <div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});
