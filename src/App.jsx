import { useState, useCallback, useMemo } from 'react';
import './App.css';

import Header        from './components/Header.jsx';
import Footer        from './components/Footer.jsx';
import StatsBar      from './components/StatsBar.jsx';
import StudentForm   from './components/StudentForm.jsx';
import StudentTable  from './components/StudentTable.jsx';
import ConfirmModal  from './components/ConfirmModal.jsx';
import Toast         from './components/Toast.jsx';

/* ── Sort helper ── */
function sortStudents(list, sortBy) {
  return [...list].sort((a, b) => {
    switch (sortBy) {
      case 'marks-desc': return b.marks  - a.marks;
      case 'marks-asc':  return a.marks  - b.marks;
      case 'name-asc':   return a.name.localeCompare(b.name);
      case 'roll-asc':   return a.rollNo.localeCompare(b.rollNo);
      case 'date-asc':   return a.id - b.id;
      case 'date-desc':  
      default:           return b.id - a.id;
    }
  });
}

export default function App() {
  const [students,       setStudents]       = useState([]);
  const [toasts,         setToasts]         = useState([]);
  const [pendingDelete,  setPendingDelete]  = useState(null); // student obj
  const [searchTerm,     setSearchTerm]     = useState('');
  const [sortBy,         setSortBy]         = useState('date-desc');

  /* ── Toast helper ── */
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  /* ── Add student ── */
  const handleAddStudent = useCallback((student) => {
    setStudents(prev => [student, ...prev]);
    addToast(`${student.name} enrolled successfully!`, 'success');
  }, [addToast]);

  /* ── Request delete (opens modal) ── */
  const handleDeleteRequest = useCallback((student) => {
    setPendingDelete(student);
  }, []);

  /* ── Confirm delete ── */
  const handleDeleteConfirm = useCallback((id) => {
    const deleted = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    setPendingDelete(null);
    if (deleted) addToast(`${deleted.name}'s record removed.`, 'deleted');
  }, [students, addToast]);

  /* ── Cancel delete ── */
  const handleDeleteCancel = useCallback(() => {
    setPendingDelete(null);
  }, []);

  /* ── Filtered + sorted list ── */
  const filteredStudents = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const filtered = q
      ? students.filter(
          s =>
            s.name.toLowerCase().includes(q) ||
            s.rollNo.toLowerCase().includes(q)
        )
      : students;
    return sortStudents(filtered, sortBy);
  }, [students, searchTerm, sortBy]);

  /* ── Existing roll numbers for duplicate check ── */
  const existingRolls = useMemo(
    () => students.map(s => s.rollNo.toUpperCase()),
    [students]
  );

  return (
    <div className="app">

      {/* ── Sticky Header ── */}
      <Header studentCount={students.length} />

      {/* ── Main content ── */}
      <main id="main-content" className="main">

        {/* LEFT: Form */}
        <div className="form-column">
          <StudentForm
            onAddStudent={handleAddStudent}
            existingRolls={existingRolls}
          />
        </div>

        {/* RIGHT: Stats + Table */}
        <div className="list-column">

          <StatsBar students={students} />

          <StudentTable
            students={filteredStudents}
            allStudents={students}
            onDeleteRequest={handleDeleteRequest}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

        </div>

      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Delete confirmation modal ── */}
      <ConfirmModal
        student={pendingDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* ── Toast notifications ── */}
      <Toast toasts={toasts} onRemove={removeToast} />

    </div>
  );
}
