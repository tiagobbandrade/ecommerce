import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAddressFetch } from "../../../shared/services/get-address";
import { brazilSates } from "../../../shared/config/brazil-states";
import { OrderContext } from "../../../shared/contexts/order-context";

const cepRegex = /^\d{5}-\d{3}$/;

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  zipCode: z
    .string()
    .regex(cepRegex, "CEP deve seguir o formato 99999-999")
    .length(9, "CEP deve ter 9 caracteres (XXXXX-XXX)"),
  address: z.string().min(1, "Endereço é obrigatório"),
  district: z.string().min(1, "Bairro é obrigatório"),
  state: z.string().min(1, "UF é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  complement: z.string().optional(),
  referencePoint: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function DeliveryDetailsForm() {
  const { setShippingInformation } = use(OrderContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    setShippingInformation(data);
    navigate("/cart/payment");
  };

  const zipCodeValue = watch("zipCode") || "";

  const { data: zipcodeData } = useQuery({
    queryKey: ["cep", zipCodeValue],
    queryFn: () => getAddressFetch(zipCodeValue),
    enabled: zipCodeValue.length === 9,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (zipcodeData) {
      setValue("address", zipcodeData.logradouro || "", {
        shouldValidate: true,
      });
      setValue("district", zipcodeData.bairro || "", { shouldValidate: true });
      setValue("city", zipcodeData.localidade || "", { shouldValidate: true });
      setValue("state", zipcodeData.uf || "", { shouldValidate: true });
    }
  }, [zipcodeData, setValue]);

  function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }

    setValue("zipCode", value, { shouldValidate: true });
  }

  return (
    <form
      id="shipping-form"
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-9 gap-x-2 gap-y-4 mt-9"
      noValidate
    >
      <div className="col-span-4 flex flex-col row-start-1">
        <label className="text-sm font-regular">
          Seu nome<span className="text-[#416AD2] text-sm">*</span>
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Digite seu nome completo"
          className={`py-2 px-3 placeholder:text-black/50 text-black text-sm placeholder:text-sm bg-[#BCC6D1]/50 rounded-md ${
            errors.name ? "border border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col col-span-5 row-start-1">
        <label className="text-sm font-regular">
          Seu email<span className="text-[#416AD2] text-sm">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="Digite seu e-mail"
          className={`py-2 px-3 placeholder:text-black/50 text-black text-sm placeholder:text-sm bg-[#BCC6D1]/50 rounded-md ${
            errors.email ? "border border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col col-span-2 row-start-2">
        <label className="text-sm font-regular">
          CEP<span className="text-[#416AD2] text-sm">*</span>
        </label>
        <input
          type="text"
          placeholder="_____-___"
          value={zipCodeValue}
          onChange={handleCepChange}
          maxLength={9}
          className={`py-2 px-3 placeholder:text-black/50 text-black text-sm placeholder:text-sm bg-[#BCC6D1]/50 rounded-md ${
            errors.zipCode ? "border border-red-500" : ""
          }`}
        />
        {errors.zipCode && (
          <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>
        )}
      </div>

      <div className="flex flex-col col-span-3 row-start-2">
        <label className="text-sm font-regular">
          Endereço<span className="text-[#416AD2] text-sm">*</span>
        </label>
        <input
          {...register("address")}
          type="text"
          placeholder="Digite seu endereço"
          className={`py-2 px-3 placeholder:text-black/50 text-black text-sm placeholder:text-sm bg-[#BCC6D1]/50 rounded-md ${
            errors.address ? "border border-red-500" : ""
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="flex flex-col col-span-3 row-start-2">
        <label className="text-sm font-regular">
          Bairro<span className="text-[#416AD2] text-sm">*</span>
        </label>
        <input
          {...register("district")}
          type="text"
          placeholder="Digite seu bairro"
          className={`py-2 px-3 placeholder:text-black/50 text-black text-sm placeholder:text-sm bg-[#BCC6D1]/50 rounded-md ${
            errors.district ? "border border-red-500" : ""
          }`}
        />
        {errors.district && (
          <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>
        )}
      </div>

      <div className="flex flex-col col-span-1 row-start-2">
        <label className="text-sm font-regular">
          UF<span className="text-[#416AD2] text-sm">*</span>
        </label>
        <select
          {...register("state")}
          defaultValue="UF"
          className={`py-2 px-3 text-black text-sm placeholder:text-sm bg-[#BCC6D1]/50 rounded-md ${
            errors.state ? "border border-red-500" : ""
          }`}
        >
          {Object.entries(brazilSates).map(([sigla]) => (
            <option key={sigla} value={sigla}>
              {sigla}
            </option>
          ))}
        </select>
        {errors.state && (
          <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
        )}
      </div>

      <div className="flex flex-col col-span-3 row-start-3">
        <label className="text-sm font-regular">
          Cidade<span className="text-[#416AD2] text-sm">*</span>
        </label>
        <input
          {...register("city")}
          type="text"
          placeholder="Digite sua cidade"
          className={`py-2 px-3 placeholder:text-black/50 text-black text-sm placeholder:text-sm bg-[#BCC6D1]/50 rounded-md ${
            errors.city ? "border border-red-500" : ""
          }`}
        />
        {errors.city && (
          <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
        )}
      </div>

      <div className="flex flex-col col-span-3 row-start-3">
        <label className="text-sm font-regular">Complemento</label>
        <input
          {...register("complement")}
          type="text"
          placeholder="Digite seu complemento"
          className="py-2 px-3 placeholder:text-black/50 text-black text-sm placeholder:text-sm bg-[#BCC6D1]/50 rounded-md"
        />
      </div>

      <div className="flex flex-col col-span-3 row-start-3">
        <label className="text-sm font-regular">Ponto de referência</label>
        <input
          {...register("referencePoint")}
          type="text"
          placeholder="Digite sua referência"
          className="py-2 px-3 placeholder:text-black/50 text-black text-sm placeholder:text-sm bg-[#BCC6D1]/50 rounded-md"
        />
      </div>
    </form>
  );
}
