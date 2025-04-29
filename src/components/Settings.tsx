import React from 'react';
import { Settings as SettingsIcon, MapPin, Building2, MapPinned, ChefHat, MoreVertical, Pencil, Trash2 } from 'lucide-react';

const accommodationsData = [
  {
    name: 'Ibn Umar',
    city: 'Makkah',
    state: 'FCT',
    capacity: '500',
    status: 'Active'
  },
  {
    name: 'Al Safwah Royale Orchid',
    city: 'Makkah',
    state: 'Lagos',
    capacity: '750',
    status: 'Active'
  },
  {
    name: 'Anjum Hotel',
    city: 'Makkah',
    state: 'Kano',
    capacity: '600',
    status: 'Active'
  },
  {
    name: 'Le Meridien',
    city: 'Madinah',
    state: 'FCT',
    capacity: '450',
    status: 'Active'
  },
  {
    name: 'Mina Al Waha',
    city: 'Mina',
    state: 'Kaduna',
    capacity: '800',
    status: 'Active'
  },
  {
    name: 'Mina Azure',
    city: 'Mina',
    state: 'Kano',
    capacity: '600',
    status: 'Active'
  },
  {
    name: 'Jabal Arfah Towers',
    city: 'Arfah',
    state: 'Lagos',
    capacity: '550',
    status: 'Active'
  },
  {
    name: 'Arfah Heights',
    city: 'Arfah',
    state: 'FCT',
    capacity: '700',
    status: 'Active'
  }
];

const statesData = [
  {
    stateName: 'FCT',
    status: 'Active'
  },
  {
    stateName: 'Abia',
    status: 'Active'
  },
  {
    stateName: 'Adamawa',
    status: 'Active'
  },
  {
    stateName: 'Akwa Ibom',
    status: 'Active'
  },
  {
    stateName: 'Anambra',
    status: 'Active'
  },
  {
    stateName: 'Bauchi',
    status: 'Active'
  },
  {
    stateName: 'Bayelsa',
    status: 'Active'
  },
  {
    stateName: 'Benue',
    status: 'Active'
  },
  {
    stateName: 'Borno',
    status: 'Active'
  },
  {
    stateName: 'Cross River',
    status: 'Active'
  },
  {
    stateName: 'Delta',
    status: 'Active'
  },
  {
    stateName: 'Ebonyi',
    status: 'Active'
  },
  {
    stateName: 'Edo',
    status: 'Active'
  },
  {
    stateName: 'Ekiti',
    status: 'Active'
  },
  {
    stateName: 'Enugu',
    status: 'Active'
  },
  {
    stateName: 'Gombe',
    status: 'Active'
  },
  {
    stateName: 'Imo',
    status: 'Active'
  },
  {
    stateName: 'Jigawa',
    status: 'Active'
  },
  {
    stateName: 'Kaduna',
    status: 'Active'
  },
  {
    stateName: 'Kano',
    status: 'Active'
  },
  {
    stateName: 'Katsina',
    status: 'Active'
  },
  {
    stateName: 'Kebbi',
    status: 'Active'
  },
  {
    stateName: 'Kogi',
    status: 'Active'
  },
  {
    stateName: 'Kwara',
    status: 'Active'
  },
  {
    stateName: 'Lagos',
    status: 'Active'
  },
  {
    stateName: 'Nasarawa',
    status: 'Active'
  },
  {
    stateName: 'Niger',
    status: 'Active'
  },
  {
    stateName: 'Ogun',
    status: 'Active'
  },
  {
    stateName: 'Ondo',
    status: 'Active'
  },
  {
    stateName: 'Osun',
    status: 'Active'
  },
  {
    stateName: 'Oyo',
    status: 'Active'
  },
  {
    stateName: 'Plateau',
    status: 'Active'
  },
  {
    stateName: 'Rivers',
    status: 'Active'
  },
  {
    stateName: 'Sokoto',
    status: 'Active'
  },
  {
    stateName: 'Taraba',
    status: 'Active'
  },
  {
    stateName: 'Yobe',
    status: 'Active'
  },
  {
    stateName: 'Zamfara',
    status: 'Active'
  }
];

const kitchensData = [
  {
    name: 'Ava Kitchen',
    state: 'FCT',
    capacity: '1000',
    status: 'Active',
  },
  {
    name: 'Royal Kitchen',
    state: 'Lagos',
    capacity: '1500',
    status: 'Active',
  },
  {
    name: 'Al-Safa Catering',
    state: 'Kano',
    capacity: '1200',
    status: 'Active',
  },
  {
    name: 'Madina Foods',
    state: 'FCT',
    capacity: '800',
    status: 'Active',
  }
];

interface TableAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface TableProps {
  columns: { key: string; header: string }[];
  data: Record<string, any>[];
  actions?: TableAction[];
}

function Table({ columns, data, actions }: TableProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
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
            {actions && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row[column.key]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={action.onClick}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Settings() {
  const commonActions = [
    {
      label: 'Edit',
      icon: <Pencil className="w-4 h-4" />,
      onClick: () => console.log('Edit clicked'),
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: () => console.log('Delete clicked'),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Accommodations</h2>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <MapPin className="w-4 h-4 mr-2" />
            Add Accommodation
          </button>
        </div>

        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'city', header: 'City' },
            { key: 'state', header: 'State' },
            { key: 'capacity', header: 'Capacity' },
            { key: 'status', header: 'Status' },
          ]}
          data={accommodationsData}
          actions={commonActions}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPinned className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">States</h2>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <MapPin className="w-4 h-4 mr-2" />
            Add State
          </button>
        </div>

        <Table
          columns={[
            { key: 'stateName', header: 'State Name' },
            { key: 'status', header: 'Status' },
          ]}
          data={statesData}
          actions={commonActions}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Kitchens</h2>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <MapPin className="w-4 h-4 mr-2" />
            Add Kitchen
          </button>
        </div>

        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'state', header: 'State' },
            { key: 'capacity', header: 'Capacity' },
            { key: 'status', header: 'Status' },
          ]}
          data={kitchensData}
          actions={commonActions}
        />
      </div>
    </div>
  );
}