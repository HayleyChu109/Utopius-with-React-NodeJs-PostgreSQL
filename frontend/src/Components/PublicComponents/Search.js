import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchReq } from "../../Redux/request/actions";

const Search = () => {
  const { search } = useSelector((state) => state.requestStore);
  const [newSearch, setNewSearch] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setNewSearch(search);
  }, [search]);

  const handleSearch = (val) => {
    dispatch(searchReq(val));
  };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      history.push("/");
    }
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
          onKeyDown={(e) => searchEnter(e)}
          className="nav-search form-control"
        />
      </div>
    </>
  );
};

export default Search;
