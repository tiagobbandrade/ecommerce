import { AtSign, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { TopBar } from "../../shared/components/nav-bar/top-bar";
import { use } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router";

type LoginFormData = {
  username: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authContext = use(AuthContext);
  const { mutate, isPending, isError, error } = authContext.useLoginMutation(
    navigate,
    searchParams
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <>
      <TopBar renderBasket={false} />
      <main className="max-w-[516px] mx-auto mt-56 pb-16">
        <h1 className="text-2xl font-medium">Faça seu login</h1>
        <p>Faça o login para conseguir adicionar itens ao carrinho!</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-3 flex flex-col"
        >
          <div className="flex flex-col w-full">
            <label className="font-regular">
              Seu usuário<span className="text-[#416AD2] text-sm">*</span>
            </label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tiago Andrade"
                {...register("username", { required: true })}
                className="py-3.5 px-3 pl-12 placeholder:text-black/50 text-black bg-[#BCC6D1]/50 rounded-md w-full"
              />
              <AtSign
                size={20}
                color="#416AD2"
                className="absolute top-1/2 -translate-y-1/2 left-4"
              />
            </div>
            {errors.username && (
              <span className="text-sm text-red-500 mt-1">
                Usuário é obrigatório.
              </span>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="font-regular">
              Sua senha<span className="text-[#416AD2] text-sm">*</span>
            </label>
            <div className="relative w-full">
              <input
                type="password"
                placeholder="**********"
                {...register("password", { required: true })}
                className="py-3.5 px-3 pl-12 placeholder:text-black/50 text-black bg-[#BCC6D1]/50 rounded-md w-full"
              />
              <Lock
                size={20}
                color="#416AD2"
                className="absolute top-1/2 -translate-y-1/2 left-4"
              />
            </div>
            {errors.password && (
              <span className="text-sm text-red-500 mt-1">
                Senha é obrigatória.
              </span>
            )}
          </div>

          {isError && (
            <span className="text-sm text-red-500 text-center">
              {(error as Error)?.message || "Erro ao fazer login."}
            </span>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="text-white font-medium py-4 px-32 bg-[#416AD2] rounded-md mx-auto leading-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </main>
    </>
  );
}
