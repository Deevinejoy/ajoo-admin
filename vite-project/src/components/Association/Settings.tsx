import React, { useState, useEffect } from 'react';

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
  adminType: string; // Added for profile tab
}

const TABS = [
  { label: 'Association', icon: <img src="/building.svg" alt="association" className="w-5 h-5" /> },
  { label: 'Permission', icon: <img src="/Group.svg" alt="permission" className="w-5 h-5" /> },
  { label: 'Loans', icon: <img src="/loans.svg" alt="loans" className="w-5 h-5" /> },
  { label: 'Notification', icon: <img src="/notif.svg" alt="notification" className="w-5 h-5" /> },
  { label: 'Security', icon: <img src="/security.svg" alt="security" className="w-5 h-5" /> },
  { label: 'Profile', icon: <img src="/profile.svg" alt="profile" className="w-5 h-5" /> },
];

const Settings: React.FC = () => {
  const [tab, setTab] = useState('Association');
  const [editingLoanIdx, setEditingLoanIdx] = useState<number | null>(null);
  const [coopDetails, setCoopDetails] = useState<CooperativeDetails | null>(null);
  const [coopLoading, setCoopLoading] = useState(true);
  const [coopError, setCoopError] = useState<string | null>(null);
  const [coopSaving, setCoopSaving] = useState(false);
  const [coopSaveMsg, setCoopSaveMsg] = useState<string | null>(null);
  const associationId = localStorage.getItem('associationId');

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
    name: '',
    permissions: [] as string[],
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: ''
  });

  // Add state for editing role
  const [editingRole, setEditingRole] = useState({
    name: '',
    permissions: [] as string[]
  });

  // Add state for available permissions
  const [availablePermissions, setAvailablePermissions] = useState<Permission[]>([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);

  // Add state for loan status
  const [loanStatusData, setLoanStatusData] = useState<LoanStatusData | null>(null);
  const [loanStatusLoading, setLoanStatusLoading] = useState(false);
  const [loanStatusError, setLoanStatusError] = useState<string | null>(null);

  // Add state for admin profile
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [adminProfileLoading, setAdminProfileLoading] = useState(false);
  const [adminProfileError, setAdminProfileError] = useState<string | null>(null);
  const [adminProfileSaving, setAdminProfileSaving] = useState(false);
  const [adminProfileSaveMsg, setAdminProfileSaveMsg] = useState<string | null>(null);

  useEffect(() => {
    if (tab === 'Association' && associationId) {
      setCoopLoading(true);
      setCoopError(null);
      fetch(`https://ajo.nickyai.online/api/v1/admin/association/${associationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data) {
            setCoopDetails(prev => ({
              ...prev,
              ...data.data,
              phone: data.data.phoneNumber || data.data.phone || prev?.phone || '',
              registrationNumber: data.data.registrationNumber ?? prev?.registrationNumber ?? '',
              address: data.data.address ?? prev?.address ?? '',
              email: data.data.email ?? prev?.email ?? '',
            }));
          } else {
            setCoopDetails({});
          }
          setCoopLoading(false);
        })
        .catch(() => {
          setCoopError('Failed to load cooperative details');
          setCoopLoading(false);
        });
    }
  }, [tab, associationId]);

  // Add useEffect to fetch roles when tab changes to Permission
  useEffect(() => {
    if (tab === 'Permission') {
      setRolesLoading(true);
      setRolesError(null);
      fetch(`https://ajo.nickyai.online/api/v1/admin/roles/${associationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log('Roles API Response:', data);
          if (data.status === 'success' && data.data) {
            setRoles(data.data);
          } else {
            setRolesError('Failed to load roles');
          }
          setRolesLoading(false);
        })
        .catch(error => {
          console.error('Error fetching roles:', error);
          setRolesError('Failed to load roles');
          setRolesLoading(false);
        });
    }
  }, [tab, associationId]);

  // Add useEffect to fetch loan status when tab changes to Loans
  useEffect(() => {
    if (tab === 'Loans') {
      setLoanStatusLoading(true);
      setLoanStatusError(null);
      fetch('https://ajo.nickyai.online/api/v1/admin/loans/status/view', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log('Loan status API Response:', data);
          if (data.status === 'success' && data.data) {
            setLoanStatusData(data.data);
          } else {
            setLoanStatusError('Failed to load loan status');
          }
          setLoanStatusLoading(false);
        })
        .catch(error => {
          console.error('Error fetching loan status:', error);
          setLoanStatusError('Failed to load loan status');
          setLoanStatusLoading(false);
        });
    }
  }, [tab]);

  // Add useEffect to fetch available permissions when modal opens
  useEffect(() => {
    if (showAddRoleModal) {
      setPermissionsLoading(true);
      fetch('https://ajo.nickyai.online/api/v1/admin/permissions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log('Available permissions API Response:', data);
          if (data.status === 'success' && data.data) {
            setAvailablePermissions(data.data);
          }
          setPermissionsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching permissions:', error);
          setPermissionsLoading(false);
        });
    }
  }, [showAddRoleModal]);

  // Fetch admin profile when Profile tab is selected
  useEffect(() => {
    if (tab === 'Profile') {
      setAdminProfileLoading(true);
      setAdminProfileError(null);
      fetch('https://ajo.nickyai.online/api/v1/admin/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data) {
            setAdminProfile(data.data);
          } else {
            setAdminProfileError('Failed to load profile');
          }
          setAdminProfileLoading(false);
        })
        .catch(() => {
          setAdminProfileError('Failed to load profile');
          setAdminProfileLoading(false);
        });
    }
  }, [tab]);

  const handleCoopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoopDetails((prev) => prev ? { ...prev, [name]: value } : { [name]: value });
  };
 
  const handleCoopSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setCoopSaving(true);
    setCoopSaveMsg(null);
    if (!associationId) {
      setCoopSaveMsg('Association ID is required. Please refresh the page or contact support.');
      setCoopSaving(false);
      return;
    }
    try {
      const requestBody = {
        id: coopDetails?.id,
        name: coopDetails?.name,
        address: coopDetails?.address,
        email: coopDetails?.email,
        phone: coopDetails?.phone,
        registrationNumber: coopDetails?.registrationNumber
      };
      console.log('PUT /admin/association request body:', requestBody);
      const response = await fetch(`https://ajo.nickyai.online/api/v1/admin/association`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to update details');

      }
      console.log(associationId)
      setCoopSaveMsg('Changes saved successfully!');
      // Refetch updated details
      const detailsRes = await fetch(`https://ajo.nickyai.online/api/v1/admin/association/${associationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      const detailsData = await detailsRes.json();
      if (detailsData.status === 'success' && detailsData.data) {
        setCoopDetails(prev => ({
          ...prev,
          ...detailsData.data,
          phone: detailsData.data.phoneNumber || detailsData.data.phone || prev?.phone || '',
          registrationNumber: detailsData.data.registrationNumber ?? prev?.registrationNumber ?? '',
          address: detailsData.data.address ?? prev?.address ?? '',
          email: detailsData.data.email ?? prev?.email ?? '',
        }));
      }
    } catch (err: unknown) {
      let errorMsg = 'Failed to save changes';
      if (err && typeof err === 'object' && 'message' in err && typeof (err as { message?: string }).message === 'string') {
        errorMsg = (err as { message: string }).message;
      }
      setCoopSaveMsg(errorMsg);
    } finally {
      setCoopSaving(false);
    }
  };

  // Add function to handle role editing
  const handleEditRole = async (roleId: number) => {
    setRoleSaving(true);
    try {
      const response = await fetch(`https://ajo.nickyai.online/api/v1/admin/roles/${roleId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: editingRole.name,
          permissions: editingRole.permissions,
          associationId: associationId
        })
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to update role');
      }
      
      // Refresh roles after successful edit
      setEditingRoleId(null);
      setEditingRole({ name: '', permissions: [] });
      // Re-fetch roles to get updated data
      const rolesResponse = await fetch(`https://ajo.nickyai.online/api/v1/admin/roles/${associationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      const rolesData = await rolesResponse.json();
      if (rolesData.status === 'success' && rolesData.data) {
        setRoles(rolesData.data);
      }
      
      alert('Role updated successfully!');
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role. Please try again.');
    } finally {
      setRoleSaving(false);
    }
  };

  // Add function to start editing a role
  const startEditingRole = (role: Role) => {
    setEditingRoleId(role.id);
    setEditingRole({
      name: role.name,
      permissions: role.permissions.map(p => p.name)
    });
    
    // Fetch permissions when starting to edit
    setPermissionsLoading(true);
    fetch('https://ajo.nickyai.online/api/v1/cooperative/permissions', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('Available permissions API Response:', data);
        if (data.status === 'success' && data.data) {
          setAvailablePermissions(data.data);
        }
        setPermissionsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching permissions:', error);
        setPermissionsLoading(false);
      });
  };

  // Add function to cancel editing
  const cancelEditingRole = () => {
    setEditingRoleId(null);
    setEditingRole({ name: '', permissions: [] });
  };

  // Add function to handle role deletion
  const handleDeleteRole = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      return;
    }
    
    setRoleDeleting(roleId);
    try {
      const response = await fetch(`https://ajo.nickyai.online/api/v1/admin/roles/${roleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to delete role');
      }
      
      // Remove the deleted role from state
      setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Failed to delete role. Please try again.');
    } finally {
      setRoleDeleting(null);
    }
  };

  // Add function to handle creating new role
  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingRole(true);
    try {
      const response = await fetch('https://ajo.nickyai.online/api/v1/admin/roles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: newRole.name,
          permissions: newRole.permissions,
          associationId: associationId,
          email: newRole.email,
          phoneNumber: newRole.phoneNumber,
          firstName: newRole.firstName,
          lastName: newRole.lastName
        })
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to create role');
      }
      
      // Reset form and close modal
      setNewRole({
        name: '',
        permissions: [],
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: ''
      });
      setShowAddRoleModal(false);
      
      // Refresh roles list
      const rolesResponse = await fetch(`https://ajo.nickyai.online/api/v1/admin/roles/${associationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      const rolesData = await rolesResponse.json();
      if (rolesData.status === 'success' && rolesData.data) {
        setRoles(rolesData.data);
      }
      
      alert('Role created successfully!');
    } catch (error) {
      console.error('Error creating role:', error);
      alert('Failed to create role. Please try again.');
    } finally {
      setAddingRole(false);
    }
  };

  // Predefined role templates
  const roleTemplates = {
    LOAN_MANAGER: {
      name: 'Loan Manager',
      permissions: ['manage_loans', 'view_loans', 'approve_loans', 'manage_repayments', 'view_transactions', 'view_analytics']
    },
    MEMBER_MANAGER: {
      name: 'Member Manager',
      permissions: ['manage_members', 'view_members', 'manage_attendance', 'view_attendance', 'view_analytics']
    },
    ASSOCIATION_MANAGER: {
      name: 'Association Manager',
      permissions: ['manage_associations', 'view_associations', 'view_analytics']
    },
    FINANCE_MANAGER: {
      name: 'Finance Manager',
      permissions: ['manage_transactions', 'view_transactions', 'view_analytics', 'manage_repayments']
    },
    VIEWER: {
      name: 'Viewer',
      permissions: ['view_analytics', 'view_dashboard', 'view_associations', 'view_members', 'view_loans', 'view_transactions']
    }
  };

  const handleTemplateSelect = (templateKey: keyof typeof roleTemplates) => {
    const template = roleTemplates[templateKey];
    setNewRole(prev => ({
      ...prev,
      name: template.name,
      permissions: template.permissions
    }));
  };

  const handleAdminProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminProfile((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleAdminProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminProfileSaving(true);
    setAdminProfileSaveMsg(null);
    try {
      const response = await fetch('https://ajo.nickyai.online/api/v1/admin/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          id: adminProfile?.id,
          firstName: adminProfile?.firstName,
          lastName: adminProfile?.lastName,
          email: adminProfile?.email,
          phoneNumber: adminProfile?.phoneNumber,
        })
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to update profile');
      }
      setAdminProfileSaveMsg('Profile updated successfully!');
      // Refetch updated profile data
      const profileRes = await fetch('https://ajo.nickyai.online/api/v1/admin/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      const profileData = await profileRes.json();
      if (profileData.status === 'success' && profileData.data) {
        setAdminProfile(profileData.data);
      }
    } catch (err: unknown) {
      let errorMsg = 'Failed to update profile';
      if (err && typeof err === 'object' && 'message' in err && typeof (err as { message?: string }).message === 'string') {
        errorMsg = (err as { message: string }).message;
      }
      setAdminProfileSaveMsg(errorMsg);
    } finally {
      setAdminProfileSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-medium mb-1">Settings</h1>
      <p className="text-[#939393] text-sm md:text-base mb-4 md:mb-6">Manage association preferences and configurations</p>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-[#ECEFF1] rounded-lg p-2 mb-6 md:mb-8 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.label}
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-md font-medium text-sm md:text-base whitespace-nowrap ${tab === t.label ? 'bg-white shadow text-[#111827]' : 'text-[#939393]'}`}
            onClick={() => { setTab(t.label); setEditingLoanIdx(null); }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {tab === 'Association' && (
        <div className="bg-white rounded-lg p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold mb-1">Association Details</h2>
          <p className="text-[#939393] text-sm md:text-base mb-4 md:mb-6">Manage your cooperative information</p>
          {coopLoading ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : coopError ? (
            <div className="text-center text-red-500 py-8">{coopError}</div>
          ) : coopDetails ? (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" onSubmit={handleCoopSave}>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Association Name</label>
                <input name="name" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={coopDetails.name || ''} onChange={handleCoopChange} />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Cooperative ID</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg bg-[#F5F7FA]" value={coopDetails.id || ''} readOnly />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Registration number</label>
                <input name="registrationNumber" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={coopDetails.registrationNumber || ''} onChange={handleCoopChange} />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Founded Date</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg bg-[#F5F7FA]" value={coopDetails.foundedDate || ''} readOnly />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm md:text-base font-medium mb-1">Address</label>
                <input name="address" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={coopDetails.address || ''} onChange={handleCoopChange} />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Email</label>
                <input name="email" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={coopDetails.email || ''} onChange={handleCoopChange} />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Phone</label>
                <input name="phone" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={coopDetails.phone || ''} onChange={handleCoopChange} />
              </div>
              <div className="col-span-1 md:col-span-2 mt-2 md:mt-4">
                <button type="submit" className="w-full md:w-auto bg-[#111827] text-white px-4 md:px-6 py-2 rounded-lg" disabled={coopSaving}>{coopSaving ? 'Saving...' : 'Save Changes'}</button>
                {coopSaveMsg && <div className={`mt-2 text-sm ${coopSaveMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{coopSaveMsg}</div>}
              </div>
            </form>
          ) : null}
        </div>
      )}
      {tab === 'Permission' && (
        <div className="bg-white rounded-lg p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold mb-1">User Permissions</h2>
          <p className="text-[#939393] text-sm md:text-base mb-4 md:mb-6">Configure access levels for cooperative administrators and users</p>
          
          {rolesLoading ? (
            <div className="text-center text-gray-500 py-8">Loading roles...</div>
          ) : rolesError ? (
            <div className="text-center text-red-500 py-8">{rolesError}</div>
          ) : (
            <>
              {roles.map((role) => (
                <div key={role.id} className="bg-white border border-[#E5E5E5] rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                  {editingRoleId === role.id ? (
                    // Edit Mode
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Role Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={editingRole.name}
                          onChange={(e) => setEditingRole(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Permissions</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
                          {availablePermissions.map((permission) => (
                            <label key={permission.id} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={editingRole.permissions.includes(permission.name)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEditingRole(prev => ({
                                      ...prev,
                                      permissions: [...prev.permissions, permission.name]
                                    }));
                                  } else {
                                    setEditingRole(prev => ({
                                      ...prev,
                                      permissions: prev.permissions.filter(p => p !== permission.name)
                                    }));
                                  }
                                }}
                              />
                              {permission.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="bg-[#111827] text-white px-4 py-2 rounded"
                          onClick={() => handleEditRole(role.id)}
                          disabled={roleSaving}
                        >
                          {roleSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          className="bg-gray-200 px-4 py-2 rounded"
                          onClick={cancelEditingRole}
                          disabled={roleSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-2 gap-2">
                        <div>
                          <div className="font-medium text-base md:text-lg">{role.name}</div>
                          <div className="text-[#939393] text-xs md:text-sm">
                            {role.description || `${role.name} role with specific permissions`}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            className="w-full md:w-auto bg-[#F5F7FA] border border-[#C4C4C4] px-4 md:px-6 py-2 rounded-lg text-sm md:text-base"
                            onClick={() => startEditingRole(role)}
                            disabled={roleSaving}
                          >
                            Edit
                          </button>
                          <button 
                            className="w-full md:w-auto bg-red-100 border border-red-300 text-red-600 px-4 md:px-6 py-2 rounded-lg text-sm md:text-base"
                            onClick={() => handleDeleteRole(role.id)}
                            disabled={roleDeleting === role.id}
                          >
                            {roleDeleting === role.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {role.permissions.map((permission) => (
                          <div key={permission.id} className="flex items-center gap-2 text-sm md:text-base">
                            <span className="text-green-600 text-lg">●</span> {permission.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          )}
          <button 
            className="w-full md:w-auto bg-[#111827] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base"
            onClick={() => setShowAddRoleModal(true)}
          >
            Add Role
          </button>
        </div>
      )}
      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Add New Role</h2>
            <form onSubmit={handleAddRole} className="space-y-4">
              {/* Role Templates */}
              <div>
                <label className="block text-sm font-medium mb-2">Quick Templates</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(roleTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      type="button"
                      className="p-2 border border-gray-300 rounded text-xs hover:bg-gray-50"
                      onClick={() => handleTemplateSelect(key as keyof typeof roleTemplates)}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Role Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newRole.name}
                  onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newRole.firstName}
                    onChange={(e) => setNewRole(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newRole.lastName}
                    onChange={(e) => setNewRole(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newRole.email}
                    onChange={(e) => setNewRole(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newRole.phoneNumber}
                    onChange={(e) => setNewRole(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium mb-2">Permissions</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
                  {permissionsLoading ? (
                    <div className="col-span-full text-center text-gray-500 py-4">Loading permissions...</div>
                  ) : (
                    availablePermissions.map((permission) => (
                      <label key={permission.id} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newRole.permissions.includes(permission.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRole(prev => ({
                                ...prev,
                                permissions: [...prev.permissions, permission.name]
                              }));
                            } else {
                              setNewRole(prev => ({
                                ...prev,
                                permissions: prev.permissions.filter(p => p !== permission.name)
                              }));
                            }
                          }}
                        />
                        {permission.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-200 px-4 py-2 rounded"
                  onClick={() => setShowAddRoleModal(false)}
                  disabled={addingRole}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#111827] text-white px-4 py-2 rounded"
                  disabled={addingRole}
                >
                  {addingRole ? 'Creating...' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {tab === 'Loans' && (
        <div className="bg-white rounded-lg p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold mb-1">Loan Settings</h2>
          <p className="text-[#939393] text-sm md:text-base mb-4 md:mb-6">Configure loan parameters and repayment terms</p>
          
          {loanStatusLoading ? (
            <div className="text-center text-gray-500 py-8">Loading loan status...</div>
          ) : loanStatusError ? (
            <div className="text-center text-red-500 py-8">{loanStatusError}</div>
          ) : loanStatusData ? (
            <>
              {editingLoanIdx === null ? (
                <div className="bg-[#FAFAFA] rounded-xl p-4 md:p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full mb-4 md:mb-6 min-w-[600px]">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 md:py-4 px-3 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Name</th>
                          <th className="text-left py-3 md:py-4 px-3 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Interest(%)</th>
                          <th className="text-left py-3 md:py-4 px-3 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Months</th>
                          <th className="text-left py-3 md:py-4 px-3 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Min. Amount(₦)</th>
                          <th className="text-left py-3 md:py-4 px-3 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Max Amount(₦)</th>
                          <th className="text-left py-3 md:py-4 px-3 md:px-6 text-[#939393] font-medium text-xs md:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loanStatusData.loans.map((loan, idx) => (
                          <tr key={loan.id} className="border-b border-gray-200">
                            <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">{loan.purpose}</td>
                            <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">{loan.interestRate}</td>
                            <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">{loan.termMonths}</td>
                            <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">₦{Number(loan.minimumLoanAmount).toLocaleString()}</td>
                            <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">₦{Number(loan.maximumLoanAmount).toLocaleString()}</td>
                            <td className="py-3 md:py-4 px-3 md:px-6">
                              <button className="bg-[#F5F7FA] border border-[#C4C4C4] px-3 md:px-6 py-1 md:py-2 rounded-lg text-xs md:text-sm" onClick={() => setEditingLoanIdx(idx)}>Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="w-full md:w-auto bg-[#111827] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base">Add Loan</button>
                </div>
              ) : (
                <form className="bg-[#FAFAFA] rounded-xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <h2 className="col-span-1 md:col-span-2 text-lg md:text-xl font-semibold mb-1">Loan Settings</h2>
                  <p className="col-span-1 md:col-span-2 text-[#939393] text-sm md:text-base mb-2 md:mb-6">Configure loan parameters and repayment terms</p>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm md:text-base font-medium mb-1">Loan Name</label>
                    <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={loanStatusData.loans[editingLoanIdx].purpose} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-medium mb-1">Interest Rate(%)</label>
                    <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={loanStatusData.loans[editingLoanIdx].interestRate} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-medium mb-1">Maximum Loan Amount(₦)</label>
                    <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={`₦${Number(loanStatusData.loans[editingLoanIdx].maximumLoanAmount).toLocaleString()}`} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-medium mb-1">Minimum Loan Amount(₦)</label>
                    <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={`₦${Number(loanStatusData.loans[editingLoanIdx].minimumLoanAmount).toLocaleString()}`} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-medium mb-1">Late Fee(₦)</label>
                    <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value="30,000" readOnly />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm md:text-base font-medium mb-1">Interest Application</label>
                    <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value="Reducing Balance" readOnly />
                  </div>
                  <div className="col-span-1 md:col-span-2 mt-2 md:mt-4">
                    <button type="button" className="w-full md:w-auto bg-[#111827] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base" onClick={() => setEditingLoanIdx(null)}>Save Changes</button>
                  </div>
                </form>
              )}
            </>
          ) : null}
        </div>
      )}
      {tab === 'Profile' && (
        <div className="bg-white rounded-lg p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold mb-1">Profile Settings</h2>
          <p className="text-[#939393] text-sm md:text-base mb-4 md:mb-6">Manage your personal information</p>
          {adminProfileLoading ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : adminProfileError ? (
            <div className="text-center text-red-500 py-8">{adminProfileError}</div>
          ) : adminProfile ? (
            <>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#D6E6EF] flex items-center justify-center text-2xl md:text-3xl font-medium text-[#22223B]">
                  {adminProfile.firstName?.[0] || ''}{adminProfile.lastName?.[0] || ''}
                </div>
                <button className="w-full md:w-auto bg-[#F5F7FA] border border-[#C4C4C4] px-4 md:px-6 py-2 rounded-lg text-sm md:text-base">Upload Photo</button>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" onSubmit={handleAdminProfileSave}>
                <div>
                  <label className="block text-sm md:text-base font-medium mb-1">First Name</label>
                  <input name="firstName" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={adminProfile.firstName || ''} onChange={handleAdminProfileChange} />
                </div>
                <div>
                  <label className="block text-sm md:text-base font-medium mb-1">Last Name</label>
                  <input name="lastName" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={adminProfile.lastName || ''} onChange={handleAdminProfileChange} />
                </div>
                <div>
                  <label className="block text-sm md:text-base font-medium mb-1">Email</label>
                  <input name="email" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={adminProfile.email || ''} onChange={handleAdminProfileChange} />
                </div>
                <div>
                  <label className="block text-sm md:text-base font-medium mb-1">Phone</label>
                  <input name="phoneNumber" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={adminProfile.phoneNumber || ''} onChange={handleAdminProfileChange} />
                </div>
                <div>
                  <label className="block text-sm md:text-base font-medium mb-1">Role</label>
                  <input className="w-full p-2 border border-gray-300 rounded-lg bg-[#F5F7FA]" value={adminProfile.adminType || ''} readOnly />
                </div>
                <div className="col-span-1 md:col-span-2 mt-2 md:mt-4">
                  <button type="submit" className="w-full md:w-auto bg-[#111827] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base" disabled={adminProfileSaving}>{adminProfileSaving ? 'Saving...' : 'Save Changes'}</button>
                  {adminProfileSaveMsg && <div className={`mt-2 text-sm ${adminProfileSaveMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{adminProfileSaveMsg}</div>}
                </div>
              </form>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Settings;
