import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useUser } from "../../context/UserContext";

interface CooperativeDetails {
  id?: string;
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
  registrationNumber?: string;
  foundedDate?: string;
}

interface Permission {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: number;
  name: string;
  description: string | null;
  associationId: string | null;
  cooperativeId: string;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

interface LoanStatus {
  id: string;
  purpose: string;
  minimumLoanAmount: string;
  maximumLoanAmount: string;
  interestRate: string;
  termMonths: number;
  issueDate: string;
  dueDate: string;
  status: string;
  amount: string;
  memberName: string;
}

interface LoanStatusData {
  totalLoans: number;
  pendingLoans: number;
  repaidLoans: number;
  defaultedLoans: number;
  averageLoanAmount: string;
  defaultRate: string;
  loans: LoanStatus[];
}

interface AdminProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  associationId: string | null;
  cooperativeId: string;
  createdAt: string;
  updatedAt: string;
  adminType: string;
}

const TABS = [
  {
    label: "Cooperative",
    icon: (
      <img src="/building.svg" alt="cooperative" className="w-5 h-5 invert" />
    ),
  },
  {
    label: "Permission",
    icon: <img src="/Group.svg" alt="permission" className="w-5 h-5 invert" />,
  },
  {
    label: "Loans",
    icon: <img src="/loans.svg" alt="loans" className="w-5 h-5 invert" />,
  },
  {
    label: "Notification",
    icon: (
      <img src="/notif.svg" alt="notification" className="w-5 h-5 invert" />
    ),
  },
  {
    label: "Security",
    icon: <img src="/security.svg" alt="security" className="w-5 h-5 invert" />,
  },
  {
    label: "Profile",
    icon: <img src="/profile.svg" alt="profile" className="w-5 h-5 invert" />,
  },
];

const Settings: React.FC = () => {
  const [tab, setTab] = useState("Cooperative");
  const { user } = useUser();

  const [coopDetails, setCoopDetails] = useState<CooperativeDetails | null>(
    null
  );
  const [coopLoading, setCoopLoading] = useState(true);
  const [coopError, setCoopError] = useState<string | null>(null);
  const [coopSaving, setCoopSaving] = useState(false);
  const [coopSaveMsg, setCoopSaveMsg] = useState<string | null>(null);

  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [rolesError, setRolesError] = useState<string | null>(null);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [roleSaving, setRoleSaving] = useState(false);
  const [roleDeleting, setRoleDeleting] = useState<number | null>(null);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [_addingRole, setAddingRole] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    permissions: [] as string[],
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });

  const [editingRole, setEditingRole] = useState({
    name: "",
    permissions: [] as string[],
  });

  const [availablePermissions, setAvailablePermissions] = useState<
    Permission[]
  >([]);
  const [_permissionsLoading, setPermissionsLoading] = useState(false);

  const [loanStatusData, setLoanStatusData] = useState<LoanStatusData | null>(
    null
  );
  const [loanStatusLoading, setLoanStatusLoading] = useState(false);
  const [loanStatusError, setLoanStatusError] = useState<string | null>(null);

  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [adminProfileLoading, setAdminProfileLoading] = useState(false);
  const [adminProfileError, setAdminProfileError] = useState<string | null>(
    null
  );
  const [_adminProfileSaving, setAdminProfileSaving] = useState(false);
  const [_adminProfileSaveMsg, setAdminProfileSaveMsg] = useState<
    string | null
  >(null);

  useEffect(() => {
    const cooperativeId = user?.cooperativeId;
    if (tab === "Cooperative" && cooperativeId) {
      setCoopLoading(true);
      setCoopError(null);
      fetch(`https://ajo.nickyai.online/api/v1/cooperative/settings/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            setCoopDetails({
              ...data.data,
              phone: data.data.phoneNumber || data.data.phone,
              foundedDate: data.data.yearEstablished,
            });
          } else {
            setCoopError(data.message || "Failed to load details");
          }
        })
        .catch(() => setCoopError("Failed to load cooperative details"))
        .finally(() => setCoopLoading(false));
    }
  }, [tab, user]);

  useEffect(() => {
    const cooperativeId = user?.cooperativeId;
    if (tab === "Permission" && cooperativeId) {
      setRolesLoading(true);
      setRolesError(null);
      fetch(
        `https://ajo.nickyai.online/api/v1/cooperative/roles/${cooperativeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && Array.isArray(data.data)) {
            setRoles(data.data);
          } else {
            setRolesError("Failed to load roles");
          }
        })
        .catch(() => setRolesError("Failed to load roles"))
        .finally(() => setRolesLoading(false));
    }
  }, [tab, user]);

  useEffect(() => {
    if (tab === "Loans") {
      setLoanStatusLoading(true);
      setLoanStatusError(null);
      fetch("https://ajo.nickyai.online/api/v1/cooperative/loans/status/view", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            setLoanStatusData(data.data);
          } else {
            setLoanStatusError("Failed to load loan status");
          }
        })
        .catch(() => setLoanStatusError("Failed to load loan status"))
        .finally(() => setLoanStatusLoading(false));
    }
  }, [tab]);

  useEffect(() => {
    if (showAddRoleModal || editingRoleId) {
      setPermissionsLoading(true);
      fetch("https://ajo.nickyai.online/api/v1/cooperative/permissions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && Array.isArray(data.data)) {
            setAvailablePermissions(data.data);
          }
        })
        .catch(() => console.error("Failed to fetch permissions"))
        .finally(() => setPermissionsLoading(false));
    }
  }, [showAddRoleModal, editingRoleId]);

  useEffect(() => {
    if (tab === "Profile" && user?.id) {
      setAdminProfileLoading(true);
      setAdminProfileError(null);
      fetch(`https://ajo.nickyai.online/api/v1/admin/profile/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            setAdminProfile(data.data);
          } else {
            setAdminProfileError("Failed to load profile");
          }
        })
        .catch(() => setAdminProfileError("Failed to load profile"))
        .finally(() => setAdminProfileLoading(false));
    }
  }, [tab, user]);

  const handleCoopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!coopDetails) return;
    setCoopDetails({ ...coopDetails, [e.target.name]: e.target.value });
  };

  const handleCoopSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coopDetails || !user?.cooperativeId) return;
    setCoopSaving(true);
    setCoopSaveMsg(null);
    setCoopError(null);
    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/cooperative/settings/info`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: coopDetails.name,
            address: coopDetails.address,
            phoneNumber: coopDetails.phone,
            registrationNumber: coopDetails.registrationNumber,
            yearEstablished: coopDetails.foundedDate,
            email: coopDetails.email,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setCoopSaveMsg("Details saved successfully!");
      } else {
        setCoopError(data.message || "Failed to save details.");
      }
    } catch {
      setCoopError("An unexpected error occurred.");
    } finally {
      setCoopSaving(false);
      setTimeout(() => setCoopSaveMsg(null), 3000);
    }
  };

  const handleEditRole = async (roleId: number) => {
    setRoleSaving(true);
    try {
      await fetch(
        `https://ajo.nickyai.online/api/v1/cooperative/roles/${roleId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingRole.name,
            permissions: editingRole.permissions,
          }),
        }
      );
      setRoles(
        roles.map((r) =>
          r.id === roleId
            ? {
                ...r,
                name: editingRole.name,
                permissions: availablePermissions.filter((p) =>
                  editingRole.permissions.includes(p.name)
                ),
              }
            : r
        )
      );
      cancelEditingRole();
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setRoleSaving(false);
    }
  };

  const startEditingRole = (role: Role) => {
    setEditingRoleId(role.id);
    setEditingRole({
      name: role.name,
      permissions: role.permissions.map((p) => p.name),
    });
  };

  const handleEditRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingRole({ ...editingRole, name: e.target.value });
  };

  const handleEditPermissionChange = (
    permissionName: string,
    checked: boolean
  ) => {
    setEditingRole((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionName]
        : prev.permissions.filter((p) => p !== permissionName),
    }));
  };

  const cancelEditingRole = () => {
    setEditingRoleId(null);
    setEditingRole({ name: "", permissions: [] });
  };

  const handleDeleteRole = async (roleId: number) => {
    setRoleDeleting(roleId);
    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/cooperative/roles/${roleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.ok) {
        setRoles(roles.filter((r) => r.id !== roleId));
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    } finally {
      setRoleDeleting(null);
    }
  };

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingRole(true);
    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/cooperative/roles`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newRole,
            cooperativeId: user?.cooperativeId,
          }),
        }
      );
      const data = await res.json();
      if (data.status === "success" && data.data) {
        setRoles([...roles, data.data]);
        setShowAddRoleModal(false);
        setNewRole({
          name: "",
          permissions: [],
          email: "",
          phoneNumber: "",
          firstName: "",
          lastName: "",
        });
      }
    } catch (error) {
      console.error("Error adding role:", error);
    } finally {
      setAddingRole(false);
    }
  };

  // const handleNewRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewRole({ ...newRole, [e.target.name]: e.target.value });
  // };

  // const handlePermissionChange = (permissionName: string, checked: boolean) => {
  //   setNewRole((prev) => ({
  //     ...prev,
  //     permissions: checked
  //       ? [...prev.permissions, permissionName]
  //       : prev.permissions.filter((p) => p !== permissionName),
  //   }));
  // };

  // const roleTemplates = {
  //   readonly: ["view_dashboard", "view_reports"],
  //   editor: [
  //     "view_dashboard",
  //     "manage_members",
  //     "manage_loans",
  //     "view_reports",
  //   ],
  //   admin: availablePermissions.map((p) => p.name),
  // };

  // const handleTemplateSelect = (templateKey: keyof typeof roleTemplates) => {
  //   setNewRole((prev) => ({
  //     ...prev,
  //     permissions: roleTemplates[templateKey],
  //   }));
  // };

  // const handleAdminProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!adminProfile) return;
  //   setAdminProfile({ ...adminProfile, [e.target.name]: e.target.value });
  // };

  const handleAdminProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminProfile) return;
    setAdminProfileSaving(true);
    setAdminProfileSaveMsg(null);
    setAdminProfileError(null);
    const { id, firstName, lastName, email, phoneNumber } = adminProfile;
    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/admin/profile/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, phoneNumber }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAdminProfileSaveMsg("Profile updated successfully!");
      } else {
        setAdminProfileError(data.message || "Failed to update profile.");
      }
    } catch {
      setAdminProfileError("An unexpected error occurred.");
    } finally {
      setAdminProfileSaving(false);
      setTimeout(() => setAdminProfileSaveMsg(null), 3000);
    }
  };

  // const getStatusChipClass = (status: string) => {
  //   switch (status?.toLowerCase()) {
  //     case "paid":
  //       return "bg-green-800/50 text-green-300";
  //     case "pending":
  //       return "bg-yellow-800/50 text-yellow-300";
  //     case "defaulted":
  //       return "bg-red-800/50 text-red-300";
  //     default:
  //       return "bg-gray-700 text-gray-400";
  //   }
  // };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-6 text-white bg-[#0D0D0D] min-h-screen">
      <style>{`
        .switch { position: relative; display: inline-block; width: 34px; height: 20px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #4b5563; -webkit-transition: .4s; transition: .4s; }
        .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; -webkit-transition: .4s; transition: .4s; }
        input:checked + .slider { background-color: #E5B93E; }
        input:focus + .slider { box-shadow: 0 0 1px #E5B93E; }
        input:checked + .slider:before { -webkit-transform: translateX(14px); -ms-transform: translateX(14px); transform: translateX(14px); }
        .slider.round { border-radius: 20px; }
        .slider.round:before { border-radius: 50%; }
      `}</style>
      <div className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold mb-6">Settings</h2>
        <div className="flex flex-row flex-wrap md:flex-col gap-2">
          {TABS.map((item) => (
            <button
              key={item.label}
              onClick={() => setTab(item.label)}
              className={`flex items-center justify-center md:justify-start flex-1 md:flex-none gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                tab === item.label
                  ? "bg-[#E5B93E] text-black"
                  : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {tab === "Cooperative" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-1">Cooperative Information</h3>
            <p className="text-gray-400 mb-6">
              Update your cooperative's details here.
            </p>
            {coopLoading ? (
              <div className="flex justify-center items-center py-10">
                <LoadingSpinner />
              </div>
            ) : coopError ? (
              <p className="text-red-400">{coopError}</p>
            ) : (
              <form
                onSubmit={handleCoopSave}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cooperative Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={coopDetails?.name || ""}
                    onChange={handleCoopChange}
                    className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  />
                </div>
                {/* Other fields... */}
                <div className="md:col-span-2 flex justify-end items-center gap-4 mt-4">
                  {coopSaveMsg && (
                    <p className="text-green-400 text-sm">{coopSaveMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={coopSaving}
                    className="bg-[#E5B93E] text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-60"
                  >
                    {coopSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {tab === "Permission" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold">Roles & Permissions</h3>
                <p className="text-gray-400">Manage who can see and do what.</p>
              </div>
              <button
                onClick={() => setShowAddRoleModal(true)}
                className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg font-bold hover:bg-yellow-400 text-sm"
              >
                + Add Role
              </button>
            </div>
            {rolesLoading ? (
              <LoadingSpinner />
            ) : rolesError ? (
              <p className="text-red-500">{rolesError}</p>
            ) : (
              <div className="space-y-4">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="bg-[#0D0D0D] border border-gray-700/50 p-4 rounded-lg"
                  >
                    {editingRoleId === role.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingRole.name}
                          onChange={handleEditRoleChange}
                          className="w-full bg-gray-800 border border-gray-600 rounded p-2 mb-2 text-white"
                        />
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                          {availablePermissions.map((p) => (
                            <label
                              key={p.id}
                              className="flex items-center gap-2 text-sm text-gray-300"
                            >
                              <input
                                type="checkbox"
                                checked={editingRole.permissions.includes(
                                  p.name
                                )}
                                onChange={(e) =>
                                  handleEditPermissionChange(
                                    p.name,
                                    e.target.checked
                                  )
                                }
                                className="accent-[#E5B93E]"
                              />
                              {p.name}
                            </label>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditRole(role.id)}
                            disabled={roleSaving}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditingRole}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                          <h4 className="font-bold text-lg text-white">
                            {role.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {role.permissions.slice(0, 5).map((p) => (
                              <span
                                key={p.id}
                                className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                              >
                                {p.name}
                              </span>
                            ))}
                            {role.permissions.length > 5 && (
                              <span className="text-gray-400 text-xs">
                                +{role.permissions.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <button
                            onClick={() => startEditingRole(role)}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRole(role.id)}
                            disabled={roleDeleting === role.id}
                            className="bg-red-800/80 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            {roleDeleting === role.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "Loans" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-1">Loan Status Overview</h3>
            <p className="text-gray-400 mb-6">
              Monitor the current status of all loans.
            </p>
            {loanStatusLoading ? (
              <LoadingSpinner />
            ) : loanStatusError ? (
              <p className="text-red-400">{loanStatusError}</p>
            ) : loanStatusData ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {/* Stats cards */}
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm text-left">
                    {/* Table content */}
                  </table>
                </div>
                <div className="block md:hidden space-y-4">
                  {/* Mobile cards */}
                </div>
              </>
            ) : (
              <p className="text-gray-400">No loan data available.</p>
            )}
          </div>
        )}

        {tab === "Profile" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-1">Admin Profile</h3>
            <p className="text-gray-400 mb-6">
              This is how your profile appears to others.
            </p>
            {adminProfileLoading ? (
              <LoadingSpinner />
            ) : adminProfileError ? (
              <p className="text-red-400">{adminProfileError}</p>
            ) : adminProfile ? (
              <form onSubmit={handleAdminProfileSave} className="space-y-6">
                {/* Profile form */}
              </form>
            ) : (
              <p>No profile data found.</p>
            )}
          </div>
        )}

        {/* Other tabs like Notification and Security can be added here */}
      </div>

      {showAddRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 w-full max-w-lg relative text-white">
            <h3 className="text-xl font-bold mb-4">Add New Role</h3>
            <form onSubmit={handleAddRole} className="space-y-4">
              {/* Add role form */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
