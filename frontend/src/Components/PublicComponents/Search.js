import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchReq } from "../../Redux/request/actions";

const Search = () => {
  const { search } = useSelector((state) => state.requestStore);
  const [newSearch, setNewSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setNewSearch(search);
  }, [search]);

  const handleSearch = (val) => {
    dispatch(searchReq(val));
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="New search.."
          value={newSearch}
          onChange={(e) => {
            handleSearch(e.currentTarget.value);
          }}
          className="nav-search form-control"
        />
      </div>
    </>
  );
};

export default Search;
