import { Search, ShoppingBasket } from "lucide-react";

export function TopBar() {
  return (
    <header className="py-5 px-6 border-b border-b-zinc-200 flex items-center">
      <label className="relative ml-auto" htmlFor="search">
        <button>
          <Search
            className="absolute top-1/2 -translate-y-1/2 left-2"
            size={16}
            color="#959595"
          />
        </button>
        <input
          id="search"
          name="productSearch"
          type="text"
          placeholder="Pesquisar"
          className="text-base placeholder:text-[#959595] bg-[#E5E5E5] py-1.5 pl-[calc(8px+24px)] pr-3 rounded-full outline-none hover:brightness-1 transition-all"
        />
      </label>
      <ShoppingBasket className="ml-auto" strokeWidth={1} />
    </header>
  );
}
