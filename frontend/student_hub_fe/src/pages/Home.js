import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { InfoCol } from "./components/HomeInfoCol";
import { ClassCol } from "./components/HomeClassCol";
import { SelectedClass } from "./components/SelectedClass";

export function Home() {
    const [schedule, setSchedule] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null); 
    const { auth_id } = useAuth();
    const [daysRemaining, setDaysRemaining] = useState(0);
    const [percentageCompleted, setPercentageCompleted] = useState(0);


    useEffect(() => {
      if (auth_id) {
        axios
          .get("http://localhost:8000/api.php", {
            params: { action: "getStudentId", auth_id },
          })
          .then((res) => {
            const linked_id = res.data?.linked_id;

            // Get class schedule
            axios.get("http://localhost:8000/api.php", {
              params: { action: "schedule", student_id: linked_id },
            }).then((res) => setSchedule(res.data));

            // Get semester end date
            axios.get("http://localhost:8000/api.php", {
              params: { action: "semester", student_id: linked_id },
            }).then((res) => {
              const endDateStr = res.data?.[0]?.semester_end_date;
              calcSemesterDaysLeft();
            });
          })
          .catch((err) => {
            console.error("Error loading student schedule:", err);
          });
      }
    }, [auth_id]);

  function calcSemesterDaysLeft() {
      const startDate = new Date('2025-06-15T00:00:00Z'); // Use UTC time
      const currentDate = new Date();
      const semesterEndDate = new Date('2026-01-15T00:00:00Z'); // Use UTC time

      // Calculate total duration of the semester in days
      const totalDaysDifference = semesterEndDate.getTime() - startDate.getTime();
      const totalDays = Math.round(totalDaysDifference / (1000 * 60 * 60 * 24));

      // Calculate days remaining in the semester
      const daysRemainingDifference = semesterEndDate.getTime() - currentDate.getTime(); 
      const daysRemainingCalc = Math.round(daysRemainingDifference / (1000 * 60 * 60 * 24));

      //Take the max so it's not negative
      const daysRemaining = Math.max(0, daysRemainingCalc);

      const percentageCompleted = ((totalDays - daysRemaining) / totalDays) * 100;

      setPercentageCompleted(percentageCompleted);
      setDaysRemaining(daysRemaining); 
  }

  return (
    <section className="flex flex-col lg:flex-row justify-center items-start gap-4 p-4 mx-auto overflow-x-hidden">
      <div className="card bg-base-300 w-full lg:w-1/3 shadow-sm">
        <ClassCol
          schedule={schedule}
          percentageCompleted={percentageCompleted}
          setSelectedClass={setSelectedClass}
          daysRemaining={daysRemaining}
        />
      </div>

      <div className="card bg-base-300 w-full lg:w-2/3 shadow-sm">
        <SelectedClass selectedClass={selectedClass} />
      </div>

      <div className="card bg-base-300 w-full lg:w-1/3 shadow-sm">
        <InfoCol />
      </div>

    </section>
  );
}

export default Home;

