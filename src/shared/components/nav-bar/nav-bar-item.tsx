import { Link } from "react-router";

type NavbarItemProps = {
  label: string;
  href: string;
};

export function NavbarItem({ label, href }: NavbarItemProps) {
  return (
    <li className="group cursor-pointer">
      <Link
        to={href}
        className="relative before:absolute before:left-0 before:bottom-[-4px] before:h-[2px] before:rounded-full before:bg-black before:content-[''] before:w-0 before:transition-[width] before:duration-300 before:ease-in-out group-hover:before:w-full"
      >
        {label}
      </Link>
    </li>
  );
}
