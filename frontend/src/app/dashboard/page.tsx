export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Navbar */}
       <div className="flex justify-between items-center px-6 py-3">
  {/* Logo */}
  <div className="text-xl font-bold text-blue-600">Compensa</div>

  {/* Centered Tab Group */}
  <div className="flex-1 flex justify-center">
    <div className="flex bg-white rounded-full p-1 space-x-1">
      <button className="px-4 py-1 rounded-full bg-blue-600 text-white font-medium">Dashboard</button>
      <button className="px-4 py-1 rounded-full text-gray-700 hover:bg-gray-200">Salary</button>
    </div>
  </div>

  {/* Right Icons */}
  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
    <img
      src="https://i.pravatar.cc/40"
      alt="avatar"
      className="w-8 h-8 rounded-full mr-2"
    />
    <div className="text-sm text-gray-800">Matt Smith</div>
  </div>
</div>

        {/* Greeting and Summary Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1 h-32 bg-white rounded-2xl text-center flex items-center justify-center font-semibold">
            CONSTANTS SETTINGS DEDUCTIONS
          </div>
          <div className="col-span-1 h-32 bg-white rounded-2xl text-center flex items-center justify-center font-semibold">
            SALARY PER DAY
          </div>
          <div className="col-span-1 h-32 bg-white rounded-2xl"></div>
          <div className="col-span-1 h-32 bg-white rounded-2xl"></div>
        </div>

        {/* Calendar, Current Trip, Map (height-matching via flex) */}
        <div className="flex gap-6 items-start">
          <div className="w-1/4 bg-white rounded-2xl shadow p-4">
            {/* Left content - calendar, constants, etc */}
            <p className="text-sm text-gray-700 font-medium">QUARTERLY TAX</p>
          </div>
          
          <div className="flex-1 bg-white rounded-2xl shadow p-4">
            {/* Right content - map, trip summary, reports */}
            <p className="text-sm text-gray-700 font-medium">CALENDAR</p>
          </div>
        </div>

      </div>
    </div>
  );
}
