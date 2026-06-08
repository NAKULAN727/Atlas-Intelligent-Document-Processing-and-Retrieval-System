// components/dashboard/StatsCards.tsx

export default function StatsCards() {
  const stats = [
    { title: "Total PDFs", value: "126" },
    { title: "Storage Used", value: "2.4 GB" },
    { title: "Collections", value: "12" },
    { title: "Chats", value: "384" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white p-6 rounded-xl shadow"
        >
          <p className="text-gray-500">
            {stat.title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}