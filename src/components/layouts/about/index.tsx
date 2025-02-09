import Client from "../client";
import Services from "../services";
import Testimodals from "../testimodals";
import Testimonials from "../testimonials";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";

export default function About() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      const { data, error } = await supabase.from("about_data").select();
      console.log({ data, error });
      if (isMounted && data) {
        setData(data);
      }
    };

    getData();

    return () => {
      isMounted = false;
    }
  }, []);

  // Asumsi: data hanya memiliki satu baris, jika lebih, sesuaikan dengan kebutuhan
  const about_data = data[0];

  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>
      <div>
        <section className="about-text">
          {data.map((about_data, index) => (
            <p key={index}>{about_data?.about_desc_eng || "My about text"}</p>
          ))}
        </section>

        <Services />
        <Testimonials />
        <Testimodals />
        <Client />
      </div>
    </article>
  );
}
