import { useShop } from "../context/ShopContext";

export default function Toast() {
  const { toast } = useShop();
  return <div className={`toast${toast.text ? " show" : ""}`} role="status" aria-live="polite">{toast.text}</div>;
}
