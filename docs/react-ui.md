```index.tsx
import './index.css'
import React from "react";
import { render } from "react-dom";
import { App } from "./App";

render(<App />, document.getElementById("root"));

```
```App.tsx
import React from 'react'
import Layout from './components/layout/Layout'
export function App() {
  return <Layout />
}

```
```AppRouter.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";

export function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
    </BrowserRouter>
  );
}
```
```tailwind.config.js
export default {}
```
```index.css
/* URL IMPORTS (SUCH AS FONT IMPORTS) SHOULD BE KEPT ABOVE TAILWIND IMPORTS - DO NOT DELETE THIS COMMENT */

/* PLEASE NOTE: THESE TAILWIND IMPORTS SHOULD NEVER BE DELETED - DO NOT DELETE THIS COMMENT */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
/* DO NOT DELETE THESE TAILWIND IMPORTS, OTHERWISE THE STYLING WILL NOT RENDER AT ALL - DO NOT DELETE THIS COMMENT */
```
```components/layout/Layout.tsx
import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Dashboard from '../dashboard/Dashboard'
import { InvoicesView } from '../dashboard/InvoicesView'
import { ReceiptsView } from '../dashboard/ReceiptsView'
import { HistoryView } from '../dashboard/HistoryView'
import { SendDocumentsView } from '../dashboard/SendDocumentsView'
import { CopyDocumentsView } from '../dashboard/CopyDocumentsView'
import { ClientsView } from '../dashboard/ClientsView'
import { motion, AnimatePresence } from 'framer-motion'
export type ViewType =
  | 'dashboard'
  | 'invoices'
  | 'receipts'
  | 'history'
  | 'send'
  | 'copy'
  | 'clients'
const Layout: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [activeView, setActiveView] = useState<ViewType>('dashboard')
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }
  const renderView = () => {
    const views = {
      dashboard: <Dashboard />,
      invoices: <InvoicesView />,
      receipts: <ReceiptsView />,
      history: <HistoryView />,
      send: <SendDocumentsView />,
      copy: <CopyDocumentsView />,
      clients: <ClientsView />,
    }
    return views[activeView]
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        expanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
export default Layout

```
```components/layout/Navbar.tsx
import React from 'react'
import { BellIcon, SearchIcon, UserIcon } from 'lucide-react'
const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <div className="max-w-xs w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="border-l border-gray-200 h-6 mx-2"></div>
            <div className="flex items-center">
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 focus:outline-none">
                <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <UserIcon className="h-5 w-5" />
                </span>
                <span className="hidden md:block">John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar

```
```components/layout/Sidebar.tsx
import React from 'react'
import {
  HomeIcon,
  FileTextIcon,
  ReceiptIcon,
  HistoryIcon,
  MailIcon,
  CopyIcon,
  UsersIcon,
  MenuIcon,
  ChevronLeftIcon,
} from 'lucide-react'
import { ViewType } from './Layout'
interface SidebarProps {
  expanded: boolean
  toggleSidebar: () => void
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}
const Sidebar: React.FC<SidebarProps> = ({
  expanded,
  toggleSidebar,
  activeView,
  setActiveView,
}) => {
  const menuItems: Array<{
    icon: React.ReactNode
    title: string
    view: ViewType
  }> = [
    {
      icon: <HomeIcon size={20} />,
      title: 'Dashboard',
      view: 'dashboard',
    },
    {
      icon: <FileTextIcon size={20} />,
      title: 'Invoices',
      view: 'invoices',
    },
    {
      icon: <ReceiptIcon size={20} />,
      title: 'Receipts',
      view: 'receipts',
    },
    {
      icon: <HistoryIcon size={20} />,
      title: 'History',
      view: 'history',
    },
    {
      icon: <MailIcon size={20} />,
      title: 'Send Documents',
      view: 'send',
    },
    {
      icon: <CopyIcon size={20} />,
      title: 'Copy Documents',
      view: 'copy',
    },
    {
      icon: <UsersIcon size={20} />,
      title: 'Clients',
      view: 'clients',
    },
  ]
  return (
    <aside
      className={`bg-blue-600 text-white transition-all duration-300 ${expanded ? 'w-64' : 'w-20'} flex flex-col`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-blue-700">
        {expanded ? (
          <>
            <span className="text-xl font-semibold whitespace-nowrap">
              InvoiceApp
            </span>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
            >
              <ChevronLeftIcon size={20} />
            </button>
          </>
        ) : (
          <button
            onClick={toggleSidebar}
            className="p-1 mx-auto rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
          >
            <MenuIcon size={20} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveView(item.view)}
              className={`w-full flex items-center px-2 py-3 rounded-md transition-colors ${activeView === item.view ? 'bg-blue-700' : 'hover:bg-blue-700'} ${expanded ? 'justify-start' : 'justify-center'}`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {expanded && <span className="ml-3">{item.title}</span>}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
export default Sidebar

```
```components/dashboard/Dashboard.tsx
import React from 'react'
import {
  FileTextIcon,
  ReceiptIcon,
  HistoryIcon,
  MailIcon,
  TrendingUpIcon,
  DollarSignIcon,
} from 'lucide-react'
const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your invoices and receipts
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={<TrendingUpIcon className="h-6 w-6 text-blue-500" />}
          title="Total Revenue"
          value="$24,345.00"
          trend="+12.5%"
          trendUp={true}
        />
        <DashboardCard
          icon={<FileTextIcon className="h-6 w-6 text-indigo-500" />}
          title="Invoices"
          value="36"
          subtitle="8 pending"
        />
        <DashboardCard
          icon={<ReceiptIcon className="h-6 w-6 text-green-500" />}
          title="Receipts"
          value="42"
          subtitle="Last: Today"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  )
}
interface DashboardCardProps {
  icon: React.ReactNode
  title: string
  value: string
  subtitle?: string
  trend?: string
  trendUp?: boolean
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  trend,
  trendUp,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-full bg-gray-50">{icon}</div>
        {trend && (
          <span
            className={`text-sm font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}
          >
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  )
}
const RecentActivity: React.FC = () => {
  const activities = [
    {
      icon: <FileTextIcon className="h-5 w-5 text-indigo-500" />,
      title: 'Invoice #INV-2023-004 created',
      time: '2 hours ago',
      amount: '$1,250.00',
    },
    {
      icon: <MailIcon className="h-5 w-5 text-blue-500" />,
      title: 'Sent invoice to client@example.com',
      time: 'Yesterday',
      amount: '$3,500.00',
    },
    {
      icon: <ReceiptIcon className="h-5 w-5 text-green-500" />,
      title: 'Receipt #REC-2023-007 generated',
      time: '2 days ago',
      amount: '$780.00',
    },
    {
      icon: <DollarSignIcon className="h-5 w-5 text-green-500" />,
      title: 'Payment received from Client Co.',
      time: '3 days ago',
      amount: '$2,400.00',
    },
  ]
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <div key={index} className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">{activity.icon}</div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {activity.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: <FileTextIcon className="h-5 w-5 text-white" />,
      title: 'Create Invoice',
      bgColor: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
    },
    {
      icon: <ReceiptIcon className="h-5 w-5 text-white" />,
      title: 'Generate Receipt',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      icon: <MailIcon className="h-5 w-5 text-white" />,
      title: 'Send Document',
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      icon: <HistoryIcon className="h-5 w-5 text-white" />,
      title: 'View History',
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
  ]
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.bgColor} ${action.hoverColor} text-white p-4 rounded-lg flex items-center justify-between transition-colors duration-200`}
          >
            <span className="font-medium">{action.title}</span>
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
export default Dashboard

```
```components/dashboard/InvoicesView.tsx
import React, { useState } from 'react'
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  MailIcon,
  MoreVerticalIcon,
  XIcon,
  EditIcon,
  SendIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
interface Invoice {
  id: string
  number: string
  client: string
  email: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  date: string
  dueDate: string
  description: string
}
interface InvoiceFormData {
  client: string
  email: string
  amount: string
  description: string
  status: 'paid' | 'pending' | 'overdue'
}
export function InvoicesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'paid' | 'pending' | 'overdue'
  >('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      number: 'INV-2024-001',
      client: 'Acme Corp',
      email: 'contact@acme.com',
      amount: 2500,
      status: 'paid',
      date: '2024-01-15',
      dueDate: '2024-02-15',
      description: 'Website development services',
    },
    {
      id: '2',
      number: 'INV-2024-002',
      client: 'TechStart Inc',
      email: 'hello@techstart.com',
      amount: 1800,
      status: 'pending',
      date: '2024-01-20',
      dueDate: '2024-02-20',
      description: 'Mobile app design',
    },
    {
      id: '3',
      number: 'INV-2024-003',
      client: 'Global Solutions',
      email: 'info@global.com',
      amount: 3200,
      status: 'overdue',
      date: '2024-01-10',
      dueDate: '2024-02-10',
      description: 'Consulting services',
    },
    {
      id: '4',
      number: 'INV-2024-004',
      client: 'Design Studio',
      email: 'team@design.com',
      amount: 1500,
      status: 'paid',
      date: '2024-01-25',
      dueDate: '2024-02-25',
      description: 'Brand identity package',
    },
    {
      id: '5',
      number: 'INV-2024-005',
      client: 'Marketing Pro',
      email: 'contact@marketing.com',
      amount: 2100,
      status: 'pending',
      date: '2024-01-28',
      dueDate: '2024-02-28',
      description: 'SEO optimization',
    },
  ])
  const [formData, setFormData] = useState<InvoiceFormData>({
    client: '',
    email: '',
    amount: '',
    description: '',
    status: 'pending',
  })
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterStatus === 'all' || invoice.status === filterStatus
    return matchesSearch && matchesFilter
  })
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  const generateInvoiceNumber = () => {
    const maxNumber = invoices.reduce((max, inv) => {
      const num = parseInt(inv.number.split('-')[2])
      return num > max ? num : max
    }, 0)
    return `INV-2024-${String(maxNumber + 1).padStart(3, '0')}`
  }
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }
  const getDueDate = () => {
    const today = new Date()
    const dueDate = new Date(today.setMonth(today.getMonth() + 1))
    return dueDate.toISOString().split('T')[0]
  }
  const openCreateModal = () => {
    setEditingInvoice(null)
    setFormData({
      client: '',
      email: '',
      amount: '',
      description: '',
      status: 'pending',
    })
    setIsModalOpen(true)
  }
  const openEditModal = (invoice: Invoice) => {
    setEditingInvoice(invoice)
    setFormData({
      client: invoice.client,
      email: invoice.email,
      amount: invoice.amount.toString(),
      description: invoice.description,
      status: invoice.status,
    })
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingInvoice(null)
    setFormData({
      client: '',
      email: '',
      amount: '',
      description: '',
      status: 'pending',
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingInvoice) {
      // Edit existing invoice
      setInvoices(
        invoices.map((inv) =>
          inv.id === editingInvoice.id
            ? {
                ...inv,
                client: formData.client,
                email: formData.email,
                amount: parseFloat(formData.amount),
                description: formData.description,
                status: formData.status,
              }
            : inv,
        ),
      )
    } else {
      // Create new invoice
      const newInvoice: Invoice = {
        id: String(invoices.length + 1),
        number: generateInvoiceNumber(),
        client: formData.client,
        email: formData.email,
        amount: parseFloat(formData.amount),
        status: formData.status,
        date: getTodayDate(),
        dueDate: getDueDate(),
        description: formData.description,
      }
      setInvoices([...invoices, newInvoice])
    }
    closeModal()
  }
  const handleSendInvoice = (invoice: Invoice) => {
    alert(`Invoice ${invoice.number} sent to ${invoice.email}`)
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all your invoices
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon size={20} className="mr-2" />
          Create Invoice
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FilterIcon size={20} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {invoice.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}
                    >
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(invoice)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <EditIcon size={18} />
                      </button>
                      <button
                        onClick={() => handleSendInvoice(invoice)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title="Send Email"
                      >
                        <SendIcon size={18} />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Download"
                      >
                        <DownloadIcon size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVerticalIcon size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                type: 'spring',
                duration: 0.3,
              }}
              className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Auto-generated fields display */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Number
                    </label>
                    <p className="text-sm text-gray-900 font-mono">
                      {editingInvoice
                        ? editingInvoice.number
                        : generateInvoiceNumber()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <p className="text-sm text-gray-900">
                      {editingInvoice ? editingInvoice.date : getTodayDate()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          client: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter client name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            amount: e.target.value,
                          })
                        }
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as any,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter invoice description or services provided..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

```
```components/dashboard/ReceiptsView.tsx
import React, { useState } from 'react'
import {
  PlusIcon,
  SearchIcon,
  DownloadIcon,
  EyeIcon,
  EditIcon,
  XIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
interface Receipt {
  id: string
  number: string
  client: string
  email: string
  amount: number
  date: string
  category: string
  description: string
}
interface ReceiptFormData {
  client: string
  email: string
  amount: string
  category: string
  description: string
}
export function ReceiptsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReceipt, setEditingReceipt] = useState<Receipt | null>(null)
  const [receipts, setReceipts] = useState<Receipt[]>([
    {
      id: '1',
      number: 'REC-2024-001',
      client: 'Acme Corp',
      email: 'contact@acme.com',
      amount: 2500,
      date: '2024-01-15',
      category: 'Service',
      description: 'Website maintenance',
    },
    {
      id: '2',
      number: 'REC-2024-002',
      client: 'TechStart Inc',
      email: 'hello@techstart.com',
      amount: 1800,
      date: '2024-01-20',
      category: 'Product',
      description: 'Software license',
    },
    {
      id: '3',
      number: 'REC-2024-003',
      client: 'Global Solutions',
      email: 'info@global.com',
      amount: 3200,
      date: '2024-01-22',
      category: 'Consulting',
      description: 'Business consultation',
    },
    {
      id: '4',
      number: 'REC-2024-004',
      client: 'Design Studio',
      email: 'team@design.com',
      amount: 1500,
      date: '2024-01-25',
      category: 'Service',
      description: 'Design services',
    },
    {
      id: '5',
      number: 'REC-2024-005',
      client: 'Marketing Pro',
      email: 'contact@marketing.com',
      amount: 2100,
      date: '2024-01-28',
      category: 'Product',
      description: 'Marketing tools',
    },
  ])
  const [formData, setFormData] = useState<ReceiptFormData>({
    client: '',
    email: '',
    amount: '',
    category: 'Service',
    description: '',
  })
  const categories = ['Service', 'Product', 'Consulting', 'Other']
  const filteredReceipts = receipts.filter((receipt) => {
    const matchesSearch =
      receipt.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      filterCategory === 'all' || receipt.category === filterCategory
    return matchesSearch && matchesCategory
  })
  const generateReceiptNumber = () => {
    const maxNumber = receipts.reduce((max, rec) => {
      const num = parseInt(rec.number.split('-')[2])
      return num > max ? num : max
    }, 0)
    return `REC-2024-${String(maxNumber + 1).padStart(3, '0')}`
  }
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }
  const openCreateModal = () => {
    setEditingReceipt(null)
    setFormData({
      client: '',
      email: '',
      amount: '',
      category: 'Service',
      description: '',
    })
    setIsModalOpen(true)
  }
  const openEditModal = (receipt: Receipt) => {
    setEditingReceipt(receipt)
    setFormData({
      client: receipt.client,
      email: receipt.email,
      amount: receipt.amount.toString(),
      category: receipt.category,
      description: receipt.description,
    })
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingReceipt(null)
    setFormData({
      client: '',
      email: '',
      amount: '',
      category: 'Service',
      description: '',
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingReceipt) {
      setReceipts(
        receipts.map((rec) =>
          rec.id === editingReceipt.id
            ? {
                ...rec,
                client: formData.client,
                email: formData.email,
                amount: parseFloat(formData.amount),
                category: formData.category,
                description: formData.description,
              }
            : rec,
        ),
      )
    } else {
      const newReceipt: Receipt = {
        id: String(receipts.length + 1),
        number: generateReceiptNumber(),
        client: formData.client,
        email: formData.email,
        amount: parseFloat(formData.amount),
        date: getTodayDate(),
        category: formData.category,
        description: formData.description,
      }
      setReceipts([...receipts, newReceipt])
    }
    closeModal()
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Receipts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate and manage receipts
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusIcon size={20} className="mr-2" />
          Generate Receipt
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search receipts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {receipt.number}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{receipt.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {receipt.category}
                  </span>
                  <button
                    onClick={() => openEditModal(receipt)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Edit"
                  >
                    <EditIcon size={16} />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">{receipt.client}</p>
                <p className="text-xs text-gray-500">{receipt.email}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">
                  ${receipt.amount.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <EyeIcon size={16} className="mr-1" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <DownloadIcon size={16} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                type: 'spring',
                duration: 0.3,
              }}
              className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingReceipt ? 'Edit Receipt' : 'Generate New Receipt'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Receipt Number
                    </label>
                    <p className="text-sm text-gray-900 font-mono">
                      {editingReceipt
                        ? editingReceipt.number
                        : generateReceiptNumber()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <p className="text-sm text-gray-900">
                      {editingReceipt ? editingReceipt.date : getTodayDate()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          client: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter client name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            amount: e.target.value,
                          })
                        }
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter receipt description..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {editingReceipt ? 'Update Receipt' : 'Generate Receipt'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

```
```components/dashboard/HistoryView.tsx
import React, { useState } from 'react'
import {
  FileTextIcon,
  ReceiptIcon,
  MailIcon,
  DollarSignIcon,
  FilterIcon,
  CalendarIcon,
} from 'lucide-react'
interface HistoryItem {
  id: string
  type: 'invoice' | 'receipt' | 'email' | 'payment'
  title: string
  description: string
  amount?: number
  date: string
  time: string
}
export function HistoryView() {
  const [filterType, setFilterType] = useState<
    'all' | 'invoice' | 'receipt' | 'email' | 'payment'
  >('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const mockHistory: HistoryItem[] = [
    {
      id: '1',
      type: 'invoice',
      title: 'Invoice Created',
      description: 'INV-2024-005 for Marketing Pro',
      amount: 2100,
      date: '2024-01-28',
      time: '10:30 AM',
    },
    {
      id: '2',
      type: 'email',
      title: 'Email Sent',
      description: 'Invoice sent to client@techstart.com',
      date: '2024-01-27',
      time: '3:45 PM',
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      description: 'Payment from Design Studio',
      amount: 1500,
      date: '2024-01-26',
      time: '2:15 PM',
    },
    {
      id: '4',
      type: 'receipt',
      title: 'Receipt Generated',
      description: 'REC-2024-005 for Marketing Pro',
      amount: 2100,
      date: '2024-01-25',
      time: '11:20 AM',
    },
    {
      id: '5',
      type: 'invoice',
      title: 'Invoice Updated',
      description: 'INV-2024-003 status changed to overdue',
      date: '2024-01-24',
      time: '9:00 AM',
    },
    {
      id: '6',
      type: 'email',
      title: 'Email Sent',
      description: 'Receipt sent to multiple clients',
      date: '2024-01-23',
      time: '4:30 PM',
    },
    {
      id: '7',
      type: 'payment',
      title: 'Payment Received',
      description: 'Payment from Acme Corp',
      amount: 2500,
      date: '2024-01-22',
      time: '1:45 PM',
    },
    {
      id: '8',
      type: 'receipt',
      title: 'Receipt Generated',
      description: 'REC-2024-004 for Design Studio',
      amount: 1500,
      date: '2024-01-20',
      time: '10:00 AM',
    },
    {
      id: '9',
      type: 'invoice',
      title: 'Invoice Created',
      description: 'INV-2024-002 for TechStart Inc',
      amount: 1800,
      date: '2024-01-18',
      time: '2:30 PM',
    },
  ]
  const filteredHistory = mockHistory.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType
    let matchesDate = true
    if (dateFrom || dateTo) {
      const itemDate = new Date(item.date)
      if (dateFrom) {
        const fromDate = new Date(dateFrom)
        matchesDate = matchesDate && itemDate >= fromDate
      }
      if (dateTo) {
        const toDate = new Date(dateTo)
        matchesDate = matchesDate && itemDate <= toDate
      }
    }
    return matchesType && matchesDate
  })
  const getIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <FileTextIcon className="h-5 w-5 text-indigo-500" />
      case 'receipt':
        return <ReceiptIcon className="h-5 w-5 text-green-500" />
      case 'email':
        return <MailIcon className="h-5 w-5 text-blue-500" />
      case 'payment':
        return <DollarSignIcon className="h-5 w-5 text-green-600" />
      default:
        return null
    }
  }
  const clearFilters = () => {
    setFilterType('all')
    setDateFrom('')
    setDateTo('')
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">History</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track all your activities and transactions
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FilterIcon size={20} className="text-gray-400" />
          <h3 className="text-sm font-medium text-gray-700">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Activities</option>
              <option value="invoice">Invoices</option>
              <option value="receipt">Receipts</option>
              <option value="email">Emails</option>
              <option value="payment">Payments</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <div className="relative">
              <CalendarIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <div className="relative">
              <CalendarIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {(filterType !== 'all' || dateFrom || dateTo) && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredHistory.length} of {mockHistory.length} activities
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {filteredHistory.map((item, index) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {index !== filteredHistory.length - 1 && (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span>
                    )}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center ring-8 ring-white">
                          {getIcon(item.type)}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                          {item.amount && (
                            <p className="text-sm font-semibold text-gray-900">
                              ${item.amount.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          {item.date} at {item.time}
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
  )
}

```
```components/dashboard/SendDocumentsView.tsx
import React, { useState } from 'react'
import { SendIcon } from 'lucide-react'
export function SendDocumentsView() {
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [selectedDocument, setSelectedDocument] = useState('')
  const mockClients = [
    {
      id: '1',
      name: 'Acme Corp',
      email: 'contact@acme.com',
    },
    {
      id: '2',
      name: 'TechStart Inc',
      email: 'hello@techstart.com',
    },
    {
      id: '3',
      name: 'Global Solutions',
      email: 'info@global.com',
    },
    {
      id: '4',
      name: 'Design Studio',
      email: 'team@design.com',
    },
    {
      id: '5',
      name: 'Marketing Pro',
      email: 'contact@marketing.com',
    },
  ]
  const mockDocuments = [
    {
      id: '1',
      type: 'Invoice',
      number: 'INV-2024-001',
      client: 'Acme Corp',
    },
    {
      id: '2',
      type: 'Invoice',
      number: 'INV-2024-002',
      client: 'TechStart Inc',
    },
    {
      id: '3',
      type: 'Receipt',
      number: 'REC-2024-001',
      client: 'Global Solutions',
    },
    {
      id: '4',
      type: 'Invoice',
      number: 'INV-2024-003',
      client: 'Design Studio',
    },
  ]
  const toggleClient = (clientId: string) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId],
    )
  }
  const handleSend = () => {
    alert(`Sending ${selectedDocument} to ${selectedClients.length} client(s)`)
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Send Documents</h1>
        <p className="mt-1 text-sm text-gray-500">
          Email invoices and receipts to clients
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Document
            </h3>
            <select
              value={selectedDocument}
              onChange={(e) => setSelectedDocument(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a document...</option>
              {mockDocuments.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.type} {doc.number} - {doc.client}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Email Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Invoice for services rendered"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Dear client, please find attached..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Recipients
            </h3>
            <div className="space-y-2">
              {mockClients.map((client) => (
                <label
                  key={client.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={() => toggleClient(client.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {client.name}
                    </p>
                    <p className="text-xs text-gray-500">{client.email}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {selectedClients.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-blue-900">
                  {selectedClients.length} recipient(s) selected
                </p>
              </div>
              <button
                onClick={handleSend}
                disabled={!selectedDocument}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <SendIcon size={20} className="mr-2" />
                Send Email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

```
```components/dashboard/CopyDocumentsView.tsx
import React, { useState } from 'react'
import { CopyIcon, CheckIcon, FileTextIcon, ReceiptIcon } from 'lucide-react'
export function CopyDocumentsView() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const mockDocuments = [
    {
      id: '1',
      type: 'invoice',
      number: 'INV-2024-001',
      client: 'Acme Corp',
      amount: 2500,
      date: '2024-01-15',
    },
    {
      id: '2',
      type: 'invoice',
      number: 'INV-2024-002',
      client: 'TechStart Inc',
      amount: 1800,
      date: '2024-01-20',
    },
    {
      id: '3',
      type: 'receipt',
      number: 'REC-2024-001',
      client: 'Global Solutions',
      amount: 3200,
      date: '2024-01-22',
    },
    {
      id: '4',
      type: 'invoice',
      number: 'INV-2024-003',
      client: 'Design Studio',
      amount: 1500,
      date: '2024-01-25',
    },
    {
      id: '5',
      type: 'receipt',
      number: 'REC-2024-002',
      client: 'Marketing Pro',
      amount: 2100,
      date: '2024-01-28',
    },
  ]
  const handleCopy = (id: string) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Copy Documents</h1>
        <p className="mt-1 text-sm text-gray-500">
          Duplicate existing invoices and receipts
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Select a document to create a copy. The copy will have a new number
            and today's date.
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${doc.type === 'invoice' ? 'bg-indigo-100' : 'bg-green-100'}`}
                  >
                    {doc.type === 'invoice' ? (
                      <FileTextIcon className="h-6 w-6 text-indigo-600" />
                    ) : (
                      <ReceiptIcon className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {doc.number}
                    </p>
                    <p className="text-sm text-gray-500">{doc.client}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      ${doc.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{doc.date}</p>
                  </div>

                  <button
                    onClick={() => handleCopy(doc.id)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all ${copiedId === doc.id ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    {copiedId === doc.id ? (
                      <>
                        <CheckIcon size={18} className="mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <CopyIcon size={18} className="mr-2" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

```
```components/dashboard/ClientsView.tsx
import React, { useState } from 'react'
import {
  PlusIcon,
  SearchIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  MoreVerticalIcon,
  EditIcon,
  XIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
interface Client {
  id: string
  name: string
  email: string
  phone: string
  location: string
  totalInvoices: number
  totalAmount: number
  status: 'active' | 'inactive'
}
interface ClientFormData {
  name: string
  email: string
  phone: string
  location: string
  status: 'active' | 'inactive'
}
export function ClientsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'inactive'
  >('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      totalInvoices: 12,
      totalAmount: 28500,
      status: 'active',
    },
    {
      id: '2',
      name: 'TechStart Inc',
      email: 'hello@techstart.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      totalInvoices: 8,
      totalAmount: 15200,
      status: 'active',
    },
    {
      id: '3',
      name: 'Global Solutions',
      email: 'info@global.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      totalInvoices: 15,
      totalAmount: 42000,
      status: 'active',
    },
    {
      id: '4',
      name: 'Design Studio',
      email: 'team@design.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      totalInvoices: 6,
      totalAmount: 9800,
      status: 'inactive',
    },
    {
      id: '5',
      name: 'Marketing Pro',
      email: 'contact@marketing.com',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA',
      totalInvoices: 10,
      totalAmount: 22100,
      status: 'active',
    },
  ])
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'active',
  })
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === 'all' || client.status === filterStatus
    return matchesSearch && matchesStatus
  })
  const openCreateModal = () => {
    setEditingClient(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'active',
    })
    setIsModalOpen(true)
  }
  const openEditModal = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      location: client.location,
      status: client.status,
    })
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingClient(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'active',
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingClient) {
      setClients(
        clients.map((client) =>
          client.id === editingClient.id
            ? {
                ...client,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                status: formData.status,
              }
            : client,
        ),
      )
    } else {
      const newClient: Client = {
        id: String(clients.length + 1),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        status: formData.status,
        totalInvoices: 0,
        totalAmount: 0,
      }
      setClients([...clients, newClient])
    }
    closeModal()
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your client relationships
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon size={20} className="mr-2" />
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {client.name}
                  </h3>
                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {client.status.charAt(0).toUpperCase() +
                      client.status.slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => openEditModal(client)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Edit Client"
                >
                  <EditIcon size={20} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MailIcon size={16} className="mr-2 text-gray-400" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneIcon size={16} className="mr-2 text-gray-400" />
                  {client.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon size={16} className="mr-2 text-gray-400" />
                  {client.location}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Invoices</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {client.totalInvoices}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${client.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                type: 'spring',
                duration: 0.3,
              }}
              className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingClient ? 'Edit Client' : 'Add New Client'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter client name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="client@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {editingClient && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Note:</strong> Total Invoices and Total Amount are
                      calculated automatically from backend data and cannot be
                      edited manually.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Total Invoices</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {editingClient.totalInvoices}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Amount</p>
                        <p className="text-lg font-semibold text-gray-900">
                          ${editingClient.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingClient ? 'Update Client' : 'Add Client'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

```