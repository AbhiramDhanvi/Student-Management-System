import { useState } from 'react';
import { IconHash, IconUser, IconStar, IconPlus, IconReset, IconAlert } from './Icons.jsx';

function getGrade(marks) {
  if (marks >= 90) return { code: 'O', label: 'Outstanding', cls: 'grade-o' };
  if (marks >= 75) return { code: 'A', label: 'Excellent',   cls: 'grade-a' };
  if (marks >= 60) return { code: 'B', label: 'Good',        cls: 'grade-b' };
  if (marks >= 50) return { code: 'C', label: 'Average',     cls: 'grade-c' };
  if (marks >= 35) return { code: 'D', label: 'Pass',        cls: 'grade-d' };
  return               { code: 'F', label: 'Fail',        cls: 'grade-f' };
}

export default function StudentForm({ onAddStudent, existingRolls }) {
  const [rollNo, setRollNo] = useState('');
  const [name, setName]     = useState('');
  const [marks, setMarks]   = useState(50);
  const [errors, setErrors] = useState({});

  const grade = getGrade(marks);

  function validate() {
    const newErrors = {};

    if (!rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required.';
    } else if (existingRolls.includes(rollNo.trim().toUpperCase())) {
      newErrors.rollNo = 'This roll number already exists.';
    }

    if (!name.trim()) {
      newErrors.name = 'Student name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onAddStudent({
      id:     Date.now(),
      rollNo: rollNo.trim().toUpperCase(),
      name:   name.trim(),
      marks:  marks,
    });

    // Reset form
    setRollNo('');
    setName('');
    setMarks(50);
    setErrors({});
  }

  function handleReset() {
    setRollNo('');
    setName('');
    setMarks(50);
    setErrors({});
  }

  return (
    <section className="card">
      <div className="card__header">
        <h2 className="card__header-title">Add New Student</h2>
        <p className="card__header-subtitle">Fill in the details below to enrol a student</p>
      </div>

      <div className="card__body">
        <form className="form" onSubmit={handleSubmit} noValidate>

          {/* Roll Number */}
          <div className="form-group">
            <label htmlFor="rollNo" className="form-label">
              Roll Number <span className="required">*</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="rollNo"
                type="text"
                className={`form-input ${errors.rollNo ? 'error' : ''}`}
                placeholder="e.g. CS2024001"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                maxLength={12}
              />
              <span className="form-input-icon"><IconHash /></span>
            </div>
            {errors.rollNo && (
              <span className="form-error"><IconAlert /> {errors.rollNo}</span>
            )}
          </div>

          {/* Student Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Student Name <span className="required">*</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
              <span className="form-input-icon"><IconUser /></span>
            </div>
            {errors.name && (
              <span className="form-error"><IconAlert /> {errors.name}</span>
            )}
          </div>

          {/* Marks Slider */}
          <div className="form-group">
            <label htmlFor="marks" className="form-label">Marks</label>

            <div className="marks-display">
              <span className="marks-value">
                {marks}<span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>/100</span>
              </span>
              <span className={`marks-grade ${grade.cls}`}>
                {grade.code} · {grade.label}
              </span>
            </div>

            <input
              id="marks"
              type="range"
              className="marks-slider"
              min="0"
              max="100"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              style={{ '--slider-pct': `${marks}%` }}
            />

            <div className="marks-labels">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
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
