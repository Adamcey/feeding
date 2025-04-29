import React from 'react';
import { BarChart3, TrendingUp, Users, Utensils, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Mock data for the reports
const reportData = {
  totalAssessments: 245,
  pendingReviews: 28,
  approvalRate: 85,
  mealDistribution: {
    breakfast: 82,
    lunch: 84,
    dinner: 79
  },
  statePerformance: [
    { state: 'FCT', assessments: 45, approvalRate: 92 },
    { state: 'Lagos', assessments: 38, approvalRate: 88 },
    { state: 'Kano', assessments: 35, approvalRate: 85 },
    { state: 'Rivers', assessments: 32, approvalRate: 84 },
    { state: 'Kaduna', assessments: 30, approvalRate: 82 }
  ],
  kitchenPerformance: [
    { name: 'Ava Kitchen', assessments: 42, rating: 4.8 },
    { name: 'Royal Kitchen', assessments: 38, rating: 4.6 },
    { name: 'Al-Safa Catering', assessments: 35, rating: 4.5 },
    { name: 'Madina Foods', assessments: 32, rating: 4.4 },
    { name: 'Barakah Kitchen', assessments: 30, rating: 4.3 }
  ],
  recentAssessments: [
    { id: 1, state: 'FCT', kitchen: 'Ava Kitchen', status: 'Approved', time: '2 hours ago' },
    { id: 2, state: 'Lagos', kitchen: 'Royal Kitchen', status: 'Pending', time: '3 hours ago' },
    { id: 3, state: 'Kano', kitchen: 'Al-Safa Catering', status: 'Rejected', time: '4 hours ago' },
    { id: 4, state: 'Rivers', kitchen: 'Madina Foods', status: 'Approved', time: '5 hours ago' }
  ]
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendValue?: string;
}

function StatCard({ title, value, icon, trend, trendValue }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-green-50 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface TableProps {
  title: string;
  data: any[];
  columns: { key: string; header: string }[];
}

function Table({ title, data, columns }: TableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.key === 'status' ? (
                      <StatusBadge status={row[column.key]} />
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      <span className="ml-1">{status}</span>
    </span>
  );
}

export default function Reports() {
  const { user } = useAuth();
  const isStateRep = user?.role === 'State Representative';
  const isKitchenRep = user?.role === 'Kitchen Representative';

  // Filter data based on user role
  const filteredStatePerformance = isStateRep
    ? reportData.statePerformance.filter(state => state.state === user?.state)
    : reportData.statePerformance;

  const filteredKitchenPerformance = isKitchenRep
    ? reportData.kitchenPerformance.filter(kitchen => kitchen.name === user?.kitchen)
    : reportData.kitchenPerformance;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <BarChart3 className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Assessments"
          value={reportData.totalAssessments}
          icon={<Utensils className="w-6 h-6 text-green-600" />}
          trend="up"
          trendValue="+12% from last month"
        />
        <StatCard
          title="Pending Reviews"
          value={reportData.pendingReviews}
          icon={<Clock className="w-6 h-6 text-green-600" />}
        />
        <StatCard
          title="Approval Rate"
          value={`${reportData.approvalRate}%`}
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          trend="up"
          trendValue="+5% from last month"
        />
        <StatCard
          title="Active States"
          value="37"
          icon={<Users className="w-6 h-6 text-green-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Table
          title="Top Performing States"
          data={filteredStatePerformance}
          columns={[
            { key: 'state', header: 'State' },
            { key: 'assessments', header: 'Assessments' },
            { key: 'approvalRate', header: 'Approval Rate' }
          ]}
        />
        <Table
          title="Kitchen Performance"
          data={filteredKitchenPerformance}
          columns={[
            { key: 'name', header: 'Kitchen' },
            { key: 'assessments', header: 'Assessments' },
            { key: 'rating', header: 'Rating' }
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Assessments</h3>
        </div>
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {reportData.recentAssessments.map((assessment, index) => (
                <li key={assessment.id}>
                  <div className="relative pb-8">
                    {index !== reportData.recentAssessments.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          assessment.status === 'Approved' ? 'bg-green-500' :
                          assessment.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}>
                          {assessment.status === 'Approved' ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : assessment.status === 'Rejected' ? (
                            <XCircle className="w-5 h-5 text-white" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-white" />
                          )}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Assessment from <span className="font-medium text-gray-900">{assessment.state}</span>
                            {' '}by{' '}
                            <span className="font-medium text-gray-900">{assessment.kitchen}</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{assessment.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}