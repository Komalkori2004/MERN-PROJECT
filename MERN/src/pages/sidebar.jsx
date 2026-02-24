const Sidebar = ({ categories, category, setCategory, closeSidebar }) => {
  return (
    <div className="filter-overlay">
      <div className="filter-drawer">
        <button className="close-btn" onClick={closeSidebar}>
          ✕
        </button>

        <h3>Categories</h3>

        <ul>
          <li
            className={!category ? "active" : ""}
            onClick={() => {
              setCategory("");
              closeSidebar();
            }}
          >
            All Products
          </li>

          {categories.map((cat) => (
            <li
              key={cat._id}
              className={category === cat._id ? "active" : ""}
              onClick={() => {
                setCategory(cat._id);
                closeSidebar();
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;