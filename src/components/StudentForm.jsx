import { useState } from 'react';
import { IconHash, IconUser, IconPlus, IconReset, IconAlert } from './Icons.jsx';

function getGrade(marks) {
  if (marks >= 90) return { code: 'O', label: 'Outstanding', cls: 'g-O' };
  if (marks >= 75) return { code: 'A', label: 'Excellent',   cls: 'g-A' };
  if (marks >= 60) return { code: 'B', label: 'Good',        cls: 'g-B' };
  if (marks >= 50) return { code: 'C', label: 'Average',     cls: 'g-C' };
  if (marks >= 35) return { code: 'D', label: 'Pass',        cls: 'g-D' };
  return               { code: 'F', label: 'Fail',        cls: 'g-F' };
}

export default function StudentForm({ onAddStudent, existingRolls }) {
  const [rollNo, setRollNo] = useState('');
  const [name,   setName]   = useState('');
  const [marks,  setMarks]  = useState(50);
  const [errors, setErrors] = useState({});

  const grade = getGrade(marks);

  function validate() {
    const err = {};
    if (!rollNo.trim())
      err.rollNo = 'Roll number is required.';
    else if (existingRolls.includes(rollNo.trim().toUpperCase()))
      err.rollNo = 'This roll number already exists.';

    if (!name.trim())
      err.name = 'Student name is required.';
    else if (name.trim().length < 2)
      err.name = 'Name must be at least 2 characters.';

    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    onAddStudent({
      id:     Date.now(),
      rollNo: rollNo.trim().toUpperCase(),
      name:   name.trim(),
      marks:  marks,
    });

    setRollNo(''); setName(''); setMarks(50); setErrors({});
  }

  function handleReset() {
    setRollNo(''); setName(''); setMarks(50); setErrors({});
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Add New Student</h2>
        <p>Fill in the details below to enrol a student</p>
      </div>

      <div className="card-body">
        <form className="form" onSubmit={handleSubmit} noValidate>

          {/* Roll Number */}
          <div className="form-group">
            <label htmlFor="rollNo" className="form-label">
              Roll Number <span className="req">*</span>
            </label>
            <div className="input-wrap">
              <input
                id="rollNo"
                type="text"
                className={`form-input ${errors.rollNo ? 'has-error' : ''}`}
                placeholder="e.g. CS2024001"
                value={rollNo}
                onChange={e => setRollNo(e.target.value)}
                maxLength={12}
              />
              <span className="input-icon"><IconHash /></span>
            </div>
            {errors.rollNo
              ? <span className="form-error"><IconAlert /> {errors.rollNo}</span>
              : <span className="form-hint">2–12 alphanumeric characters</span>
            }
          </div>

          {/* Student Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Student Name <span className="req">*</span>
            </label>
            <div className="input-wrap">
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? 'has-error' : ''}`}
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={50}
              />
              <span className="input-icon"><IconUser /></span>
            </div>
            {errors.name
              ? <span className="form-error"><IconAlert /> {errors.name}</span>
              : <span className="form-hint">Full name, letters only</span>
            }
          </div>

          {/* Marks Slider */}
          <div className="form-group">
            <label htmlFor="marks" className="form-label">Marks</label>

            <div className="marks-display">
              <span className="marks-number">
                {marks}<small>/100</small>
              </span>
              <span className={`grade-badge ${grade.cls}`}>
                {grade.code} · {grade.label}
              </span>
            </div>

            <input
              id="marks"
              type="range"
              className="marks-slider"
              min="0" max="100" value={marks}
              onChange={e => setMarks(Number(e.target.value))}
              style={{ '--pct': `${marks}%` }}
            />

            <div className="marks-labels">
              <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
            </div>
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-primary">
            <IconPlus /> Enrol Student
          </button>
          <button type="button" className="btn btn-ghost" onClick={handleReset}>
            <IconReset /> Reset Form
          </button>

        </form>
      </div>
    </section>
  );
}
