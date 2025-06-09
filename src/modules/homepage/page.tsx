import { HeroSection } from "./components/hero-section";
import { ProductsGrid } from "./components/products-grid";
import { useScrollToHash } from "../../shared/hooks/use-scroll-to-hash";

export function Homepage() {
  useScrollToHash(400);

  return (
    <>
      <HeroSection fadeDone={true} />
      <div
        id="products"
        className="relative max-w-5xl mx-auto w-full h-fit py-16 flex items-start gap-10"
      >
        <aside className="sticky top-[72px]">
          <h2 className="text-xl font-medium mb-4">Categorias</h2>
          <ul className="flex flex-col gap-1.5">
            <li className="text-black/40 hover:text-black transition-colors duration-500 text-nowrap">
              Roupas femininas
            </li>
            <li className="text-black/40 hover:text-black transition-colors duration-500 text-nowrap">
              Roupas femininas
            </li>
            <li className="text-black/40 hover:text-black transition-colors duration-500 text-nowrap">
              Roupas femininas
            </li>
            <li className="text-black/40 hover:text-black transition-colors duration-500 text-nowrap">
              Roupas femininas
            </li>
          </ul>
        </aside>

        <main className="w-full">
          <h2 className="text-xl font-medium">Nossos produtos</h2>
          <p className="text-black/75 mt-1">
            Veja todos os produtos que temos em catálogo atualmente
          </p>
          <section className="w-full flex justify-between items-center mt-3">
            <span className="text-black/40 text-sm">
              <data value="20" className="text-black">
                20{" "}
              </data>
              resultados
            </span>
            <label className="font-medium text-sm flex items-center gap-2">
              Ordenar por:
              <select className="font-normal text-sm bg-[#FAF9FC] rounded-md outline-none transition-colors duration-300 hover:border-gray-400">
                <option className="text-sm border-b border-gray-200 px-3 py-2">
                  Padrão
                </option>
                <option className="text-sm border-b border-gray-200 px-3 py-2">
                  Menor preço
                </option>
                <option className="text-sm border-b border-gray-200 px-3 py-2">
                  Maior preço
                </option>
                <option className="text-sm px-3 py-2">Avaliação</option>
              </select>
            </label>
          </section>
          <ProductsGrid />
        </main>
      </div>
    </>
  );
}
