import  { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "../Css/Admin.css";
import { getCount } from "../AxiosConfigAdmin/AxiosConfig";

function AdminDashBoard() {
  const [students, setStudents] = useState();
  const [tutors, setTutors] = useState();
  const [orders, setOrders] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [monthlyCourses] = useState([]);
  const [courses, setCourses] = useState();
  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await getCount();
        setStudents(response.data.studentCount);
        setTutors(response.data.tutorCount);
        setOrders(response.data.orderCount);
        setTotalIncome(response.data.totalIncome);
        setCourses(response.data.totalCourses);

        const currentMonth = new Date().getMonth() + 1;
        const initialMonthlySales = Array.from({ length: 12 }, (_, index) => {
          const month = ((currentMonth + index - 1) % 12) + 1; // Ensure January is the first month
          return { _id: month, totalIncome: 0 };
        });
        // Update the initial array with the fetched data
        const updatedMonthlySales:any = initialMonthlySales.map((item) => {
          const matchingData = response.data.monthlyIncomeData.find(
            (data:any) => data._id === item._id
          );
          return matchingData || item;
        });
        updatedMonthlySales.sort((a:any, b:any) => a._id - b._id);

        setMonthlyIncome(updatedMonthlySales);

        console.log(courses);
        

        
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Students</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{students}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Tutors</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{tutors}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Enrolls</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{orders}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Income</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>{totalIncome}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={monthlyIncome}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              tickFormatter={(month) =>
                new Date(0, month - 1, 1).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="totalIncome" fill="#82ca9d" name="Monthly Sales" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={monthlyCourses}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              tickFormatter={(month) =>
                new Date(0, month - 1, 1).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Monthly Courses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminDashBoard;
