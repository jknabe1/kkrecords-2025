
import SearchInput from "@/components/SearchInput";
import getCardByType from "@/utils/getCardbyType";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const SearchPage = () => {
  const {
    query: { query: queryFromUrl },
  } = useRouter();

  // a state to store the search string
  const [searchString, setSearchString] = useState(
    typeof queryFromUrl === "string" ? queryFromUrl : ""
  );
  const [searchResults, setSearchResults] = useState([] as any[]);

  async function getResponse() {
    // query should be the URL that your search will be executed on.
    const query = `http://localhost:3001/api/search?query=${searchString}`;
    const response = await fetch(query, {
      method: "GET",
    });

    const data = await response.json(); // Extracting data as a JSON Object from the response
    setSearchResults(data);
  }

  const handleClickUser = async () => {
    if (searchString === "" || searchString.trim() === "") return;
    getResponse();
    router.push({
      pathname: "../search",
      query: { query: searchString },
    });
  };

  useEffect(() => {
    if (searchString !== "") {
      handleClickUser();
    }
  }, []);

  return (
    <div className="pageWrapper">
      <h1>Search Page</h1>
      <SearchInput
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        onClick={handleClickUser}
      />
      <div className="wrapper">
        {searchResults.map((result) => getCardByType(result))}
      </div>
    </div>
  );
};

export default SearchPage;