import AllIncome from "../pages/AddIncome";
import AddIncome from "../pages/AddIncome";
import AdminPage from "../pages/AdminDashboard";
import AllBranch from "../pages/AllBranch";
import AllUsers from "../pages/AllUsers";
import SuperadminDashboard from "../pages/SuperadminDashboard";
import UserDashboard from "../pages/UserDashboard";
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
    path: "dashboard",
    component: <SuperadminDashboard />,
    icon: <QrCodeIcon className="h-6" />,
  },
  {
    label: "All Users",
    path: "all-users",
    component: <AllUsers />,
    icon: <UserGroupIcon className="h-6" />,
  },
  {
    label: "All Users Income",
    path: "all-users-income",
    component: <AllIncome />,
    icon: <DocumentCurrencyRupeeIcon className="h-6" />,
  },
  {
    label: "Branch",
    path: "all-branch",
    component: <AllBranch />,
    icon: <BuildingLibraryIcon className="h-6" />,
  },
];
export const adminRoutes = [
  {
    label: "Dashboard",
    path: "dashboard",
    component: <AdminPage />,
    icon: <QrCodeIcon className="h-6" />,
  },
  {
    label: "All Users",
    path: "all-users",
    component: <AllUsers />,
    icon: <UserGroupIcon className="h-6" />,
  },
  {
    label: "All Users Income",
    path: "all-users-income",
    component: <AllIncome />,
    icon: <DocumentCurrencyRupeeIcon className="h-6" />,
  },
  {
    label: "Branch",
    path: "branch",
    component: <AllBranch />,
    icon: <BuildingLibraryIcon className="h-6" />,
  },
];

export const userRoutes = [
  {
    label: "Dashboard",
    path: "dashboard",
    component: <UserDashboard />,
    icon: <QrCodeIcon className="h-6" />,
  },
  {
    label: "Add Income",
    path: "add-income",
    component: <AddIncome />,
    icon: <DocumentCurrencyRupeeIcon className="h-6" />,
  },
  {
    label: "My Profile",
    path: "my-profile",
    component: <AllUsers />,
    icon: <UserIcon className="h-6" />,
  },
  {
    label: "My Branch",
    path: "my-branch",
    component: <AllBranch />,
    icon: <BuildingLibraryIcon className="h-6" />,
  },
];
