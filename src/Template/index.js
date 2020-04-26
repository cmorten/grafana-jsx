import PropTypes from "prop-types";

const Template = ({
  allFormat = null,
  allValue = null,
  current = {},
  datasource = null,
  definition = "",
  hide = 0,
  includeAll = false,
  index = -1,
  label = "",
  multi = false,
  multiFormat,
  name = "",
  options = [],
  query = "",
  refresh = 2,
  regex = "",
  skipUrlSync = false,
  sort = 1,
  tagValuesQuery = "",
  tags = [],
  tagsQuery = "",
  type = null,
  useTags = false,
  ...props
}) => (
  <template
    allFormat={allFormat}
    allValue={allValue}
    current={current}
    datasource={datasource}
    definition={definition}
    hide={hide}
    includeAll={includeAll}
    index={index}
    label={label}
    multi={multi}
    multiFormat={multiFormat}
    name={name}
    options={options}
    query={query}
    refresh={refresh}
    regex={regex}
    skipUrlSync={skipUrlSync}
    sort={sort}
    tags={tags}
    tagsQuery={tagsQuery}
    tagValuesQuery={tagValuesQuery}
    type={type}
    useTags={useTags}
    {...props}
  />
);

Template.PropTypes = {
  allFormat: PropTypes.string,
  allValue: PropTypes.any,
  current: PropTypes.shape({
    isNone: PropTypes.bool,
    selected: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.string,
  }),
  datasource: PropTypes.string,
  definition: PropTypes.string,
  hide: PropTypes.oneOf([0, 1, 2]),
  includeAll: PropTypes.bool,
  index: PropTypes.number,
  label: PropTypes.string,
  multi: PropTypes.bool,
  multiFormat: PropTypes.any,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any),
  query: PropTypes.string,
  refresh: PropTypes.oneOf([0, 1, 2]),
  regex: PropTypes.string,
  skipUrlSync: PropTypes.bool,
  sort: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  tagValuesQuery: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  tagsQuery: PropTypes.string,
  type: PropTypes.string,
  useTags: PropTypes.bool,
};

export default Template;
