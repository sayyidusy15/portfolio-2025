'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from '@/utils/supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faEnvelope,faPhone,faCalendar,faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Sidebar() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("personal").select();
      // console.log({ data, error });
      if (data) {
        setData(data);
      }
    };

    getData();
  }, []);

  // Asumsi: data hanya memiliki satu baris, jika lebih, sesuaikan dengan kebutuhan
  const personal = data[0]; 

  return (
    <aside className="sidebar" data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img
            src="/images/profile.png"
            alt={personal?.name || "Profile Image"}
            width="80"
          />
        </figure>

        <div className="info-content">
          <h1 className="name" title={personal?.name}>
            {personal?.name || "Your Name"}
          </h1>
          <p className="title">{personal?.profession || "Your Profession"}</p>
        </div>

        <button className="info_more-btn" data-sidebar-btn>
          <span>Show Contacts</span>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <FontAwesomeIcon icon={faEnvelope}/>
            </div>

            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href={`mailto:${personal?.email || ""}`} className="contact-link">
                {personal?.email || "your-email@example.com"}
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <FontAwesomeIcon icon={faPhone}/>
            </div>

            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href={`tel:${personal?.phone || ""}`} className="contact-link">
                {personal?.phone || "(+00) 123-456-7890"}
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
            <FontAwesomeIcon icon={faCalendar}/>
            </div>

            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time dateTime={personal?.birthday || ""}>
                {personal?.birthday ? new Date(personal.birthday).toLocaleDateString() : "YYYY-MM-DD"}
              </time>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
            <FontAwesomeIcon icon={faLocationCrosshairs}/>
            </div>

            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>{personal?.location || "Your Location"}</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <Link href="https://github.com/Sayyidusy" className="social-link" passHref>    
            <FontAwesomeIcon icon={faGithub}/>
            </Link>
          </li>

          <li className="social-item">
            <Link href="https://www.linkedin.com/in/sayyidusy-alghiffari-858944219/" className="social-link" passHref>
            <FontAwesomeIcon icon={faLinkedin}/>
            </Link>
          </li>

          <li className="social-item">
            <Link href="https://www.instagram.com/sanscoders/" className="social-link" passHref>
            <FontAwesomeIcon icon={faInstagram}/>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
