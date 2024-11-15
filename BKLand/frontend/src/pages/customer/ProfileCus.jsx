import React, { useState, useEffect } from 'react';
import TopNavCustomer from '../../components/TopNavCustomer';
import { FiUser, FiMail, FiPhone, FiCalendar, FiFlag, FiCreditCard, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import axios from 'axios';
import Cookie from 'js-cookie';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [userInfo, setUserInfo] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    nationality: '',
    identityNumber: '',
    statusAccount: ''
  });
  const [ownershipCert, setOwnershipCert] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = Cookie.get('nameID');
        if (!userId) {
          throw new Error('User not logged in');
        }

        const response = await axios.get(`https://bkland.onrender.com/users/${userId}`);
        const userData = {
          ...response.data,
          dob: response.data.dob ? new Date(response.data.dob).toISOString().split('T')[0] : ''
        };
        setUserInfo(userData);

        // Fetch ownership certificate
        const certResponse = await axios.get(`https://bkland.onrender.com/ownership-certificates/${userId}`);
        setOwnershipCert(certResponse.data);

        // Placeholder invoices data
        setInvoices([
          { id: 1, date: '2024-03-10', amount: 50000000, status: 'Paid' }
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const userId = Cookie.get('nameID');
      await axios.put(`https://bkland.onrender.com/users/${userId}`, userInfo);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-amber-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <TopNavCustomer/>
      <div className="min-h-screen bg-amber-50 pt-28">
        <div className="max-w-6xl mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl p-8 relative border-4 border-double border-amber-900"
          >
            {/* Header with Avatar */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-amber-700 rounded-full flex items-center justify-center text-white text-3xl font-serif">
                {userInfo.name?.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-serif text-amber-900">{userInfo.name}</h1>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                  @{userInfo.username}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-amber-200 mb-8">
              <div className="flex space-x-8">
                {['Thông tin cá nhân', 'Phiếu sở hữu căn hộ', 'Hóa đơn'].map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`pb-2 px-4 font-serif text-lg relative ${
                      activeTab === index 
                        ? 'text-amber-900 border-b-2 border-amber-900' 
                        : 'text-amber-600 hover:text-amber-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 0 && (
              <div className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-amber-900 mb-2 flex items-center font-serif">
                            <FiUser className="mr-2" />
                            Họ và tên
                          </label>
                          <input
                            name="name"
                            value={userInfo.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-amber-50 border-2 border-amber-700 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-amber-900 mb-2 flex items-center font-serif">
                            <FiMail className="mr-2" />
                            Email
                          </label>
                          <input
                            name="email"
                            value={userInfo.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-amber-50 border-2 border-amber-700 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-amber-900 mb-2 flex items-center font-serif">
                            <FiPhone className="mr-2" />
                            Số điện thoại
                          </label>
                          <input
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-amber-50 border-2 border-amber-700 rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-amber-900 mb-2 flex items-center font-serif">
                            <FiCalendar className="mr-2" />
                            Ngày sinh
                          </label>
                          <input
                            type="date"
                            name="dob"
                            value={userInfo.dob}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-amber-50 border-2 border-amber-700 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-amber-900 mb-2 flex items-center font-serif">
                            <FiFlag className="mr-2" />
                            Quốc tịch
                          </label>
                          <input
                            name="nationality"
                            value={userInfo.nationality}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-amber-50 border-2 border-amber-700 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-amber-900 mb-2 flex items-center font-serif">
                            <FiCreditCard className="mr-2" />
                            CCCD/CMND
                          </label>
                          <input
                            name="identityNumber"
                            value={userInfo.identityNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-amber-50 border-2 border-amber-700 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border-2 border-amber-900 text-amber-900 rounded-lg hover:bg-amber-50"
                      >
                        <FiX className="inline mr-2" />
                        Hủy
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800"
                      >
                        <FiSave className="inline mr-2" />
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { icon: FiUser, label: "Họ và tên", value: userInfo.name },
                        { icon: FiMail, label: "Email", value: userInfo.email },
                        { icon: FiPhone, label: "Số điện thoại", value: userInfo.phone },
                        { icon: FiCalendar, label: "Ngày sinh", value: userInfo.dob },
                        { icon: FiFlag, label: "Quốc tịch", value: userInfo.nationality },
                        { icon: FiCreditCard, label: "CCCD/CMND", value: userInfo.identityNumber }
                      ].map((field, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <field.icon className="text-amber-700" />
                          <span className="font-serif text-amber-900">{field.label}:</span>
                          <span>{field.value || 'Chưa cập nhật'}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 border-2 border-amber-900 text-amber-900 rounded-lg hover:bg-amber-50"
                      >
                        <FiEdit2 className="inline mr-2" />
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 1 && (
              <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-900">
                <h2 className="text-2xl font-serif text-amber-900 mb-6 text-center">
                  Phiếu Sở Hữu Căn Hộ
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-amber-200 pb-2">
                      <span className="font-serif text-amber-900">Loại phiếu:</span>
                      <span>{ownershipCert?.ticketType || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-200 pb-2">
                      <span className="font-serif text-amber-900">Ngày phát hành:</span>
                      <span>{ownershipCert?.publishDate ? new Date(ownershipCert.publishDate).toLocaleDateString('vi-VN') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-200 pb-2">
                      <span className="font-serif text-amber-900">Hiệu lực đến:</span>
                      <span>{ownershipCert?.validityPeriod ? new Date(ownershipCert.validityPeriod).toLocaleDateString('vi-VN') : 'Không thời hạn'}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-amber-200 pb-2">
                      <span className="font-serif text-amber-900">Trạng thái:</span>
                      <span className={`px-2 py-1 rounded ${
                        ownershipCert?.statusTicket === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ownershipCert?.statusTicket || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-amber-200 pb-2">
                      <span className="font-serif text-amber-900">Mã căn hộ:</span>
                      <span>{ownershipCert?.apartmentID || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-200 pb-2">
                      <span className="font-serif text-amber-900">Mã khách hàng:</span>
                      <span>{ownershipCert?.customerID || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-amber-900 mb-6 text-center">
                  Danh Sách Hóa Đơn
                </h2>
                <div className="overflow-hidden rounded-lg border-2 border-amber-900">
                  <table className="min-w-full divide-y divide-amber-200">
                    <thead className="bg-amber-50">
                      <tr>
                        <th className="px-6 py-3 text-left font-serif text-amber-900">Mã hóa đơn</th>
                        <th className="px-6 py-3 text-left font-serif text-amber-900">Ngày</th>
                        <th className="px-6 py-3 text-left font-serif text-amber-900">Số tiền</th>
                        <th className="px-6 py-3 text-left font-serif text-amber-900">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-amber-200">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="px-6 py-4 whitespace-nowrap font-serif">
                            {invoice.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-serif">
                            {new Date(invoice.date).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-serif">
                            {invoice.amount.toLocaleString('vi-VN')} VNĐ
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-sm
                              ${invoice.status === 'Paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'}`}
                            >
                              {invoice.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </MotionDiv>
        </div>
      </div>
    </>
  );
}

export default UserProfile;