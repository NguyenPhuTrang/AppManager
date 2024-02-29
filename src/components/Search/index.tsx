import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setKeyword } from "../../features/actions/keywordSearch";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasData, setHasData] = useState(false); // Thêm biến trạng thái để theo dõi dữ liệu
  const dispatch = useDispatch();
  const debouncedSetKeyword = debounce((term: string) => dispatch(setKeyword(term)), 500);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setHasData(searchTerm.trim() !== '');
    if (searchTerm.trim() === '') {
      debouncedSetKeyword('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && hasData) {
      debouncedSetKeyword(searchTerm);
    }
  };

  return (
    <div className="flex items-center justify-center py-2 px-4 bg-white rounded shadow-md">
      <input
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        value={searchTerm}
        className="text-[#8B909A] text-[15px] font-[400] leading-[21px] w-[262px] mr-1 outline-none"
        placeholder="Tìm kiếm"
      />
      <img src="../icons/ic-search.svg" alt="search" />
    </div>
  );
};

export default Search;
