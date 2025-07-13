import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

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
  associationId: string;
  cooperativeId: string;
  createdAt: string;
  updatedAt: string;
  adminType: string;
}

const TABS = [
  {
    label: "Association",
    icon: (
      <img src="/building.svg" alt="association" className="w-5 h-5 invert" />
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
  const [tab, setTab] = useState("Association");
  const [_editingLoanIdx, _setEditingLoanIdx] = useState<number | null>(null);
  const [coopDetails, setCoopDetails] = useState<CooperativeDetails | null>(
    null
  );
  const [coopLoading, setCoopLoading] = useState(true);
  const [coopError, setCoopError] = useState<string | null>(null);
  const [coopSaving, setCoopSaving] = useState(false);
  const [coopSaveMsg, setCoopSaveMsg] = useState<string | null>(null);
  const associationId = localStorage.getItem("associationId");

  // Add state for roles
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [rolesError, setRolesError] = useState<string | null>(null);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [roleSaving, setRoleSaving] = useState(false);
  const [roleDeleting, setRoleDeleting] = useState<number | null>(null);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [addingRole, setAddingRole] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    permissions: [] as string[],
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });

  // Add state for editing role
  const [editingRole, setEditingRole] = useState({
    name: "",
    permissions: [] as string[],
  });

  // Add state for available permissions
  const [availablePermissions, setAvailablePermissions] = useState<
    Permission[]
  >([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);

  // Add state for loan status
  const [loanStatusData, setLoanStatusData] = useState<LoanStatusData | null>(
    null
  );
  const [loanStatusLoading, setLoanStatusLoading] = useState(false);
  const [loanStatusError, setLoanStatusError] = useState<string | null>(null);

  // Add state for admin profile
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [adminProfileLoading, setAdminProfileLoading] = useState(false);
  const [adminProfileError, setAdminProfileError] = useState<string | null>(
    null
  );
  const [adminProfileSaving, setAdminProfileSaving] = useState(false);
  const [adminProfileSaveMsg, setAdminProfileSaveMsg] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (tab === "Association" && associationId) {
      setCoopLoading(true);
      setCoopError(null);
      fetch(
        `https://ajo.nickyai.online/api/v1/admin/association/${associationId}`,
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            setCoopDetails((prev) => ({
              ...prev,
              ...data.data,
              phone:
                data.data.phoneNumber || data.data.phone || prev?.phone || "",
              registrationNumber:
                data.data.registrationNumber ?? prev?.registrationNumber ?? "",
              address: data.data.address ?? prev?.address ?? "",
              email: data.data.email ?? prev?.email ?? "",
            }));
          } else {
            setCoopDetails({});
          }
          setCoopLoading(false);
        })
        .catch(() => {
          setCoopError("Failed to load cooperative details");
          setCoopLoading(false);
        });
    }
  }, [tab, associationId]);

  // Add useEffect to fetch roles when tab changes to Permission
  useEffect(() => {
    if (tab === "Permission") {
      setRolesLoading(true);
      setRolesError(null);
      fetch(`https://ajo.nickyai.online/api/v1/admin/roles/${associationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Roles API Response:", data);
          if (data.status === "success" && data.data) {
            setRoles(data.data);
          } else {
            setRolesError("Failed to load roles");
          }
          setRolesLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching roles:", error);
          setRolesError("Failed to load roles");
          setRolesLoading(false);
        });
    }
  }, [tab, associationId]);

  // Add useEffect to fetch loan status when tab changes to Loans
  useEffect(() => {
    if (tab === "Loans") {
      setLoanStatusLoading(true);
      setLoanStatusError(null);
      fetch("https://ajo.nickyai.online/api/v1/admin/loans/status/view", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Loan status API Response:", data);
          if (data.status === "success" && data.data) {
            setLoanStatusData(data.data);
          } else {
            setLoanStatusError("Failed to load loan status");
          }
          setLoanStatusLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching loan status:", error);
          setLoanStatusError("Failed to load loan status");
          setLoanStatusLoading(false);
        });
    }
  }, [tab]);

  // Add useEffect to fetch available permissions when modal opens
  useEffect(() => {
    if (showAddRoleModal) {
      setPermissionsLoading(true);
      fetch("https://ajo.nickyai.online/api/v1/admin/permissions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Available permissions API Response:", data);
          if (data.status === "success" && data.data) {
            setAvailablePermissions(data.data);
          }
          setPermissionsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching permissions:", error);
          setPermissionsLoading(false);
        });
    }
  }, [showAddRoleModal]);

  // Fetch admin profile when Profile tab is selected
  useEffect(() => {
    if (tab === "Profile") {
      setAdminProfileLoading(true);
      setAdminProfileError(null);
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
      if (userId) {
        fetch(`https://ajo.nickyai.online/api/v1/admin/profile/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Admin Profile API Response:", data);
            if (data.status === "success" && data.data) {
            setAdminProfile(data.data);
          } else {
              setAdminProfileError("Failed to load profile data");
          }
          setAdminProfileLoading(false);
        })
          .catch((error) => {
            console.error("Error fetching admin profile:", error);
            setAdminProfileError("Failed to load profile data");
          setAdminProfileLoading(false);
        });
      } else {
        setAdminProfileError("User ID not found");
        setAdminProfileLoading(false);
      }
    }
  }, [tab]);

  const handleCoopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!coopDetails) return;
    const { name, value } = e.target;
    setCoopDetails({ ...coopDetails, [name]: value });
  };
 
  const handleCoopSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coopDetails || !associationId) return;

    setCoopSaving(true);
    setCoopSaveMsg(null);
    setCoopError(null);

    // Log the payload to debug
    console.log("Saving cooperative details:", {
      ...coopDetails,
      id: associationId,
    });

    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/admin/association/${associationId}`,
        {
          method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: coopDetails.name,
            address: coopDetails.address,
            phoneNumber: coopDetails.phone,
            registrationNumber: coopDetails.registrationNumber,
            foundedDate: coopDetails.foundedDate,
            email: coopDetails.email,
          }),
        }
      );
      const data = await res.json();
      if (data.status === "success" || res.ok) {
        setCoopSaveMsg("Details saved successfully!");
      } else {
        setCoopError(data.message || "Failed to save details.");
      }
    } catch (error) {
      console.error("Save error:", error);
      setCoopError("An unexpected error occurred.");
    } finally {
      setCoopSaving(false);
      setTimeout(() => setCoopSaveMsg(null), 3000);
    }
  };

  const handleEditRole = async (roleId: number) => {
    setRoleSaving(true);
    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/admin/roles/${roleId}`,
        {
          method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
          name: editingRole.name,
          permissions: editingRole.permissions,
          }),
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        setRoles(
          roles.map((r) =>
            r.id === roleId
              ? {
                  ...r,
                  name: editingRole.name,
                  permissions: editingRole.permissions.map((p) => ({
                    id: 0,
                    name: p,
                    createdAt: "",
                    updatedAt: "",
                  })),
                }
              : r
          )
        );
        cancelEditingRole();
      } else {
        console.error("Failed to update role");
      }
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
    setEditingRole((prev) => {
      const permissions = checked
        ? [...prev.permissions, permissionName]
        : prev.permissions.filter((p) => p !== permissionName);
      return { ...prev, permissions };
      });
  };

  const cancelEditingRole = () => {
    setEditingRoleId(null);
    setEditingRole({ name: "", permissions: [] });
  };

  const handleDeleteRole = async (roleId: number) => {
    setRoleDeleting(roleId);
    try {
      const res = await fetch(
        `https://ajo.nickyai.online/api/v1/admin/roles/${roleId}`,
        {
          method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (res.ok) {
        setRoles(roles.filter((r) => r.id !== roleId));
      } else {
        console.error("Failed to delete role");
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
      const res = await fetch(`https://ajo.nickyai.online/api/v1/admin/roles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: newRole.name,
          associationId: associationId,
          permissions: newRole.permissions,
          email: newRole.email,
          phoneNumber: newRole.phoneNumber,
          firstName: newRole.firstName,
          lastName: newRole.lastName,
        }),
      });
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
      } else {
        console.error("Failed to add role");
      }
    } catch (error) {
      console.error("Error adding role:", error);
    } finally {
      setAddingRole(false);
    }
  };

  const handleNewRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (permissionName: string, checked: boolean) => {
    setNewRole((prev) => {
      const permissions = checked
        ? [...prev.permissions, permissionName]
        : prev.permissions.filter((p) => p !== permissionName);
      return { ...prev, permissions };
    });
  };

  const roleTemplates = {
    readonly: ["view_dashboard", "view_reports"],
    editor: [
      "view_dashboard",
      "manage_members",
      "manage_loans",
      "view_reports",
    ],
    admin: availablePermissions.map((p) => p.name),
  };

  const handleTemplateSelect = (templateKey: keyof typeof roleTemplates) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: roleTemplates[templateKey],
    }));
  };
  const handleAdminProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!adminProfile) return;
    const { name, value } = e.target;
    setAdminProfile({ ...adminProfile, [name]: value });
  };

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
            Accept: "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, phoneNumber }),
        }
      );
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setAdminProfileSaveMsg("Profile updated successfully!");
      } else {
        setAdminProfileError(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setAdminProfileError("An unexpected error occurred.");
    } finally {
      setAdminProfileSaving(false);
      setTimeout(() => setAdminProfileSaveMsg(null), 3000);
    }
  };

  const getStatusChipClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-800/50 text-green-300";
      case "pending":
        return "bg-yellow-800/50 text-yellow-300";
      case "defaulted":
        return "bg-red-800/50 text-red-300";
      default:
        return "bg-gray-700 text-gray-400";
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-6 text-white min-h-screen">
      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 34px;
          height: 20px;
        }
        
        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #4b5563; /* gray-600 */
          -webkit-transition: .4s;
          transition: .4s;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
        }
        
        input:checked + .slider {
          background-color: #E5B93E;
        }
        
        input:focus + .slider {
          box-shadow: 0 0 1px #E5B93E;
        }
        
        input:checked + .slider:before {
          -webkit-transform: translateX(14px);
          -ms-transform: translateX(14px);
          transform: translateX(14px);
        }
        
        .slider.round {
          border-radius: 20px;
        }
        
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
      {/* Left Sidebar */}
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

      {/* Right Content */}
      <div className="flex-1 min-w-0">
        {/* Association Tab */}
        {tab === "Association" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-1">Association Information</h3>
            <p className="text-gray-400 mb-6">
              Update your association's details here.
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
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Association Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={coopDetails?.name || ""}
                    onChange={handleCoopChange}
                    className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  />
              </div>
              <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={coopDetails?.address || ""}
                    onChange={handleCoopChange}
                    className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  />
              </div>
              <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={coopDetails?.email || ""}
                    onChange={handleCoopChange}
                    className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  />
              </div>
              <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={coopDetails?.phone || ""}
                    onChange={handleCoopChange}
                    className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  />
              </div>
              <div>
                  <label
                    htmlFor="registrationNumber"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Registration Number
                  </label>
                  <input
                    id="registrationNumber"
                    name="registrationNumber"
                    type="text"
                    value={coopDetails?.registrationNumber || ""}
                    onChange={handleCoopChange}
                    className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  />
              </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="foundedDate"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Founded Date
                  </label>
                  <input
                    id="foundedDate"
                    name="foundedDate"
                    type="date"
                    value={
                      coopDetails?.foundedDate
                        ? coopDetails.foundedDate.split("T")[0]
                        : ""
                    }
                    onChange={handleCoopChange}
                    className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  />
              </div>
                <div className="md:col-span-2 flex justify-end items-center gap-4 mt-4">
                  {coopSaveMsg && (
                    <p className="text-green-400 text-sm">{coopSaveMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={coopSaving}
                    className="bg-[#E5B93E] text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-60 cursor-pointer"
                  >
                    {coopSaving ? "Saving..." : "Save Changes"}
                  </button>
              </div>
            </form>
            )}
        </div>
      )}

        {/* Permission Tab */}
        {tab === "Permission" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold">Roles & Permissions</h3>
                <p className="text-gray-400">
                  Manage who can see and do what in your association.
                </p>
              </div>
              <button
                onClick={() => setShowAddRoleModal(true)}
                className="bg-[#E5B93E] text-black px-5 py-2 rounded-lg font-bold hover:bg-yellow-400 cursor-pointer text-sm"
              >
                + Add Role
              </button>
            </div>
          
          {rolesLoading ? (
              <div className="flex justify-center items-center py-10">
                <LoadingSpinner />
              </div>
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
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
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
                            className="bg-red-800/80 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
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

        {/* Loans Tab */}
        {tab === "Loans" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-1">Loan Status Overview</h3>
            <p className="text-gray-400 mb-6">
              Monitor the current status of all loans.
            </p>
            {loanStatusLoading ? (
              <div className="flex justify-center items-center py-10">
                <LoadingSpinner />
              </div>
            ) : loanStatusError ? (
              <p className="text-red-400">{loanStatusError}</p>
            ) : loanStatusData ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#0D0D0D] p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Total Loans</p>
                    <p className="text-2xl font-bold">
                      {loanStatusData.totalLoans}
                    </p>
                  </div>
                  <div className="bg-[#0D0D0D] p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Pending Loans</p>
                    <p className="text-2xl font-bold">
                      {loanStatusData.pendingLoans}
                    </p>
                  </div>
                  <div className="bg-[#0D0D0D] p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Repaid Loans</p>
                    <p className="text-2xl font-bold">
                      {loanStatusData.repaidLoans}
                    </p>
                  </div>
                  <div className="bg-[#0D0D0D] p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Defaulted Loans</p>
                    <p className="text-2xl font-bold">
                      {loanStatusData.defaultedLoans}
                    </p>
                  </div>
                </div>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm text-left">
                    <thead className="border-b-2 border-gray-700/80">
                      <tr>
                        <th className="p-3 text-gray-400 font-semibold">
                          Member
                        </th>
                        <th className="p-3 text-gray-400 font-semibold">
                          Amount
                        </th>
                        <th className="p-3 text-gray-400 font-semibold">
                          Due Date
                        </th>
                        <th className="p-3 text-gray-400 font-semibold">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanStatusData.loans.slice(0, 5).map((loan, idx) => (
                        <tr key={idx} className="border-b border-gray-700/50">
                          <td className="p-3">{loan.memberName}</td>
                          <td className="p-3">
                            ₦{Number(loan.amount).toLocaleString()}
                          </td>
                          <td className="p-3">
                            {new Date(loan.dueDate).toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusChipClass(
                                loan.status
                              )}`}
                            >
                              {loan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
        </div>
                {/* Mobile Cards */}
                <div className="block md:hidden space-y-4">
                  {loanStatusData.loans.slice(0, 5).map((loan, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0D0D0D] p-4 rounded-lg space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-base">
                          {loan.memberName}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusChipClass(
                            loan.status
                          )}`}
                        >
                          {loan.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Amount:{" "}
                        <span className="font-medium text-white">
                          ₦{Number(loan.amount).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-sm text-gray-300">
                        Due Date:{" "}
                        <span className="font-medium text-white">
                          {new Date(loan.dueDate).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-400">No loan data available.</p>
            )}
              </div>
        )}

        {/* Notification Tab */}
        {tab === "Notification" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-1">Notification Settings</h3>
            <p className="text-gray-400 mb-6">
              Manage how you receive notifications.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-[#0D0D0D] rounded-lg">
              <div>
                  <p className="font-medium text-white">Email Notifications</p>
                  <p className="text-sm text-gray-400">
                    Receive updates via email.
                  </p>
              </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#0D0D0D] rounded-lg">
                <div>
                  <p className="font-medium text-white">Push Notifications</p>
                  <p className="text-sm text-gray-400">
                    Get updates on your devices.
                  </p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#0D0D0D] rounded-lg">
                <div>
                  <p className="font-medium text-white">Monthly Reports</p>
                  <p className="text-sm text-gray-400">
                    Get monthly summaries of activity.
                  </p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {tab === "Security" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-1">Security</h3>
            <p className="text-gray-400 mb-6">
              Manage your account's security settings.
            </p>
            <div className="space-y-6">
                <div>
                <h4 className="text-lg font-semibold mb-2 text-[#E5B93E]">
                  Change Password
                </h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Current Password
                    </label>
                  <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      New Password
                    </label>
                  <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  />
                </div>
              <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                        <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                    />
                </div>
                  <div className="flex justify-end">
                <button
                  type="submit"
                      className="bg-[#E5B93E] text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-60 cursor-pointer"
                >
                      Update Password
                </button>
              </div>
            </form>
              </div>
              <div className="border-t border-gray-700/50 pt-6">
                <h4 className="text-lg font-semibold mb-2 text-[#E5B93E]">
                  Two-Factor Authentication
                </h4>
                <div className="flex justify-between items-center p-4 bg-[#0D0D0D] rounded-lg">
                  <div>
                    <p className="font-medium text-white">Enable 2FA</p>
                    <p className="text-sm text-gray-400">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
          </div>
        </div>
      )}

        {/* Profile Tab */}
        {tab === "Profile" && (
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-1">Admin Profile</h3>
            <p className="text-gray-400 mb-6">
              This is how your profile appears to others.
            </p>
            {adminProfileLoading ? (
              <div className="flex justify-center items-center py-10">
                <LoadingSpinner />
                  </div>
            ) : adminProfileError ? (
              <p className="text-red-400">{adminProfileError}</p>
            ) : adminProfile ? (
              <form onSubmit={handleAdminProfileSave} className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-4xl font-bold text-[#E5B93E]">
                    {adminProfile.firstName.charAt(0)}
                    {adminProfile.lastName.charAt(0)}
                </div>
                  <div>
                    <h4 className="text-xl font-bold">
                      {adminProfile.firstName} {adminProfile.lastName}
                    </h4>
                    <p className="text-gray-400">
                      {adminProfile.role} - {adminProfile.adminType}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={adminProfile.firstName}
                      onChange={handleAdminProfileChange}
                      className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={adminProfile.lastName}
                      onChange={handleAdminProfileChange}
                      className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={adminProfile.email}
                      onChange={handleAdminProfileChange}
                      className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={adminProfile.phoneNumber}
                      onChange={handleAdminProfileChange}
                      className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                    />
                  </div>
                  </div>
                <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-700/50">
                  {adminProfileSaveMsg && (
                    <p className="text-green-400 text-sm">
                      {adminProfileSaveMsg}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={adminProfileSaving}
                    className="bg-[#E5B93E] text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-60 cursor-pointer"
                  >
                    {adminProfileSaving ? "Saving..." : "Save Changes"}
                  </button>
                  </div>
                </form>
            ) : (
              <p>No profile data found.</p>
              )}
        </div>
      )}
                </div>

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#1C1C1C] border border-gray-700/50 rounded-2xl shadow-lg p-6 w-full max-w-lg relative text-white">
            <button
              onClick={() => setShowAddRoleModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Role</h3>
            <form
              onSubmit={handleAddRole}
              className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"
            >
              <input
                type="text"
                name="name"
                placeholder="Role Name"
                value={newRole.name}
                onChange={handleNewRoleChange}
                className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={newRole.firstName}
                  onChange={handleNewRoleChange}
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={newRole.lastName}
                  onChange={handleNewRoleChange}
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newRole.email}
                  onChange={handleNewRoleChange}
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={newRole.phoneNumber}
                  onChange={handleNewRoleChange}
                  className="w-full bg-[#0D0D0D] border-2 border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E5B93E]"
                  required
                />
              </div>
                <div>
                <h4 className="font-semibold mb-2">Assign Permissions</h4>
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => handleTemplateSelect("readonly")}
                    className="bg-gray-700 text-xs px-2 py-1 rounded"
                  >
                    Read-Only
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTemplateSelect("editor")}
                    className="bg-gray-700 text-xs px-2 py-1 rounded"
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTemplateSelect("admin")}
                    className="bg-gray-700 text-xs px-2 py-1 rounded"
                  >
                    Admin (Full Access)
                  </button>
                </div>
                {permissionsLoading ? (
                  <div className="flex justify-center items-center py-6">
                    <LoadingSpinner />
                </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border border-gray-700/50 bg-[#0D0D0D] p-3 rounded-lg">
                    {availablePermissions.map((p) => (
                      <label
                        key={p.id}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={newRole.permissions.includes(p.name)}
                          onChange={(e) =>
                            handlePermissionChange(p.name, e.target.checked)
                          }
                          className="accent-[#E5B93E] bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-[#E5B93E]"
                        />
                        {p.name}
                      </label>
                    ))}
                </div>
                )}
                </div>
              <button
                type="submit"
                disabled={addingRole}
                className="w-full bg-[#E5B93E] text-black py-2 rounded-lg font-bold mt-4 disabled:opacity-60"
              >
                {addingRole ? "Adding..." : "Add Role"}
              </button>
              </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
