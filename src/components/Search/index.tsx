import React from "react";

const Search = () => {
  return (
    <div className="flex items-center justify-center py-2 px-4 bg-white rounded shadow-md">
      <input
        className="text-[#8B909A] text-[15px] font-[400] leading-[21px] w-[262px] mr-1 outline-none"
        placeholder="Tìm kiếm"
      />
      <img src="../icons/ic-search.svg" alt="search" />
    </div>
  );
};

export default Search;
