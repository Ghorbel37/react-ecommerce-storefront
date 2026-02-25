import { ArrowPathIcon, TruckIcon, LockClosedIcon, GiftIcon } from "@heroicons/react/24/outline";

const promos = [
  {
    id: 1,
    icon: ArrowPathIcon,
    title: "30 Days Return",
    description: "Easy & hassle-free returns",
    color: "bg-amber-500",
  },
  {
    id: 2,
    icon: TruckIcon,
    title: "Free Shipping",
    description: "On all orders over $50",
    color: "bg-stone-700",
  },
  {
    id: 3,
    icon: LockClosedIcon,
    title: "Secure Payments",
    description: "100% protected transactions",
    color: "bg-amber-600",
  },
  {
    id: 4,
    icon: GiftIcon,
    title: "New Products",
    description: "Fresh arrivals every week",
    color: "bg-stone-600",
  },
];

export default function Promo() {
  return (
    <section className="grid grid-cols-4 gap-4">
      {promos.map(({ id, icon: Icon, title, description, color }) => (
        <div
          key={id}
          className={`${color} rounded-xl flex flex-col items-center justify-center gap-3 py-8 px-4 text-center text-white text-shadow-stone-500 hover:opacity-90 transition-opacity cursor-default`}
        >
          <Icon className="h-10 w-10 opacity-90 drop-shadow-sm" />
          <div>
            <p className="font-bold text-base drop-shadow-sm">{title}</p>
            <p className="text-sm opacity-80 mt-0.5 drop-shadow-sm">{description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
