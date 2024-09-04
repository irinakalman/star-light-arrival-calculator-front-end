import React, { useState, useEffect } from "react";

export default function StarSearch() {
  const [date, setDate] = useState({ year: "", month: "", day: "" }); // store the selected date
  const [star, setStar] = useState(null); // store the retrieved star

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDate((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    const { year, month, day } = date;
    if (!year || !month || !day) {
      alert("please select a date");
      return;
    }

    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();

    try {
      const response = await fetch(
        `https://birthday-planetary-backend.simplecode.gr/api_main/stars/find_by_iso_date?iso_date=${isoDate}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Incorrect response from db");
      }

      const data = await response.json();
      console.log(data.data[0].Name);

      if (data.data) {
        setStar(data.data[0].Name);
      } else {
        setStar(null);
        alert("No star was found for this date");
      }
    } catch (error) {
      console.error("Error searching for star:", error);
      alert("An error occurred while searching for a star");
    }
  };

  useEffect(() => {
    if (star && window.A) {
      // Initialize Aladin Lite after the star is set and A is available globally
      const aladin = window.A.aladin("#aladin-lite-div", {
        fov: 0.3, // Field of view, adjust as needed
        target: star,
        projection: "AIT",
        cooFrame: "equatorial",
        showCooGridControl: true,
        showSimbadPointerControl: true,
        showCooGrid: true,
      });
    }
  }, [star]);

  return (
    <>
      <div className="relative max-w-[35rem] mx-auto mt-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-500 opacity-50 rounded-2xl"></div>
        <div className="relative flex items-end backdrop-blur-md shadow-md rounded-2xl sm:p-8 p-5 lg:pb-[2.5rem] gap-6 flex-wrap">
          {/* <input onChange={handleDateChange}
          className="mt-0 block w-full px-3 border-0 focus:ring-0 focus:border-black"
          type="date"
        /> */}
          {/* Year Dropdown */}
          <div className="flex flex-col grow">
            <label
              htmlFor="year"
              className="block pb-[2px] font-light text-mutedLabel text-left"
            >
              Year
            </label>
            <select
              name="year"
              value={date.year}
              onChange={handleDateChange}
              className="block w-full p-2 rounded-md"
              style={{
                backgroundPosition: 'right 0.4rem center',
                backgroundSize: '1.3em 1.5em',
              }}
            >
              <option value="">Year</option>
              {[...Array(new Date().getFullYear() - 1940 + 1)].map((_, i) => (
                <option key={i} value={1940 + i}>
                  {1940 + i}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col grow">
            <label
              htmlFor="month"
              className="block pb-[2px] font-light text-mutedLabel text-left"
            >
              Month
            </label>
            <select
              name="month"
              value={date.month}
              onChange={handleDateChange}
              className="block w-full p-2 rounded-md"
              style={{
                backgroundPosition: 'right 0.4rem center',
                backgroundSize: '1.3em 1.5em',
              }}
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month.toString().padStart(2, "0")}>
                  {month.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          {/* Month Dropdown */}

          <div className="flex flex-col grow">
            <label
              htmlFor="day"
              className="block pb-[2px] font-light text-mutedLabel text-left"
            >
              Day
            </label>
            <select
              name="day"
              value={date.day}
              onChange={handleDateChange}
              className="block w-full p-2 rounded-md"  style={{
                backgroundPosition: 'right 0.4rem center',
                backgroundSize: '1.3em 1.5em',
              }}
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day.toString().padStart(2, "0")}>
                  {day.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          {/* Day Dropdown */}

          <button
            onClick={handleSearch}
            className="text-bold px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 rounded-md w-full md:w-auto min-w-[130px] min-h-[41px]"
          >
            Search
          </button>
        </div>
      </div>

      {star && (
        <div className="mt-8">
          <div className="flex flex-row justify-center gap-2">
            <h2 className="sm:text-[1.2rem] md:text-2xl text-white">Star for your date is: </h2>
            <p className="sm:text-[1.2rem] text-white md:text-2xl font-bold">{star}</p>
          </div>

          <div
            className="left-1/2 transform -translate-x-1/2 w-full h-[500px] lg:w-[900px] lg:h-[600px]"
            id="aladin-lite-div"
            style={{ marginTop: "50px" }}
          ></div>
        </div>
      )}
    </>
  );
}
