function ProductCard({ id, name, price, image }) {
  return (
    <div className="p-4 shadow rounded">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <h2 className="text-lg font-bold">{name}</h2>
      <p>Price: ₹{price}</p>
    </div>
  );
}
