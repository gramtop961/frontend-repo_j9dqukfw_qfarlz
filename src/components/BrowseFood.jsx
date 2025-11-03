export default function BrowseFood({ foods, onClaim }) {
  return (
    <section className="">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Available Food</h2>
          <p className="text-slate-600 text-sm">Claim individual portions while supplies last.</p>
        </div>
        <span className="text-sm text-slate-500">{foods.length} listing{foods.length !== 1 ? 's' : ''}</span>
      </div>

      {foods.length === 0 ? (
        <p className="text-slate-600">No listings yet. Be the first to donate!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map(food => (
            <article key={food.id} className="group rounded-xl border border-emerald-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video w-full overflow-hidden">
                <img src={food.imageUrl} alt={food.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-slate-800">{food.title}</h3>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${food.quantity > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {food.quantity} left
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{food.description}</p>
                <div className="text-xs text-slate-500 flex flex-wrap gap-3">
                  <span>Area: <strong className="text-slate-700 font-medium">{food.location}</strong></span>
                  <span>Use by: <strong className="text-slate-700 font-medium">{food.expiryDate}</strong></span>
                </div>
                <p className="text-xs text-slate-500">{food.contact}</p>
                <button
                  disabled={food.quantity <= 0}
                  onClick={() => onClaim(food.id)}
                  className="mt-1 inline-flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {food.quantity > 0 ? 'Claim 1 portion' : 'Out of stock'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
