import { IconTrash, IconSearch, IconBook } from './Icons.jsx';

function getGrade(marks) {
  if (marks >= 90) return { code: 'O', cls: 'g-O' };
  if (marks >= 75) return { code: 'A', cls: 'g-A' };
  if (marks >= 60) return { code: 'B', cls: 'g-B' };
  if (marks >= 50) return { code: 'C', cls: 'g-C' };
  if (marks >= 35) return { code: 'D', cls: 'g-D' };
  return            { code: 'F', cls: 'g-F' };
}

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}

export default function StudentTable({ students, allStudents, onDeleteRequest, searchTerm, onSearchChange, sortBy, onSortChange }) {
  const isFiltered = searchTerm.trim().length > 0;

  return (
    <section>

      {/* Section header */}
      <div className="section-header">
        <h2 className="section-title">Student Records</h2>
        <span className="section-count">
          {students.length}{isFiltered ? ` of ${allStudents.length}` : ''} records
        </span>
      </div>

      {/* Search & Sort */}
      <div className="list-controls">
        <div className="search-wrap">
          <IconSearch />
          <input
            type="search"
            className="search-input"
            placeholder="Search by name or roll no…"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
        <select className="sort-select" value={sortBy} onChange={e => onSortChange(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="marks-desc">Marks: High → Low</option>
          <option value="marks-asc">Marks: Low → High</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="roll-asc">Roll No: A → Z</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Marks</th>
              <th>Grade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty">
                    <div className="empty-icon"><IconBook /></div>
                    <h3>{isFiltered ? 'No matches found' : 'No students enrolled yet'}</h3>
                    <p>{isFiltered ? 'Try a different search term.' : 'Use the form to add your first student.'}</p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student, i) => {
                const grade = getGrade(student.marks);
                return (
                  <tr key={student.id}>
                    <td style={{ color: 'var(--light)', fontSize: '0.8rem', fontWeight: 600 }}>
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <td><span className="roll-no">{student.rollNo}</span></td>
                    <td>
                      <div className="name-cell">
                        <div className="avatar">{getInitials(student.name)}</div>
                        <span className="name-text">{student.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="marks-cell">
                        {student.marks}
                        <div className="marks-bar">
                          <div className="marks-fill" style={{ width: `${student.marks}%` }} />
                        </div>
                      </div>
                    </td>
                    <td><span className={`grade-badge ${grade.cls}`}>{grade.code}</span></td>
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
