import { IconTrash, IconBookOpen } from './Icons.jsx';

function getGrade(marks) {
  if (marks >= 90) return { code: 'O', cls: 'grade-o' };
  if (marks >= 75) return { code: 'A', cls: 'grade-a' };
  if (marks >= 60) return { code: 'B', cls: 'grade-b' };
  if (marks >= 50) return { code: 'C', cls: 'grade-c' };
  if (marks >= 35) return { code: 'D', cls: 'grade-d' };
  return            { code: 'F', cls: 'grade-f' };
}

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export default function StudentTable({ students, allStudents, onDeleteRequest, searchTerm, onSearchChange, sortBy, onSortChange }) {
  const isFiltered = searchTerm.trim().length > 0;

  return (
    <section>

      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">Student Records</h2>
        <span className="section-count">
          {students.length} {isFiltered ? `of ${allStudents.length}` : ''} records
        </span>
      </div>

      {/* Search & Sort */}
      <div className="list-controls">
        <div className="search-input-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="search-input"
            placeholder="Search by name or roll no…"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select className="sort-select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="marks-desc">Marks: High → Low</option>
          <option value="marks-asc">Marks: Low → High</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="roll-asc">Roll No: A → Z</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Marks</th>
              <th>Grade</th>
              <th style={{ width: 56 }}></th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <div className="empty-state__icon"><IconBookOpen /></div>
                    <p className="empty-state__title">
                      {isFiltered ? 'No matches found' : 'No students enrolled yet'}
                    </p>
                    <p className="empty-state__text">
                      {isFiltered
                        ? 'Try a different search term.'
                        : 'Use the form to add your first student.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student, i) => {
                const grade = getGrade(student.marks);
                return (
                  <tr key={student.id}>
                    <td style={{ color: 'var(--color-text-light)', fontSize: '0.8rem', fontWeight: 600 }}>
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <td><span className="table-roll">{student.rollNo}</span></td>
                    <td>
                      <div className="table-name-cell">
                        <div className="table-avatar">{getInitials(student.name)}</div>
                        <span className="table-name-text">{student.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="marks-pill">
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem' }}>{student.marks}</span>
                        <div className="marks-bar">
                          <div className="marks-bar-fill" style={{ width: `${student.marks}%` }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`marks-grade ${grade.cls}`}>{grade.code}</span>
                    </td>
                    <td>
                      <button className="btn btn-icon" onClick={() => onDeleteRequest(student)} title={`Delete ${student.name}`}>
                        <IconTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
