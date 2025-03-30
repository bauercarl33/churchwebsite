import "./SearchBar.css";
const SearchBar = () => {
  return (
    <div class="search-wrapper">
      <form>
        <input
          type="text"
          name="focus"
          required
          class="search-box"
          placeholder="Enter search term"
        />
        <button class="close-icon" type="reset"></button>
      </form>
    </div>
  );
};
export default SearchBar;
