import Image from "next/image";
import supabase from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function Client()  {

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("client").select().order('id', { ascending: true }); 
      if (data) {
        setData(data);
      }
    };

    getData();
  }, []);

  const client = data[0];

  return (
    <section className="clients">

          <h3 className="h3 clients-title">Clients</h3>

          <ul className="clients-list has-scrollbar">
          {data.map((client_data, index) => (
            <li key={index} className="clients-item">
              <a href="#">
                <img src={client_data.img_client} alt="client logo"/>
              </a>
            </li>
              ))}
            
          </ul>

        </section>
  )
}
