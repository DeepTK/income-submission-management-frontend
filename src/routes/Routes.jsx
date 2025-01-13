import AllIncome from "../pages/AddIncome";
import AddIncome from "../pages/AddIncome";
import AdminPage from "../pages/AdminPage";
import AllBranch from "../pages/AllBranch";
import AllUsers from "../pages/AllUsers";
import SuperadminDashboard from "../pages/SuperadminDashboard";
import UserPage from "../pages/UserPage";
import {
  QrCodeIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  DocumentCurrencyRupeeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export const superadminRoutes = [
  {
    label: "Dashboard",
    path: "/superadmin/dashboard",
    component: <SuperadminDashboard />,
    icon: <QrCodeIcon className="h-6" />,
  },
  {
    label: "All Users",
    path: "/superadmin/all-users",
    component: <AllUsers />,
    icon: <UserGroupIcon className="h-6" />,
  },
  {
    label: "All Users Income",
    path: "/superadmin/all-users-income",
    component: <AllIncome />,
    icon: <DocumentCurrencyRupeeIcon className="h-6" />,
  },
  {
    label: "Branch",
    path: "/superadmin/all-branch",
    component: <AllBranch />,
    icon: <BuildingLibraryIcon className="h-6" />,
  },
];
export const adminRoutes = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    component: <AdminPage />,
    icon: <QrCodeIcon className="h-6" />,
  },
  {
    label: "All Users",
    path: "/admin/all-users",
    component: <AllUsers />,
    icon: <UserGroupIcon className="h-6" />,
  },
  {
    label: "All Users Income",
    path: "/admin/all-users-income",
    component: <AllIncome />,
    icon: <DocumentCurrencyRupeeIcon className="h-6" />,
  },
  {
    label: "Branch",
    path: "/admin/branch",
    component: <AllBranch />,
    icon: <BuildingLibraryIcon className="h-6" />,
  },
];

export const userRoutes = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
    component: <UserPage />,
    icon: <QrCodeIcon className="h-6" />,
  },
  {
    label: "Add Income",
    path: "/user/add-income",
    component: <AddIncome />,
    icon: <DocumentCurrencyRupeeIcon className="h-6" />,
  },
  {
    label: "My Profile",
    path: "/user/my-profile",
    component: <AllUsers />,
    icon: <UserIcon className="h-6" />,
  },
  {
    label: "My Branch",
    path: "/user/my-branch",
    component: <AllBranch />,
    icon: <BuildingLibraryIcon className="h-6" />,
  },
];
