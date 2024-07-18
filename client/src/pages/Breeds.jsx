import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { CardBreeds } from "../components/Card";
import Selector from "../components/Selector";
import Swal from "sweetalert2";

export default function Breeds() {
  const tempraments = [
    "Active",
    "Affectionate",
    "Curious",
    "Demanding",
    "Easy Going",
    "Friendly",
    "Intelligent",
    "Lively",
    "Loving",
    "Outgoing",
    "Playful",
    "Quiet",
    "Responsive",
    "Social",
    "Sweet",
  ];

  const [catData, setCatData] = useState([]);
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    const fetchCatBreed = async () => {
      try {
        const { data } = await axios.get("/breeds", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCatData(data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: err.response?.data.message || err.message,
        });
      }
    };

    fetchCatBreed();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/generate-breeds",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: preferences,
      });

      setCatData(data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: err.response?.data.message || err.message,
      });
    }
  };

  const handleChangeInput = (event) => {
    if (event.target.checked) {
      if (preferences.length < 3) {
        setPreferences([...preferences, event.target.value]);
      }
    } else {
      setPreferences(preferences.filter((pref) => event.target.value !== pref));
    }
  };

  return (
    <div className="pt-14  lg:pt-8 "> 
      <h1 className="lg:pt-14 pt-10 text-center font-bold text-3xl text-">
        Select by tempraments
      </h1>
      <form
        className="flex flex-col justify-center items-center gap-3 lg:m-10"
        onSubmit={handleSubmit}
      >
        <div className="grid rid-cols-1 sm:grid-cols-2 w-4/5 md:grid-cols-3 mt-5 md:w-2/3 lg:grid-cols-5 gap-3 lg:w-5/6 mx-10">
          {tempraments.map((temp, index) => {
            return (
              <div key={index} className="lg:col-span-1">
                <Selector
                  handleChangeInput={handleChangeInput}
                  temperament={temp}
                  preferences={preferences}
                />
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="mx-auto shadow-lg bg-light-third mt-4 py-2 px-6 rounded-lg text-white"
        >
          generate
        </button>
      </form>
      <div className="py-8 justify-center items-center sm:py-10 md:py-20 lg:py-10 px-10 sm:px-10 md:px-16 lg:px-6 grid gap-5 sm:grid-cols-2  lg:grid-cols-3  2xl:grid-cols-5">
        {catData.map((cat, index) => (
          <div className="flex items-center justify-center" key={index}>
            <CardBreeds
              id={cat.reference_image_id}
              name={cat.name}
              temperament={cat.temperament}
              description={cat.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
