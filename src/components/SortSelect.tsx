// SortSelect – dropdown to choose how the product list is ordered

import type { SortOption } from "../types";

interface Props {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

export function SortSelect({ value, onChange }: Props) {
  return (
    <div className="sort-select">
      <label htmlFor="sort-select" className="sort-select__label">
        Sort by
      </label>
      <select
        id="sort-select"
        className="sort-select__control"
        value={value}
        onChange={(e) => {
          onChange(e.target.value as SortOption);
        }}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
