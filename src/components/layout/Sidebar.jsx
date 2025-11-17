const Sidebar = () => {
  return (
    <aside className="h-full w-64 bg-gray-100 p-6 shadow flex flex-col gap-4">
      <div className="font-semibold mb-6">Main Menu</div>
      <ul className="space-y-2">
        <li>
          <a href="/dashboard" className="hover:text-blue-600">Dashboard</a>
        </li>
        <li>
          <a href="/profile" className="hover:text-blue-600">Profile</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

