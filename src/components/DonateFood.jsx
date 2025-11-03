import { useState } from 'react';

const initialForm = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  quantity: 1,
  expiryDate: '',
  contact: '',
};

export default function DonateFood({ onSubmit }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.location || !form.expiryDate || !form.quantity) return;
    onSubmit(form);
    setForm(initialForm);
  }

  return (
    <section className="">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">Donate Food</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-600">Title</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="E.g., Fresh curry and rice" className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-600">Location / Area</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Neighborhood or pickup point" className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-slate-600">Short Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="What is it? Any allergens? How is it packed?" className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-600">Quantity (portions)</label>
            <input type="number" min={1} name="quantity" value={form.quantity} onChange={handleChange} className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-600">Use by date</label>
            <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-slate-600">Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Paste a photo link (optional)" className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-slate-600">Contact notes</label>
          <input name="contact" value={form.contact} onChange={handleChange} placeholder="e.g., call before arrival / pickup times" className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
        </div>

        <div className="pt-2">
          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
            Post donation
          </button>
        </div>
      </form>
    </section>
  );
}
