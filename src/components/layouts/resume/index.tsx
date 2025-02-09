import supabase from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap,faTrophy} from "@fortawesome/free-solid-svg-icons";

export default function Resume() {
  // 2 tabel
  const [educationdata, setEducationData] = useState<any[]>([]);
  const [experienceData, setExperienceData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: education, error: educationError } = await supabase
        .from("resume")
        .select()
        .order("id", { ascending: false }); // Urutkan berdasarkan kolom 'id'

      if (educationError) {
        console.log("Error Fetching education data", educationError);
      } else {
        setEducationData(education);
      }

      const { data: experience, error: experienceError } = await supabase
        .from("experience")
        .select()
        .order("id", { ascending: false }); // Urutkan berdasarkan kolom 'id'

      if (experienceError) {
        console.log("Error fetching Experience Data", experienceError);
      } else {
        setExperienceData(experience);
      }
    };
    fetchData();
  }, []);

  return (
    <article className="resume" data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
          <FontAwesomeIcon icon={faGraduationCap} />
          </div>

          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          {educationdata.map((resume_data, index) => (
            <li key={index} className="timeline-item">
              <h4 className="h4 timeline-item-title">
                {resume_data.title_education}
              </h4>

              <span>{resume_data.date_education}</span>

              <p className="timeline-text">{resume_data.desc_education}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
          <FontAwesomeIcon icon={faTrophy} />
          </div>

          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          {experienceData.map((experience_data, index) => (
            <li key={index} className="timeline-item">
              <h4 className="h4 timeline-item-title">
                {experience_data.experience_title}
              </h4>

              <span>{experience_data.experience_date}</span>

              <p className="timeline-text">{experience_data.experience_desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>

        <ul className="skills-list content-card">
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Web design</h5>
              <data value="80">80%</data>
            </div>

            <div className="skill-progress-bg">
              <div
                className="skill-progress-fill"
                style={{ width: "80%" }}
              ></div>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Graphic design</h5>
              <data value="70">70%</data>
            </div>

            <div className="skill-progress-bg">
              <div
                className="skill-progress-fill"
                style={{ width: "98%" }}
              ></div>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Branding</h5>
              <data value="90">90%</data>
            </div>

            <div className="skill-progress-bg">
              <div
                className="skill-progress-fill"
                style={{ width: "90%" }}
              ></div>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">WordPress</h5>
              <data value="50">50%</data>
            </div>

            <div className="skill-progress-bg">
              <div
                className="skill-progress-fill"
                style={{ width: "80%" }}
              ></div>
            </div>
          </li>
        </ul>
      </section>
    </article>
  );
}
