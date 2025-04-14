import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaMoneyBillWave,
  FaBook,
  FaClipboardList,
  FaFileInvoice,
  FaChalkboardTeacher,
  FaBell,
  FaCalendarAlt,
} from "react-icons/fa";
import { Bar, Doughnut, Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "chart.js/auto";
import { getUserFromCookie } from "../../../security/cookies/UserCookie";

export const Dashboard = () => {
  const user = getUserFromCookie();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(user?.role);
  }, [user]);

  const statsData = {
    students: 500,
    faculty: 50,
    staff: 30,
    revenue: 17000,
    pendingPayments: 3500,
    courses: 30,
    applications: 35,
    lectures: 5,
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 Dashboard</h2>

      {/* Notification Panel */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg mb-6 flex items-center"
      >
        <FaBell className="text-2xl mr-3" />
        <p className="text-lg">You have new notifications! 📢</p>
      </motion.div>

      {/* ADMIN PANEL */}
      {(role.toLowerCase() === "admin" ||
        role.toLowerCase() === "superadmin") && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedStatCard
              icon={<FaUsers />}
              title="Total Students"
              value={statsData.students}
              color="blue"
            />
            <AnimatedStatCard
              icon={<FaUserTie />}
              title="Total Faculty"
              value={statsData.faculty}
              color="green"
            />
            <AnimatedStatCard
              icon={<FaChalkboardTeacher />}
              title="Courses Available"
              value={statsData.courses}
              color="red"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <ChartCard title="User Distribution">
              <Bar
                data={{
                  labels: ["Students", "Faculty", "Staff"],
                  datasets: [
                    {
                      label: "Total Count",
                      data: [500, 200, 330],
                      backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
                    },
                  ],
                }}
              />
            </ChartCard>
            <UpcomingEvents />
          </div>
        </>
      )}

      {/* MANAGER PANEL */}
      {role.toLowerCase() === "manager" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedStatCard
              icon={<FaClipboardList />}
              title="Pending Applications"
              value={statsData.applications}
              color="purple"
            />
            <AnimatedStatCard
              icon={<FaBook />}
              title="Approved Courses"
              value="20"
              color="blue"
            />
            <AnimatedStatCard
              icon={<FaChalkboardTeacher />}
              title="Guest Lectures"
              value={statsData.lectures}
              color="yellow"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <UpcomingEvents />
            <ProgressCard title="Application Processing" progress={70} />
          </div>
        </>
      )}

      {/* ACCOUNTANT PANEL */}
      {role.toLowerCase() === "acountant" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedStatCard
              icon={<FaMoneyBillWave />}
              title="Total Revenue"
              value={`$${statsData.revenue}`}
              color="yellow"
            />
            <AnimatedStatCard
              icon={<FaFileInvoice />}
              title="Pending Payments"
              value={`$${statsData.pendingPayments}`}
              color="red"
            />
            <AnimatedStatCard
              icon={<FaBook />}
              title="Scholarships Processed"
              value="12"
              color="green"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <ChartCard title="Revenue Breakdown">
              <Doughnut
                data={{
                  labels: ["Tuition", "Hostel", "Misc"],
                  datasets: [
                    {
                      label: "Revenue (in $)",
                      data: [10000, 5000, 2000],
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                  ],
                }}
              />
            </ChartCard>
            <RecentTransactions />
          </div>
        </>
      )}
    </div>
  );
};

// Animated Stat Card
const AnimatedStatCard = ({ icon, title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`bg-white p-6 rounded-lg shadow-md flex items-center border-l-4 border-${color}-500`}
  >
    <div className={`text-${color}-500 text-4xl mr-4`}>{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-2xl font-bold">{value}</p>
    </div>
  </motion.div>
);

// Chart Card
const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

// Upcoming Events
const UpcomingEvents = () => (
  <div className="bg-white p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-4 flex items-center">
      <FaCalendarAlt className="text-blue-500 mr-2" />
      Upcoming Events
    </h3>
    <ul className="list-disc ml-5 text-gray-700">
      <li>📅 Faculty Meeting - March 25</li>
      <li>📅 Sports Fest - April 10</li>
      <li>📅 Guest Lecture on AI - April 15</li>
    </ul>
  </div>
);

// Progress Card
const ProgressCard = ({ title, progress }) => (
  <div className="bg-white p-6 rounded-lg ">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className={`h-4 rounded-full bg-blue-500`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p className="text-gray-600 mt-2">{progress}% Completed</p>
  </div>
);

// Recent Transactions
const RecentTransactions = () => (
  <div className="bg-white p-6 rounded-lg ">
    <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
    <ul className="list-disc ml-5 text-gray-700">
      <li>💰 Tuition Fee Payment - $500</li>
      <li>💰 Scholarship Disbursed - $300</li>
      <li>💰 Hostel Fees Paid - $200</li>
    </ul>
  </div>
);
