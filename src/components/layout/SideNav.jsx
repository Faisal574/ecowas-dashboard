import { NavLink, useParams } from "react-router-dom";

const SideNav = () => {
  const { country } = useParams();
  return (
    <aside className="w-64 border-r-2 border-green-600 space-y-4 pt-8 sticky top-0 min-h-[dvh]">
      <p className="font-semibold pl-4">Sankey</p>
      <div className="node-list space-y-3">
        <NavLink to={`/${country}`} className="p-3">
          Create Sankey
        </NavLink>
        <NavLink to="/saved-sankeys" className="p-3">
          Saved Sankey
        </NavLink>
        <NavLink to="/members-sankeys" className="p-3">
          Members Sankey
        </NavLink>
      </div>
    </aside>
  );
};

export default SideNav;
