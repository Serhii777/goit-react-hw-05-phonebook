import React from "react";
import PropTypes from "prop-types";

const Filter = ({ value, onChangeFilter }) => {
  return (
    <div className="filter-wrapper">
      <label className="filter-label">
        Find contacts by name
        <input
          type="text"
          className="filter-input"
          value={value}
          onChange={(e) => onChangeFilter(e.target.value)}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
};

Filter.defaultProps = {
  value: "",
};

export default Filter;
