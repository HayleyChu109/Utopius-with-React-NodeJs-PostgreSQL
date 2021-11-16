import { useDispatch } from "react-redux";
import { searchReq } from "../../Redux/request/actions";

const Search = () => {
  const dispatch = useDispatch();

  const handleSearch = (val) => {
    dispatch(searchReq(val));
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="New search.."
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
