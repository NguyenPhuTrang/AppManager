import React, { useState } from 'react';

const Navigation = () => {
    const [count, setCount] = useState(10);
    const quantityList = [
        10,
        20,
        30,
        40,
        50,
    ]
    return (
        <div className="w-full py-4 px-6 flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
                <p className="text-[15px] font-[500] text-[#8B909A] leading-[18px] tracking-wide">Showing</p>
                <div className="relative flex items-center justify-center gap-[6px] py-[10px] px-[20px] group rounded border-[1px] border-solid border-[#E9E7FD]">
                    <p className="text-[15px] font-[500] text-[#23272E] leading-[18px] select-none">{count}</p>
                    <img src="../icons/ic-chevron-down.svg" alt="" className="w-4 h-4" />
                    <ul className="absolute w-full bg-white rounded-[4px] group-hover:block hidden border-solid border-[1px] border-[#E9E7FD] top-[100%] left-0">
                        {quantityList.map((item, index) => (
                            <li
                                key={index}
                                className="cursor-pointer select-none text-[14px] font-[500] text-[#23272E] leading-[18px] flex items-center justify-center py-2 hover:bg-[#E9E7FD]"
                                onClick={() => { setCount(item) }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="text-[15px] font-[500] text-[#8B909A] leading-[18px]">of 50</p>
            </div>
            <div className="">
                <ul className="flex items-center gap-[2px]">
                    <li className="flex items-center justify-center cursor-pointer select-none py-[6px] px-2 rounded-[4px] bg-[#F1F2F6]">
                        <img src="../icons/ic-chevron-left.svg" alt="" className="w-4 h-4" />
                    </li>
                    <li className="flex items-center justify-center cursor-pointer select-none py-1 px-3 rounded-[4px] text-[13px] text-[#fff] font-[400] leading-5 bg-[#0F60FF]">
                        1
                    </li>
                    <li className="flex items-center justify-center cursor-pointer select-none py-1 px-3 rounded-[4px] text-[13px] text-[#8B909A] font-[400] leading-5 bg-[#F1F2F6]">
                        2
                    </li>
                    <li className="flex items-center justify-center cursor-pointer select-none py-1 px-3 rounded-[4px] text-[13px] text-[#8B909A] font-[400] leading-5 bg-[#F1F2F6]">
                        3
                    </li>
                    <li className="flex items-center justify-center cursor-pointer select-none py-1 px-3 rounded-[4px] text-[13px] text-[#8B909A] font-[400] leading-5 bg-[#F1F2F6]">
                        4
                    </li>
                    <li className="flex items-center justify-center cursor-pointer select-none py-1 px-3 rounded-[4px] text-[13px] text-[#8B909A] font-[400] leading-5 bg-[#F1F2F6]">
                        5
                    </li>
                    <li className="flex items-center justify-center cursor-pointer select-none py-[6px] px-2 rounded-[4px] bg-[#F1F2F6]">
                        <img src="../icons/ic-chevron-right.svg" alt="" className="w-4 h-4" />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;