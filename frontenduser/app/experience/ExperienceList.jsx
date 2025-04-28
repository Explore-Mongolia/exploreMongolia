"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function ExperienceList() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get("http://localhost:9000/experience");
        setExperiences(response.data.experiences);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <div>
      <h1>Experience List</h1>
      <ul>
        {experiences.length > 0 ? (
          experiences.map((experience) => (
            <li key={experience._id}>
              <h2>{experience.name}</h2>
              <p>{experience.description}</p>
              <p>Visited Places: {experience.visitedPlaces.join(", ")}</p>
            </li>
          ))
        ) : (
          <p>No experiences found</p>
        )}
      </ul>
    </div>
  );
}
