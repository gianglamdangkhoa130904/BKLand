import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavCustomer from '../../components/TopNavCustomer';
import CanHo from '../../assets/apartment_1.jpeg';
import axios from 'axios';

const ApartmentDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apartment, setApartment] = useState('');
    const [building, setBuilding] = useState('');
    const [subdivision, setSubdivision] = useState('');
    const [project, setProject] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const fetchData = async () => {
        try {
        setLoading(true);
        const dataApartment = location.state.apartmentData;
        setApartment(dataApartment);
        const responceBuilding = await axios.get(`https://bkland.onrender.com/buildings/${dataApartment.buildingID?._id}`);
        setBuilding(responceBuilding.data);
        // console.log(responceSubdivision.data);
        const responceSubdivision = await axios.get(`https://bkland.onrender.com/subdivisions/${responceBuilding.data.subdivision?._id}`);
        setSubdivision(responceSubdivision.data);
        // console.log(responceSubdivision.data);
        const responceProject = await axios.get(`https://bkland.onrender.com/projects/${responceSubdivision.data.project?._id}`);
        setProject(responceProject.data.project);
        // console.log(responceProject.data.project);

        } catch (error) {
            console.error("Full Error Details:", error);
            let errorMessage = 'An error occurred while fetching data';
            if (error.response?.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            } else if (error.response?.status === 404) {
                errorMessage = 'Data not found. Please check the information.';
            } else if (error.message) {
                errorMessage = error.message;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    const handleBuy_Apartment = () => {
        const data =  {apartment: apartment, 
            building: building.buildingName, 
            subdivision: subdivision.subdivisionName,
            project: project.projectName,
            transactionType: location.state.transactionType};
        navigate('/customer/details', { state: data });
    }
    const handleRent_Apartment = () => {
        const data =  {apartment: apartment, 
            building: building.buildingName, 
            subdivision: subdivision.subdivisionName,
            project: project.projectName,
            transactionType: location.state.transactionType};
        navigate('/customer/details', { state: data });
    }
    useEffect(() => {
        fetchData();
    }, [])
    const TabContent = ({ isLoading, error, children }) => {
        if (isLoading) {
            return (
                <div className="animate-pulse space-y-4">
                    <div className="h-5 bg-amber-100 rounded w-3/5"></div>
                    <div className="h-24 bg-amber-100 rounded w-full"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-red-800 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <span className="mr-2">⚠️</span>
                    {error}
                </div>
            );
        }

        return children;
    };

    return (
        <div className="bg-amber-50 min-h-screen relative">
            <TopNavCustomer/>
            
            <div className="max-w-6xl mx-auto pt-28 px-4">
                {/* Gallery với style vintage */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2 h-96">
                        <div className="w-full h-full relative border-4 border-amber-900 rounded-lg overflow-hidden shadow-xl">
                            <img src={CanHo} alt="Main" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-[47%] border-4 border-amber-900 rounded-lg overflow-hidden shadow-lg">
                            <img src={CanHo} alt="Side 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="h-[47%] border-4 border-amber-900 rounded-lg overflow-hidden shadow-lg">
                            <img src={CanHo} alt="Side 2" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-[47%] border-4 border-amber-900 rounded-lg overflow-hidden shadow-lg">
                            <img src={CanHo} alt="Side 3" className="w-full h-full object-cover" />
                        </div>
                        <div className="h-[47%] border-4 border-amber-900 rounded-lg overflow-hidden shadow-lg">
                            <img src={CanHo} alt="Side 4" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Main Content với style vintage */}
                <div className="mt-10 bg-white rounded-lg shadow-xl border-4 border-double border-amber-900 p-8 mb-32">
                    {/* Tabs */}
                    <div className="border-b-2 border-amber-200">
                        <div className="flex justify-center space-x-8">
                            {['Thông tin dự án', 'Phân khu', 'Tòa', 'Tổng quan căn hộ'].map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`pb-2 px-4  text-lg relative
                                        ${activeTab === index 
                                            ? 'text-amber-900 border-b-2 border-amber-900' 
                                            : 'text-amber-600 hover:text-amber-800'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content với style vintage */}
                    <div className="mt-8  p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
                        {activeTab === 0 && (
                            <TabContent isLoading={loading} error={error}>
                                <div className="space-y-4">
                                    <div className="flex border-b border-amber-200 pb-2">
                                        <span className="text-lg font-semibold text-amber-900 w-32">Dự án:</span>
                                        <span className="text-lg">{project?.projectName || 'Đang tải...'}</span>
                                    </div>
                                    <div className="flex border-b border-amber-200 pb-2">
                                        <span className="text-lg font-semibold text-amber-900 w-32">Mô tả:</span>
                                        <span className="text-lg">{project?.projectDescription || 'Đang tải...'}</span>
                                    </div>
                                </div>
                            </TabContent>
                        )}
                        {activeTab === 1 && (
                            <TabContent isLoading={loading} error={error}>
                                <div className="space-y-4">
                                    <div className="flex border-b border-amber-200 pb-2">
                                        <span className="text-lg font-semibold text-amber-900 w-32">Phân khu:</span>
                                        <span className="text-lg">{subdivision?.subdivisionName || 'Đang tải...'}</span>
                                    </div>
                                    <div className="flex border-b border-amber-200 pb-2">
                                        <span className="text-lg font-semibold text-amber-900 w-32">Mô tả:</span>
                                        <span className="text-lg">{subdivision?.subdivisionDescription || 'Đang tải...'}</span>
                                    </div>
                                </div>
                            </TabContent>
                        )}
                        {activeTab === 2 && (
                            <TabContent isLoading={loading} error={error}>
                                <div className="space-y-4">
                                    <div className="flex border-b border-amber-200 pb-2">
                                        <span className="text-lg font-semibold text-amber-900 w-32">Tòa:</span>
                                        <span className="text-lg">{building?.buildingName || 'Đang tải...'}</span>
                                    </div>
                                    <div className="flex border-b border-amber-200 pb-2">
                                        <span className="text-lg font-semibold text-amber-900 w-32">Mô tả:</span>
                                        <span className="text-lg">{building?.buildingDescription || 'Đang tải...'}</span>
                                    </div>
                                </div>
                            </TabContent>
                        )}
                        {activeTab === 3 && (
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex border-b border-amber-200 pb-2">
                                    <span className="text-lg font-semibold text-amber-900">Phòng ngủ:</span>
                                    <span className="text-lg ml-2">{apartment.numberOfBedroom}</span>
                                </div>
                                <div className="flex border-b border-amber-200 pb-2">
                                    <span className="text-lg font-semibold text-amber-900">Phòng tắm:</span>
                                    <span className="text-lg ml-2">{apartment.numberOfToilet}</span>
                                </div>
                                <div className="flex border-b border-amber-200 pb-2">
                                    <span className="text-lg font-semibold text-amber-900">Hướng:</span>
                                    <span className="text-lg ml-2">{apartment.direction}</span>
                                </div>
                                <div className="flex border-b border-amber-200 pb-2">
                                    <span className="text-lg font-semibold text-amber-900">Tầng:</span>
                                    <span className="text-lg ml-2">{apartment.floor}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Price Bar với animation và style vintage */}
            <div 
                className={`fixed bottom-0 left-0 right-0 transition-all duration-500 ease-in-out transform
                        ${showPrice ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ zIndex: 50 }}  // Thêm z-index để đảm bảo nằm trên hover zone
            >
                <div className="max-w-xl mx-auto mb-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-amber-900 shadow-lg mx-4 relative overflow-hidden">
                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-900"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-900"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-900"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-900"></div>

                        {/* Price Content */}
                        <div className="space-y-3" onMouseLeave={() => setShowPrice(false)}>
                            <div className="flex justify-between items-center">
                                {location.state.transactionType === 'buy' ? 
                                (
                                    <div>
                                        <span className="text-lg text-amber-900 mr-2">
                                            Giá niêm yết
                                        </span>
                                        <span className="text-xl font-bold text-amber-900">
                                            {(apartment.sellingPrice * 1.12).toFixed(0)} vnđ
                                        </span>
                                        <div className="text-sm text-amber-700 italic">
                                            Đã bao gồm VAT & KPBT
                                        </div>
                                    </div>
                                ):(
                                    <div>
                                        <span className="text-lg  text-amber-900 mr-2">
                                            Giá thuê
                                        </span>
                                        <span className="text-xl font-bold text-amber-900">
                                            {apartment.rentPrice} vnđ
                                        </span>
                                    </div>
                                )}
                                
                            </div>
                            
                            
                            {location.state.transactionType === 'buy' ? 
                                (
                                    <button
                                        onClick={handleBuy_Apartment}
                                        className="w-full py-3 text-white rounded-md 
                                                transition-all duration-300 hover:shadow-lg
                                                transform hover:-translate-y-0.5 cursor-pointer
                                                bg-amber-900 hover:bg-amber-800
                                                border border-amber-950">
                                        <div>Đặt cọc 50.000.000 vnđ</div>
                                    </button>
                                ):(
                                    <button
                                        onClick={handleRent_Apartment}
                                        className="w-full py-3 text-white rounded-md 
                                                transition-all duration-300 hover:shadow-lg
                                                transform hover:-translate-y-0.5 cursor-pointer
                                                bg-amber-900 hover:bg-amber-800
                                                border border-amber-950">
                                        <div>Đặt căn</div>
                                    </button>
                                )}
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Detection Zone */}
            <div 
                className="fixed bottom-0 left-0 right-0 h-32 bg-transparent"
                onMouseEnter={() => setShowPrice(true)}
                style={{ zIndex: 40 }}  // Đặt z-index thấp hơn price bar
            />
        </div>
    );
};

export default ApartmentDetails;
