import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5 mt-6">
      <span className="text-sm">Quantidade</span>
      <div className="flex items-center rounded-md px-2 py-1 w-fit gap-2">
        <button
          disabled={quantity <= 1}
          className="disabled:opacity-50"
          onClick={onDecrease}
          type="button"
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button onClick={onIncrease} type="button">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
