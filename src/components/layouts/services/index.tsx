import supabase from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function Services() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("services").select();

      if (data) {
        setData(data);
      }
    };

    getData();
  }, []);

  const services_data = data[0];

  return (
    <section className="service">
      <h3 className="h3 service-title">What im doing</h3>

      <ul className="service-list">
        {data.map((services_data, index) => (
          <li key={index} className="service-item">
            <div className="service-icon-box">
              <img src={services_data.icon} alt="icon name" width="40" />
            </div>

            <div className="service-content-box">
              <h4 className="h4 service-item-title">
                {services_data?.services_title || "My Service"}
              </h4>

              <p className="service-item-text">
                {services_data?.services_desc || "My Service Description"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
