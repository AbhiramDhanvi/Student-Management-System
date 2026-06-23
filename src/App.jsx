import { useState, useMemo } from 'react';
import './App.css';

import Header       from './components/Header.jsx';
import Footer       from './components/Footer.jsx';
import StatsBar     from './components/StatsBar.jsx';
import StudentForm  from './components/StudentForm.jsx';
import StudentTable from './components/StudentTable.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import Toast        from './components/Toast.jsx';

function sortStudents(list, sortBy) {
  return [...list].sort((a, b) => {
    if (sortBy === 'marks-desc') return b.marks - a.marks;
    if (sortBy === 'marks-asc')  return a.marks - b.marks;
    if (sortBy === 'name-asc')   return a.name.localeCompare(b.name);
    if (sortBy === 'roll-asc')   return a.rollNo.localeCompare(b.rollNo);
    if (sortBy === 'date-asc')   return a.id - b.id;
    return b.id - a.id; // date-desc (default)
  });
}

export default function App() {
  const [students,      setStudents]      = useState([]);
  const [toasts,        setToasts]        = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [searchTerm,    setSearchTerm]    = useState('');
  const [sortBy,        setSortBy]        = useState('date-desc');

  // Add toast helper
  function addToast(message, type = 'success') {
    setToasts(prev => [...prev, { id: Date.now(), message, type }]);
  }

  function removeToast(id) {
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  // Add student
  function handleAddStudent(student) {
    setStudents(prev => [student, ...prev]);
    addToast(`${student.name} enrolled successfully!`, 'success');
  }

  // Open delete modal
  function handleDeleteRequest(student) {
    setPendingDelete(student);
  }

  // Confirm delete
  function handleDeleteConfirm(id) {
    const deleted = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    setPendingDelete(null);
    if (deleted) addToast(`${deleted.name}'s record removed.`, 'deleted');
  }

  // Cancel delete
  function handleDeleteCancel() {
    setPendingDelete(null);
  }

  // Filtered + sorted list
  const filteredStudents = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const filtered = q
      ? students.filter(s => s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q))
      : students;
    return sortStudents(filtered, sortBy);
  }, [students, searchTerm, sortBy]);

  // Existing roll numbers for duplicate check
  const existingRolls = students.map(s => s.rollNo.toUpperCase());

  return (
    <div className="app">

      <Header studentCount={students.length} />

      <main className="main">

        {/* Left: Form */}
        <div>
          <StudentForm onAddStudent={handleAddStudent} existingRolls={existingRolls} />
        </div>

        {/* Right: Stats + Table */}
        <div>
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

      <Footer />

      <ConfirmModal student={pendingDelete} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />

      <Toast toasts={toasts} onRemove={removeToast} />

    </div>
  );
}
