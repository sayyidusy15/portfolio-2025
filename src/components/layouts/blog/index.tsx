import supabase from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function Blog() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("blog")
        .select()
        .order("id", { ascending: true });
      if (data) {
        setData(data);
      }
    };

    getData();
  }, []);

  return (
    <article className="blog" data-page="blog">
      <header>
        <h2 className="h2 article-title">Blog</h2>
      </header>

      <section className="blog-posts">
        <ul className="blog-posts-list">
          {data.map((blog_data, index) => (
            <li key={index} className="blog-post-item">
              <a 
              href={blog_data.navigation} 
              target="_blank"
              rel="noopener noreferrer"
              >
                <figure className="blog-banner-box">
                  <img
                    src={blog_data.image}
                    alt={blog_data.title}
                    loading="lazy"
                  />
                </figure>

                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{blog_data.category}</p>

                    <span className="dot"></span>

                    <time dateTime="2022-02-23">{blog_data.date}</time>
                  </div>

                  <h3 className="h3 blog-item-title">{blog_data.title}</h3>

                  <p className="blog-text">{blog_data.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
