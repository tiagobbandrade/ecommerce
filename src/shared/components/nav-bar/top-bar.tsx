import { ShoppingBasket } from "lucide-react";
import { NavbarItem } from "./nav-bar-item";
import { Link } from "react-router";
import { cn } from "../../utils/cn";
import { use } from "react";
import { AuthContext } from "../../../modules/auth/contexts/AuthContext";
import { CartContext } from "../../contexts/cart-context";

export function TopBar({ renderBasket = true }: { renderBasket?: boolean }) {
  const { cart } = use(CartContext);
  const authContext = use(AuthContext);

  return (
    <header
      className="fixed top-0 left-0 w-full backdrop-blur-sm bg-white/10 z-50 py-5"
      role="banner"
    >
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <nav aria-label="Menu principal">
          <ul className="flex items-center gap-8">
            <NavbarItem href="/" label="Início" />
            <NavbarItem href="/products#products" label="Produtos" />
          </ul>
        </nav>

        {renderBasket && (
          <Link
            to={
              authContext.isAuthenticated ? "/cart" : "/login?redirectTo=/cart"
            }
            aria-label="Ver carrinho de compras"
            className={cn("ml-auto  flex items-center gap-1.5")}
          >
            <div className="relative">
              <ShoppingBasket strokeWidth={1.5} size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-xs text-white font-medium">
                  {cart.reduce((total, acc) => total + acc.quantity, 0)}
                </span>
              )}
            </div>
            <span>Seu carrinho</span>
          </Link>
        )}
      </div>
    </header>
  );
}
