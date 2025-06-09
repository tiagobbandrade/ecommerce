import { Link } from "react-router";
import heroImage from "../../../shared/assets/background_4k.jpg";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  fadeDone: boolean;
}

export function HeroSection({ fadeDone }: HeroSectionProps) {
  return (
    <section
      style={{ backgroundImage: `url(${heroImage})` }}
      className="w-full h-screen bg-[#D3DDE7] bg-no-repeat bg-cover"
    >
      <div className="max-w-5xl mx-auto h-full flex flex-col justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={fadeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="leading-[60px] font-bold text-[64px] max-w-[564px]"
        >
          Aqui você encontra os produtos para sua casa!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={fadeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="max-w-[660px] text-xl leading-[24px] mt-4"
        >
          Descubra nossa última coleção da moda dos interiores desenhados
          exclusivamente para você! Venha tornar sua casa única
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={fadeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        >
          <Link
            to={"#products"}
            className="px-6 py-2 rounded-full bg-black text-white w-fit text-sm flex items-center gap-2.5 mt-6 hover:bg-gray-800 transition-all hover:scale-105 duration-300"
          >
            Ir às compras
            <ChevronRight size={16} color="#ffff" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
