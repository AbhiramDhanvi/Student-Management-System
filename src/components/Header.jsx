import { IconGraduate } from './Icons.jsx';

export default function Header({ studentCount }) {
  return (
    <header className="header" role="banner">
      <div className="header__inner">

        {/* Brand */}
        <div className="header__brand">
          <div className="header__logo" aria-hidden="true">
            <IconGraduate />
          </div>
          <h1 className="header__title">
            Scholar<span>Hub</span>
          </h1>
        </div>

        {/* Live count badge */}
        <div className="header__badge" aria-live="polite" aria-label={`${studentCount} students enrolled`}>
          <span className="dot" aria-hidden="true" />
          {studentCount} {studentCount === 1 ? 'Student' : 'Students'} Enrolled
        </div>

      </div>
    </header>
  );
}
