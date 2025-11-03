export default function Dashboard({ myDonations, claims }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">My Donations</h2>
        {myDonations.length === 0 ? (
          <p className="text-slate-600">You haven't posted any food yet.</p>
        ) : (
          <ul className="space-y-3">
            {myDonations.map(item => (
              <li key={item.id} className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <img src={item.imageUrl} alt={item.title} className="h-16 w-24 rounded-md object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">{item.title}</h3>
                      <span className="text-xs rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5">{item.quantity} left</span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                    <div className="mt-1 text-xs text-slate-500">Area: <strong className="text-slate-700 font-medium">{item.location}</strong> • Use by: <strong className="text-slate-700 font-medium">{item.expiryDate}</strong></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">My Claims</h2>
        {claims.length === 0 ? (
          <p className="text-slate-600">You haven't claimed any food yet.</p>
        ) : (
          <ul className="space-y-3">
            {claims.map(claim => (
              <li key={claim.id} className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <img src={claim.imageUrl} alt={claim.title} className="h-16 w-24 rounded-md object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">{claim.title}</h3>
                      <span className="text-xs text-slate-500">{new Date(claim.when).toLocaleString()}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-600">Pickup area: <strong className="text-slate-700">{claim.location}</strong></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
