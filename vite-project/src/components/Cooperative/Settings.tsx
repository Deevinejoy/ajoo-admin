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

const TABS = [
  { label: 'Cooperative', icon: <img src="/building.svg" alt="cooperative" className="w-5 h-5" /> },
  { label: 'Permission', icon: <img src="/Group.svg" alt="permission" className="w-5 h-5" /> },
  { label: 'Loans', icon: <img src="/loans.svg" alt="loans" className="w-5 h-5" /> },
  { label: 'Notification', icon: <img src="/notif.svg" alt="notification" className="w-5 h-5" /> },
  { label: 'Security', icon: <img src="/security.svg" alt="security" className="w-5 h-5" /> },
  { label: 'Profile', icon: <img src="/profile.svg" alt="profile" className="w-5 h-5" /> },
];

const loanSettings = [
  { name: 'Palliative Loan', interest: 5, months: 14, min: '50,000', max: '1,000,000' },
  { name: 'Palliative Loan', interest: 5, months: 14, min: '50,000', max: '1,000,000' },
  { name: 'Palliative Loan', interest: 5, months: 14, min: '50,000', max: '1,000,000' },
  { name: 'Palliative Loan', interest: 5, months: 14, min: '50,000', max: '1,000,000' },
];

const Settings: React.FC = () => {
  const [tab, setTab] = useState('Cooperative');
  const [editingLoanIdx, setEditingLoanIdx] = useState<number | null>(null);
  const [coopDetails, setCoopDetails] = useState<CooperativeDetails | null>(null);
  const [coopLoading, setCoopLoading] = useState(true);
  const [coopError, setCoopError] = useState<string | null>(null);
  const [coopSaving, setCoopSaving] = useState(false);
  const [coopSaveMsg, setCoopSaveMsg] = useState<string | null>(null);
  const cooperativeId = localStorage.getItem('cooperativeId');

  useEffect(() => {
    if (tab === 'Cooperative' && cooperativeId) {
      setCoopLoading(true);
      setCoopError(null);
      fetch(`https://ajo.nickyai.online/api/v1/cooperative/settings/info/${cooperativeId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          setCoopDetails(data.data || {});
          setCoopLoading(false);
        })
        .catch(() => {
          setCoopError('Failed to load cooperative details');
          setCoopLoading(false);
        });
    }
  }, [tab, cooperativeId]);

  const handleCoopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoopDetails((prev) => prev ? { ...prev, [name]: value } : { [name]: value });
  };

  const handleCoopSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setCoopSaving(true);
    setCoopSaveMsg(null);
    try {
      const response = await fetch(`https://ajo.nickyai.online/api/v1/cooperative/settings/info/${cooperativeId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: coopDetails?.name,
          address: coopDetails?.address,
          email: coopDetails?.email,
          phone: coopDetails?.phone,
        })
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to update details');
      }
      setCoopSaveMsg('Changes saved successfully!');
    } catch (err: any) {
      setCoopSaveMsg(err.message || 'Failed to save changes');
    } finally {
      setCoopSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-medium mb-1">Settings</h1>
      <p className="text-[#939393] text-sm md:text-base mb-4 md:mb-6">Manage cooperative preferences and configurations</p>
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
      {tab === 'Cooperative' && (
        <div className="bg-white rounded-lg p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold mb-1">Cooperative Details</h2>
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
                <input className="w-full p-2 border border-gray-300 rounded-lg bg-[#F5F7FA]" value={coopDetails.registrationNumber || ''} readOnly />
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
          {/* Admin Card */}
          <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-2 gap-2">
              <div>
                <div className="font-medium text-base md:text-lg">Admin</div>
                <div className="text-[#939393] text-xs md:text-sm">Full access to all cooperative features</div>
              </div>
              <button className="w-full md:w-auto bg-[#F5F7FA] border border-[#C4C4C4] px-4 md:px-6 py-2 rounded-lg text-sm md:text-base">Edit</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-green-600 text-lg">●</span> Approve Loans</div>
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-green-600 text-lg">●</span> Manage Settings</div>
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-green-600 text-lg">●</span> Manage Members</div>
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-green-600 text-lg">●</span> View Report</div>
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-green-600 text-lg">●</span> Delete Records</div>
            </div>
          </div>
          {/* Manager Card */}
          <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-2 gap-2">
              <div>
                <div className="font-medium text-base md:text-lg">Manager</div>
                <div className="text-[#939393] text-xs md:text-sm">Can manage day-to-day operations</div>
              </div>
              <button className="w-full md:w-auto bg-[#F5F7FA] border border-[#C4C4C4] px-4 md:px-6 py-2 rounded-lg text-sm md:text-base">Edit</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-green-600 text-lg">●</span> Review Loans</div>
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-red-500 text-lg">●</span> Manage Settings</div>
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-green-600 text-lg">●</span> Manage Members</div>
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-green-600 text-lg">●</span> View Report</div>
              <div className="flex items-center gap-2 text-sm md:text-base"><span className="text-red-500 text-lg">●</span> Delete Records</div>
            </div>
          </div>
          <button className="w-full md:w-auto bg-[#111827] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base">Add Role</button>
        </div>
      )}
      {tab === 'Loans' && (
        <div className="bg-white rounded-lg p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold mb-1">Loan Settings</h2>
          <p className="text-[#939393] text-sm md:text-base mb-4 md:mb-6">Configure loan parameters and repayment terms</p>
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
                    {loanSettings.map((loan, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">{loan.name}</td>
                        <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">{loan.interest}</td>
                        <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">{loan.months}</td>
                        <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">{loan.min}</td>
                        <td className="py-3 md:py-4 px-3 md:px-6 text-[#373737] text-xs md:text-sm">{loan.max}</td>
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
                <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={loanSettings[editingLoanIdx].name} readOnly />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Interest Rate(%)</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={loanSettings[editingLoanIdx].interest} readOnly />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Maximum Loan Amount(₦)</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={loanSettings[editingLoanIdx].max} readOnly />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">Minimum Loan Amount(₦)</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={loanSettings[editingLoanIdx].min} readOnly />
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
        </div>
      )}
      {tab === 'Profile' && (
        <div className="bg-white rounded-lg p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold mb-1">Profile Settings</h2>
          <p className="text-[#939393] text-sm md:text-base mb-4 md:mb-6">Manage your personal information</p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#D6E6EF] flex items-center justify-center text-2xl md:text-3xl font-medium text-[#22223B]">
              JD
            </div>
            <button className="w-full md:w-auto bg-[#F5F7FA] border border-[#C4C4C4] px-4 md:px-6 py-2 rounded-lg text-sm md:text-base">Upload Photo</button>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm md:text-base font-medium mb-1">First Name</label>
              <input className="w-full p-2 border border-gray-300 rounded-lg bg-[#F5F7FA]" value="John" readOnly />
            </div>
            <div>
              <label className="block text-sm md:text-base font-medium mb-1">Last Name</label>
              <input className="w-full p-2 border border-gray-300 rounded-lg bg-[#F5F7FA]" value="Doe" readOnly />
            </div>
            <div>
              <label className="block text-sm md:text-base font-medium mb-1">Email</label>
              <input className="w-full p-2 border border-gray-300 rounded-lg bg-[#F5F7FA]" value="john.doe@example.com" readOnly />
            </div>
            <div>
              <label className="block text-sm md:text-base font-medium mb-1">Phone</label>
              <input className="w-full p-2 border border-gray-300 rounded-lg bg-[#F5F7FA]" value="+234 012 345 6789" readOnly />
            </div>
            <div>
              <label className="block text-sm md:text-base font-medium mb-1">Role</label>
              <input className="w-full p-2 border border-gray-300 rounded-lg bg-[#F5F7FA]" value="Admin" readOnly />
            </div>
            <div className="col-span-1 md:col-span-2 mt-2 md:mt-4">
              <button className="w-full md:w-auto bg-[#111827] text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base">Save Changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;
