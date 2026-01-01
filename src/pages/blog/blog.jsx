import "./blog.css";

const blogData = [
  {
    id: 1,
    title: "How to Choose the Best Headphones",
    desc: "A complete guide to help you choose the perfect headphones for your needs.",
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
    date: "Aug 20, 2025",
  },
  {
    id: 2,
    title: "Top 10 Gadgets for 2025",
    desc: "Discover the most popular tech gadgets everyone is talking about.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    date: "Aug 15, 2025",
  },
  {
    id: 3,
    title: "Smart Watch Buying Guide",
    desc: "Everything you need to know before buying a smart watch.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    date: "Aug 10, 2025",
  },
];

export default function Blog() {
  return (
    <section className="blog-page">
      <div className="blog-header">
        <h2>Our Blog</h2>
        <p>Latest news, tips and insights from our store</p>
      </div>

      <div className="blog-grid">
        {blogData.map((item) => (
          <div className="blog-card" key={item.id}>
            <div className="blog-img">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="blog-content">
              <span className="date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
