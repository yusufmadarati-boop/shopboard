// CategoryFilter – pill buttons for filtering by product category

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: Props) {
  const all = ["All", ...categories];

  return (
    <nav className="category-filter" aria-label="Filter by category">
      {all.map((cat) => (
        <button
          key={cat}
          className={`category-filter__pill${selected === cat ? " category-filter__pill--active" : ""}`}
          aria-pressed={selected === cat}
          onClick={() => {
            onSelect(cat);
          }}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
