function ActivitySummary({ activity }) {
  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary">Activity Level</p>
          <h3 className="mt-1 text-2xl font-bold text-primary">
            {activity.activity_level}
          </h3>
        </div>

        <div className="rounded-xl bg-accent/10 px-4 py-2">
          <p className="text-xs text-secondary">Maintenance</p>
          <p className="text-lg font-semibold text-primary">
            {activity.maintenance_consistency}%
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-secondary">Total Repositories</p>
          <p className="mt-1 text-2xl font-bold">
            {activity.total_repositories}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-secondary">Active</p>
          <p className="mt-1 text-2xl font-bold text-green-400">
            {activity.active_repositories}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-secondary">Inactive</p>
          <p className="mt-1 text-2xl font-bold text-red-400">
            {activity.inactive_repositories}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-secondary">Last Activity</p>
          <p className="mt-1 text-2xl font-bold">
            {activity.last_activity_days_ago} days
          </p>
        </div>
      </div>

      {/* AI Summary */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-medium text-primary">Summary</p>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          {activity.summary}
        </p>
      </div>
    </div>
  );
}

export default ActivitySummary;