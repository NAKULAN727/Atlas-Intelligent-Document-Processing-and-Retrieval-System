interface LoginFormProps {
  onSwitch: () => void;
}

export default function LoginForm({ onSwitch }: LoginFormProps) {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-4xl font-bold text-white mb-10">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-4 rounded-lg bg-slate-800 border border-slate-700 text-white"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-4 rounded-lg bg-slate-800 border border-slate-700 text-white"
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg text-white font-medium transition">
        Login
      </button>

      <div className="flex justify-center mt-6">
        <button
          onClick={onSwitch}
          className="text-blue-400 hover:text-blue-300 transition"
        >
          Create Account →
        </button>
      </div>
    </div>
  );
}