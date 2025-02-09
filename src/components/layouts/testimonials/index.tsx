import supabase from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("testimoni").select().order('id', { ascending: true }); 
      if (data) {
        setData(data);
      } else {
        // console.log(error);
      }
    };
    getData();
  }, []);

  const handleTestimonialClick = (index: number) => {
    const modal = document.querySelectorAll(".modal-container")[index];
    if (modal) {
      modal.classList.add("active");
    }
  };

  return (
    <section className="testimonials">
      <h3 className="h3 testimonials-title">Testimonials</h3>
      <ul className="testimonials-list has-scrollbar">
        {data.map((testimonials_data, index) => (
          <li
            key={index}
            className="testimonials-item"
            onClick={() => handleTestimonialClick(index)}
          >
            <div className="content-card" data-testimonials-item>
              <figure className="testimonials-avatar-box">
                <img
                  src={testimonials_data?.img || "Image"}
                  alt={testimonials_data?.img || "Image"}
                  width="60"
                  data-testimonials-avatar
                />
              </figure>

              <h4
                className="h4 testimonials-item-title"
                data-testimonials-title
              >
                {testimonials_data?.testi_name || "Name"}
              </h4>

              <div className="testimonials-text" data-testimonials-text>
                <p>
                  {testimonials_data?.testi_desc || "My Testimonial Message"}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
