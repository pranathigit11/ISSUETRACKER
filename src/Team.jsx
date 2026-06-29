import { useState } from "react";
import "./Team.css";

const initialMembers = [
  { id: 1, name: "Alex Johnson", role: "Product Manager", email: "alex@example.com", initials: "AJ", color: "#4F6EF7", assigned: 2, completed: 10 },
  { id: 2, name: "Sarah Chen", role: "Senior Developer", email: "sarah@example.com", initials: "SC", color: "#7C3AED", assigned: 3, completed: 15 },
  { id: 3, name: "Mike Davis", role: "UI/UX Designer", email: "mike@example.com", initials: "MD", color: "#059669", assigned: 1, completed: 8 },
  { id: 4, name: "Emma Wilson", role: "Backend Developer", email: "emma@example.com", initials: "EW", color: "#D97706", assigned: 4, completed: 12 },
];

const ROLES = ["Product Manager", "Senior Developer", "UI/UX Designer", "Backend Developer", "QA Engineer", "DevOps Engineer"];

export default function Team() {
  const [members, setMembers] = useState(initialMembers);
  const [showModal, setShowModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", role: "", email: "" });
  const [errors, setErrors] = useState({});

  const avatarColors = ["#4F6EF7", "#7C3AED", "#059669", "#D97706", "#DC2626", "#0891B2"];

  function validate() {
    const e = {};
    if (!newMember.name.trim()) e.name = "Name is required";
    if (!newMember.role) e.role = "Role is required";
    if (!newMember.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(newMember.email)) e.email = "Enter a valid email";
    return e;
  }

  function handleAdd() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const initials = newMember.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    const color = avatarColors[members.length % avatarColors.length];
    setMembers(prev => [...prev, { id: Date.now(), ...newMember, initials, color, assigned: 0, completed: 0 }]);
    setShowModal(false);
    setNewMember({ name: "", role: "", email: "" });
    setErrors({});
  }

  function handleRemove(id) {
    setMembers(prev => prev.filter(m => m.id !== id));
    setOpenDropdown(null);
  }

  function toggleDropdown(id, e) {
    e.stopPropagation();
    setOpenDropdown(prev => (prev === id ? null : id));
  }

  return (
    <main className="team-content" onClick={() => setOpenDropdown(null)}>
      <div className="team-header">
        <div>
          <h1 className="team-title">Team Members</h1>
          <p className="team-sub">{members.length} members in your team</p>
        </div>
        <button className="add-member-btn" onClick={() => setShowModal(true)}>+ Add Member</button>
      </div>

      <div className="members-grid">
        {members.map(member => (
          <div className="member-card" key={member.id}>
            <div className="member-card-top">
              <div className="member-avatar" style={{ background: member.color }}>{member.initials}</div>
              <div className="member-info">
                <span className="member-name">{member.name}</span>
                <span className="member-role">{member.role}</span>
                <span className="member-email">✉ {member.email}</span>
              </div>
              <div className="dropdown-wrap">
                <button className="dots-btn" onClick={e => toggleDropdown(member.id, e)}>⋮</button>
                {openDropdown === member.id && (
                  <div className="dropdown-menu" onClick={e => e.stopPropagation()}>
                    <button className="dropdown-item">Edit Member</button>
                    <button className="dropdown-item dropdown-danger" onClick={() => handleRemove(member.id)}>Remove</button>
                  </div>
                )}
              </div>
            </div>
            <div className="member-divider" />
            <div className="member-stats">
              <div className="stat-item">
                <span className="stat-icon gray">○</span>
                <div>
                  <div className="stat-label">Assigned</div>
                  <div className="stat-value">{member.assigned}</div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon green">✓</span>
                <div>
                  <div className="stat-label">Completed</div>
                  <div className="stat-value green">{member.completed}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Team Member</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-fields">
              <label>Full Name</label>
              <input
                className={`modal-input ${errors.name ? "input-error" : ""}`}
                placeholder="e.g. John Smith"
                value={newMember.name}
                onChange={e => setNewMember(p => ({ ...p, name: e.target.value }))}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}

              <label>Role</label>
              <select
                className={`modal-input ${errors.role ? "input-error" : ""}`}
                value={newMember.role}
                onChange={e => setNewMember(p => ({ ...p, role: e.target.value }))}
              >
                <option value="">Select a role...</option>
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
              {errors.role && <span className="error-msg">{errors.role}</span>}

              <label>Email</label>
              <input
                className={`modal-input ${errors.email ? "input-error" : ""}`}
                placeholder="e.g. john@example.com"
                value={newMember.email}
                onChange={e => setNewMember(p => ({ ...p, email: e.target.value }))}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
            <div className="modal-actions">
              <button className="add-member-btn modal-create-btn" onClick={handleAdd}>Add Member</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}