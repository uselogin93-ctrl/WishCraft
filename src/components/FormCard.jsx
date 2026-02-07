"use client";

export default function FormCard({ formData, setFormData, onStart }) {
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-md border border-white/50 relative z-10 transition-all hover:shadow-2xl">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 text-center">
                Create a Wish ✨
            </h1>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birthday Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-gray-900"
                        placeholder="Enter name..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-gray-900"
                            placeholder="e.g. 21"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Color</label>
                        <input
                            type="color"
                            className="w-full h-10 p-1 rounded-xl border border-purple-200 cursor-pointer"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birthday Message</label>
                    <textarea
                        className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all min-h-[100px] text-gray-900"
                        placeholder="Write something sweet..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (Optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        onChange={handlePhotoChange}
                    />
                </div>

                <button
                    onClick={onStart}
                    disabled={!formData.name || !formData.age}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    Start Celebration 🚀
                </button>
            </div>
        </div>
    );
}
