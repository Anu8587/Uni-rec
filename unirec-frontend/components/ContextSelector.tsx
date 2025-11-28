"use client";

type UserContext = {
  device: string;
  location_type: string;
  time_of_day: string;
};

type Props = {
  context: UserContext;
  setContext: (value: UserContext) => void;
};

export default function ContextSelector({ context, setContext }: Props) {
  return (
    <div className="bg-[#0f0f1c] p-6 rounded-xl border border-purple-800/40 shadow-lg w-full max-w-[520px]">
      <h2 className="text-lg font-semibold mb-4 text-purple-200">
        User Context
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* DEVICE */}
        <div className="flex flex-col">
          <label className="text-sm text-slate-300 mb-1">Device</label>
          <select
            className="w-full max-w-[150px] p-2 bg-gray-800 text-white rounded-lg border border-purple-700/40 focus:border-purple-500 outline-none"
            value={context.device}
            onChange={(e) =>
              setContext({ ...context, device: e.target.value })
            }
          >
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
            <option value="tv">TV</option>
          </select>
        </div>

        {/* LOCATION */}
        <div className="flex flex-col">
          <label className="text-sm text-slate-300 mb-1">Location</label>
          <select
            className="w-full max-w-[150px] p-2 bg-gray-800 text-white rounded-lg border border-purple-700/40 focus:border-purple-500 outline-none"
            value={context.location_type}
            onChange={(e) =>
              setContext({ ...context, location_type: e.target.value })
            }
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="travel">Travel</option>
            <option value="outside">Outside</option>
          </select>
        </div>

        {/* TIME */}
        <div className="flex flex-col">
          <label className="text-sm text-slate-300 mb-1">Time of Day</label>
          <select
            className="w-full max-w-[150px] p-2 bg-gray-800 text-white rounded-lg border border-purple-700/40 focus:border-purple-500 outline-none"
            value={context.time_of_day}
            onChange={(e) =>
              setContext({ ...context, time_of_day: e.target.value })
            }
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
        </div>

      </div>
    </div>
  );
}
