import { IconUsersGroup, IconTrendUp, IconAward } from './Icons.jsx';

function getGrade(marks) {
  if (marks >= 90) return 'O';
  if (marks >= 75) return 'A';
  if (marks >= 60) return 'B';
  if (marks >= 50) return 'C';
  if (marks >= 35) return 'D';
  return 'F';
}

function getGradeClass(grade) {
  const map = { O: 'grade-o', A: 'grade-a', B: 'grade-b', C: 'grade-c', D: 'grade-d', F: 'grade-f' };
  return map[grade] || '';
}

export default function StatsBar({ students }) {
  const total = students.length;

  const avg = total > 0
    ? Math.round(students.reduce((sum, s) => sum + Number(s.marks), 0) / total)
    : 0;

  const toppers = students.filter(s => Number(s.marks) >= 75).length;

  const avgGrade = getGrade(avg);

  return (
    <div className="stats-bar" role="region" aria-label="Summary statistics">

      {/* Total Students */}
      <article className="stat-card">
        <div className="stat-card__icon-row" aria-hidden="true" style={{ color: 'var(--color-primary-dark)', marginBottom: 6 }}>
          <IconUsersGroup />
        </div>
        <div className="stat-card__value">{total}</div>
        <div className="stat-card__label">Total Students</div>
        <div className="stat-card__sub">{total === 0 ? 'None yet' : total === 1 ? '1 record' : `${total} records`}</div>
      </article>

      {/* Average Marks */}
      <article className="stat-card">
        <div className="stat-card__icon-row" aria-hidden="true" style={{ color: 'var(--color-cta)', marginBottom: 6 }}>
          <IconTrendUp />
        </div>
        <div className="stat-card__value">
          {total > 0 ? avg : '—'}
          {total > 0 && (
            <span
              className={`marks-grade ${getGradeClass(avgGrade)}`}
              style={{ marginLeft: 6, fontSize: '0.6rem', verticalAlign: 'middle' }}
            >
              {avgGrade}
            </span>
          )}
        </div>
        <div className="stat-card__label">Class Average</div>
        <div className="stat-card__sub">{total > 0 ? 'out of 100 marks' : 'No data yet'}</div>
      </article>

      {/* Top Performers */}
      <article className="stat-card">
        <div className="stat-card__icon-row" aria-hidden="true" style={{ color: 'var(--color-secondary)', marginBottom: 6 }}>
          <IconAward />
        </div>
        <div className="stat-card__value">{toppers}</div>
        <div className="stat-card__label">Top Performers</div>
        <div className="stat-card__sub">scored 75 &amp; above</div>
      </article>

    </div>
  );
}
