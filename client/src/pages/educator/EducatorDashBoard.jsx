import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { dummyDashboardData } from "../../assets/assets";
import { assets } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-wrap gap-5">
        {/* Total Enrollments Card */}
        <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
          <img src={assets.patients_icon} alt="patients_icon" />
          <div>
            <p className="text-2xl font-medium text-gray-600">
              {dashboardData.enrolledStudentsData.length}
            </p>
            <p>Total Enrollments</p>
          </div>
        </div>

        {/* Total Courses Card */}
        <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
          <img src={assets.appointments_icon} alt="appointments_icon" />
          <div>
            <p className="text-2xl font-medium text-gray-600">
              {dashboardData.totalCourses}
            </p>
            <p>Total Courses</p>
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
          <img src={assets.earning_icon} alt="earning_icon" />
          <div>
            <p className="text-2xl font-medium text-gray-600">
              {currency}{dashboardData.totalEarnings}
            </p>
            <p>Total Earnings</p>
          </div>
        </div>

<div>
    <h2 className="pb-4 text-lg font-medium">Latest Enrollments</h2>
    <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className="table-fixed md:table-auto w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left bg-gray-100">
                <tr>
                    <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                    <th className="px-4 py-3 font-semibold">Student Name</th>
                    <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-500/20 hover:bg-gray-50">
                        <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                        <td className="md:px-4 px-2 py-3 flex items-center spce-x-3">
                            <img 
                                src={item.student.imageUrl} 
                                alt="profile" 
                                className="w-9 h-9 rounded-full border border-gray-300 shadow-sm" 
                            />
                            <span className="truncate">{item.student.name}</span>
                        </td>
                        <td>{item.courseTitle}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

      </div>
    </div>
  ) : (
    <Loading/>
  );
};

export default Dashboard;