import { IconGraduate } from './Icons.jsx';

export default function Header({ studentCount }) {
  return (
    <header className="header">
      <div className="header-inner">

        <div className="header-brand">
          <div className="header-logo">
            <IconGraduate />
          </div>
          <h1 className="header-title">Scholar<span>Hub</span></h1>
        </div>

        <div className="header-badge">
          <span className="badge-dot" />
          {studentCount} {studentCount === 1 ? 'Student' : 'Students'} Enrolled
        </div>

      </div>
    </header>
  );
}
