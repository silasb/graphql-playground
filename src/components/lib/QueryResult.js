const QueryResult = ({ loading, error, data, children = () => {} }) => {
  if (loading) return "Loading...";
  else if (error) return error.toString();
  else return children(data);
};

export default QueryResult;
