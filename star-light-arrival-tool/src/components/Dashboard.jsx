import React, { useState } from "react";

export default function StarSearch() {
  const [date, setDate] = useState(""); // store the selected date
  const [star, setStar] = useState(null); // store the retrieved star

  const handleDateChange = (event) => {
    let v;
    let dISO;

    v = event.target.value;

    dISO = new Date(v).toISOString();

    setDate(dISO);
  };

  const handleSearch = async () => {
    if (!date) {
      alert("please select a date");
      return;
    }

    try {
        const response = await fetch(
            `https://birthday-planetary-backend.simplecode.gr/api_main/stars/find_by_iso_date?iso_date=${date}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        console.log(response)

        if (!response.ok) {
        throw new Error("Incorrect response from db");
        }

        const data = await response.json();
        console.log(data.data[0].Name)

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

  return (
    <>
      
      <div className="flex flex-row">
        <input onChange={handleDateChange}
          className="mt-0 block w-full px-3 border-0 focus:ring-0 focus:border-black"
          type="date"
        />
        <button onClick={handleSearch} className="text-bold px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Search
        </button>

        
      </div>
      {star && (
            <div className="mt-4">
                <h2 className="text-2xl text-white">Star for your date is:</h2>
                <p className="text-white text-xl">{star}</p>
            </div>
        )}
    </>
  );
}
