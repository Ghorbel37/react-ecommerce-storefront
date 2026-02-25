// Will be replaced with dynamically fetched categories later
const placeholderCategories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports"];

export default function FooterCategories() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white font-bold text-lg">Categories</h3>
      <ul className="flex flex-col gap-2 text-sm">
        {placeholderCategories.map((cat) => (
          <li key={cat}>
            <a href="#" className="hover:text-white transition-colors">
              {cat}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
