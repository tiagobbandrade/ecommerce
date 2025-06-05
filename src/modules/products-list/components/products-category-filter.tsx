type ProductsCategoryFilterProps = {
  categories: string[];
};

export function ProductsCategoryFilter({
  categories,
}: ProductsCategoryFilterProps) {
  return (
    <section className="w-full overflow-x-auto flex items-center gap-3 mt-3">
      {categories.map((category) => (
        <a
          key={category}
          href="#"
          className="text-black text-sm px-3 py-2 rounded-sm bg-[#A5A5A5]/15 hover:brightness-20 transition-all duration-500"
        >
          {category}
        </a>
      ))}
    </section>
  );
}
