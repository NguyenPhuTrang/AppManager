import React, { useEffect } from 'react';
import LayoutDashboard from '../LayoutDashboard';
import Navigation from "../../components/Navigation";
import Modal from "../../components/Modal";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increment } from '../../actions/active';
import { products } from '../../data';

const ProductPage = () => {
    const active = useSelector((state) => state.active);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://ttlab-intern-training-be-iota.vercel.app/api/v1/product')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            });
    }, []);

    return (
        <LayoutDashboard>
            <div className="w-full flex flex-col bg-white rounded-[16px] pt-2 pb-[21px] table-shadow">
                <table className="min-w-full divide-y divide-[#E9E7FD] pl-[16px] pr-[24px]">
                    <thead>
                        <tr>
                            <th className="py-4 pr-5 pl-9 text-left text-[13px] select-none text-[#8B909A] font-[500]">TÊN SẢN PHẨM</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">GIÁ</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">SỐ LƯỢNG</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">MÔ TẢ</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">ẢNH</th>
                            <th className="py-4 px-5 text-left text-[13px] select-none text-[#8B909A] font-[500]">HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E7FD]">
                        {products.map((product) => (
                            <tr key={product.name} className="py-">
                                <td className="py-4 pr-5 pl-9 text-[15px] text-[#23272E] select-none font-[600]">{product.name}</td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{product.price}</td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">{product.quantity}</td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400] w-[313px]">{product.description}</td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[400]">
                                    <img src={product.image} alt="" className="w-9 h-9 rounded-[2px]" />
                                </td>
                                <td className="py-4 px-5 text-[15px] text-[#23272E] select-none font-[600]">
                                    <div className="w-full h-full flex gap-[10px] items-center">
                                        <img src="../icons/ic-edit.svg" className="w-6 h-6 cursor-pointer" alt="" />
                                        <img src="../icons/ic-trash.svg" className="w-6 h-6 cursor-pointer" alt="" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr></hr>
                <Navigation />
            </div>
            {
                active && (
                    <Modal title={'Tạo mới sản phẩm'}>
                        <div className="w-full bg-[#F7F8FA] pt-4 pb-5 px-5">
                            <form className="w-full flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Tên sản phẩm
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="Nhập tên sản phẩm" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Giá
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="Nhập giá sản phẩm" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Số lượng
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="Nhập số lượng sản phẩm" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Mô tả</label>
                                    <textarea rows={6} className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="Nhập mô tả" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-[14px] font-[500] leading-5 text-[#464F60]">Ảnh sản phẩm
                                        <span className="text-[14px] font-[500] leading-5 text-[#0F60FF]"> *</span>
                                    </label>
                                    <input className="py-[6px] px-3 text-[14px] font-[400] leading-5 text-[#A1A9B8] rounded-md outline-none" placeholder="Nhập link ảnh sản phẩm" />
                                </div>
                            </form>
                        </div>
                        <div className="w-full flex items-center justify-end py-4 pr-5 rounded-b-xl gap-4 bg-[#fff]">
                            <button
                                onClick={() => dispatch(increment(true))}
                                className="py-[6px] px-5 rounded-md text-[14px] text-[#464F60] font-[500] leading-5 button_cancel-shadow">
                                Hủy
                            </button>
                            <button className="py-[6px] px-5 rounded-md text-[14px] text-[#fff] font-[500] leading-5 shadow bg-[#0F60FF]">
                                Tạo mới
                            </button>
                        </div>
                    </Modal>
                )
            }
        </LayoutDashboard>
    );
};

export default ProductPage;