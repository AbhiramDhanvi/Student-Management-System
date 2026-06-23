import { IconUsers, IconTrend, IconAward } from './Icons.jsx';

// Get grade letter from marks
function getGrade(marks) {
  if (marks >= 90) return 'O';
  if (marks >= 75) return 'A';
  if (marks >= 60) return 'B';
  if (marks >= 50) return 'C';
  if (marks >= 35) return 'D';
  return 'F';
}

export default function StatsBar({ students }) {
  const total   = students.length;
  const avg     = total > 0 ? Math.round(students.reduce((sum, s) => sum + s.marks, 0) / total) : 0;
  const toppers = students.filter(s => s.marks >= 75).length;

  return (
    <div className="stats-bar">

      <div className="stat-card">
        <div className="stat-icon"><IconUsers /></div>
        <div className="stat-value">{total}</div>
        <div className="stat-label">Total Students</div>
        <div className="stat-sub">{total === 0 ? 'None yet' : `${total} record${total > 1 ? 's' : ''}`}</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ color: 'var(--gold)' }}><IconTrend /></div>
        <div className="stat-value">
          {avg}
          {total > 0 && (
            <span className={`grade-badge g-${getGrade(avg)}`} style={{ marginLeft: 6, fontSize: '0.6rem', verticalAlign: 'middle' }}>
              {getGrade(avg)}
            </span>
          )}
        </div>
        <div className="stat-label">Class Average</div>
        <div className="stat-sub">{total > 0 ? 'out of 100' : 'No data yet'}</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ color: 'var(--green)' }}><IconAward /></div>
        <div className="stat-value">{toppers}</div>
        <div className="stat-label">Top Performers</div>
        <div className="stat-sub">scored 75 &amp; above</div>
      </div>

    </div>
  );
}
