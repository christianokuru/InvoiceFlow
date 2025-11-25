# InvoiceFlow UI Blueprint

## Overview

This document serves as a comprehensive blueprint for converting the React InvoiceFlow UI to a Nuxt.js application. The blueprint is based on the original React codebase found in `react-ui.md` and maps directly to the PRD requirements and task breakdown.

## Design System

### Color Palette

```css
/* Primary Colors */
--primary-blue: bg-blue-600
--primary-blue-hover: hover:bg-blue-700
--primary-blue-light: bg-blue-50
--primary-blue-border: border-blue-500
--primary-blue-focus: focus:ring-blue-500

/* Status Colors */
--success-green: bg-green-100 text-green-800
--success-green-bg: bg-green-500 hover:bg-green-700
--warning-yellow: bg-yellow-100 text-yellow-800
--danger-red: bg-red-100 text-red-800
--info-indigo: bg-indigo-500
--info-indigo-light: bg-indigo-100 text-indigo-800

/* Gray Scale */
--gray-50: bg-gray-50
--gray-100: bg-gray-100
--gray-200: bg-gray-200 border-gray-200
--gray-300: border-gray-300
--gray-400: text-gray-400
--gray-500: text-gray-500
--gray-600: text-gray-600
--gray-700: text-gray-700
--gray-900: text-gray-900

/* Special Colors */
--purple-action: bg-purple-500 hover:bg-purple-600
--sidebar-blue: bg-blue-600 border-blue-700
```

### Typography Scale

```css
/* Headings */
--heading-xl: text-3xl font-bold text-gray-900
--heading-lg: text-2xl font-semibold text-gray-900
--heading-md: text-lg font-medium text-gray-900
--heading-sm: text-base font-medium text-gray-900

/* Body Text */
--body-lg: text-lg text-gray-700
--body-md: text-sm text-gray-600
--body-sm: text-xs text-gray-500

/* Special Text */
--muted-text: text-sm text-gray-500
--caption-text: text-xs text-gray-500
--link-text: text-blue-600 hover:text-blue-800
```

### Spacing System

```css
--spacing-xs: p-1 px-1 py-1
--spacing-sm: p-2 px-2 py-2 m-2
--spacing-md: p-3 px-3 py-3 m-3
--spacing-lg: p-4 px-4 py-4 m-4
--spacing-xl: p-6 px-6 py-6 m-6
--spacing-2xl: p-8 px-8 py-8
```

### Border Radius

```css
--radius-sm: rounded
--radius-md: rounded-lg
--radius-full: rounded-full
```

## Component Architecture

### 1. Layout Components

#### Main Dashboard Layout
**File**: `layouts/dashboard.vue`

```vue
<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar
      :expanded="sidebarExpanded"
      @toggle="toggleSidebar"
      :activeView="activeView"
      @update:activeView="setActiveView"
    />
    <div class="flex flex-col flex-1 overflow-hidden">
      <Navbar />
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <Transition mode="out-in" name="page">
          <slot />
        </Transition>
      </main>
    </div>
  </div>
</template>
```

**Features**:
- Collapsible sidebar (64px expanded, 80px collapsed)
- Fixed header with search and user menu
- Responsive padding (p-4 on mobile, p-6 on desktop)
- Page transition animations

#### Sidebar Navigation
**File**: `components/layout/Sidebar.vue`

**Width**:
- Expanded: `w-64`
- Collapsed: `w-20`

**Branding**:
- Logo text: "InvoiceApp" (when expanded)
- Hamburger icon (when collapsed)

**Navigation Items**:
```typescript
interface NavItem {
  id: string
  label: string
  icon: string // Lucide icon component
  view: 'dashboard' | 'invoices' | 'receipts' | 'history' | 'send' | 'copy' | 'clients'
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'HomeIcon', view: 'dashboard' },
  { id: 'invoices', label: 'Invoices', icon: 'FileTextIcon', view: 'invoices' },
  { id: 'receipts', label: 'Receipts', icon: 'ReceiptIcon', view: 'receipts' },
  { id: 'history', label: 'History', icon: 'HistoryIcon', view: 'history' },
  { id: 'send', label: 'Send Documents', icon: 'MailIcon', view: 'send' },
  { id: 'copy', label: 'Copy Documents', icon: 'CopyIcon', view: 'copy' },
  { id: 'clients', label: 'Clients', icon: 'UsersIcon', view: 'clients' }
]
```

**Active State**: `bg-blue-700`
**Hover State**: `hover:bg-blue-700`

#### Top Navigation Bar
**File**: `components/layout/Navbar.vue`

**Features**:
- Global search input with icon
- Notification bell
- User avatar dropdown
- Divider line between sections

### 2. UI Component Library

#### Button Component
**File**: `components/ui/Button.vue`

```vue
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <component v-if="icon" :is="icon" :size="iconSize" class="mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: Component
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    // Variants
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': props.variant === 'primary',
    'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500': props.variant === 'secondary',
    'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500': props.variant === 'success',
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': props.variant === 'danger',
    'text-gray-700 hover:bg-gray-100 focus:ring-gray-500': props.variant === 'ghost',

    // Sizes
    'px-3 py-1.5 text-sm': props.size === 'sm',
    'px-4 py-2 text-sm': props.size === 'md',
    'px-6 py-3 text-base': props.size === 'lg',

    // States
    'opacity-50 cursor-not-allowed': props.disabled || props.loading
  }
])
</script>
```

#### Modal Component
**File**: `components/ui/Modal.vue`

```vue
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black bg-opacity-50"
          @click="closeModal"
        />

        <!-- Modal Content -->
        <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ title }}
            </h2>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XIcon size={24} />
            </button>
          </div>

          <!-- Content -->
          <div class="overflow-y-auto max-h-[calc(90vh-80px)]">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
```

**Animation Classes**:
```css
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}
```

#### Card Component
**File**: `components/ui/Card.vue`

```vue
<template>
  <div :class="cardClasses" :hoverable="hoverable">
    <div v-if="$slots.header" class="p-6 border-b border-gray-200">
      <slot name="header" />
    </div>
    <div class="p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-6 border-t border-gray-200">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  padding: 'md'
})

const cardClasses = computed(() => [
  'bg-white rounded-lg shadow',
  {
    'hover:shadow-md transition-shadow duration-200': props.hoverable,
    'p-4': props.padding === 'sm',
    'p-6': props.padding === 'md',
    'p-8': props.padding === 'lg'
  }
])
</script>
```

#### Badge Component
**File**: `components/ui/Badge.vue`

```vue
<template>
  <span :class="badgeClasses">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md'
})

const badgeClasses = computed(() => [
  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
  {
    'bg-gray-100 text-gray-800': props.variant === 'default',
    'bg-green-100 text-green-800': props.variant === 'success',
    'bg-yellow-100 text-yellow-800': props.variant === 'warning',
    'bg-red-100 text-red-800': props.variant === 'error',
    'bg-blue-100 text-blue-800': props.variant === 'info',
    'text-xs': props.size === 'sm',
    'text-sm': props.size === 'md'
  }
])
</script>
```

#### Input Component
**File**: `components/ui/Input.vue`

```vue
<template>
  <div class="space-y-1">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 flex items-center pl-3">
        <slot name="prefix" />
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
      />
      <div v-if="$slots.suffix" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <slot name="suffix" />
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-if="hint" class="text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  type?: string
  label?: string
  modelValue: string
  placeholder?: string
  disabled?: boolean
  error?: string
  hint?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false
})

defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()

const inputClasses = computed(() => [
  'block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200',
  {
    'pl-10': !!$slots.prefix,
    'pr-10': !!$slots.suffix,
    'pl-3 pr-3': !$slots.prefix && !$slots.suffix,
    'bg-gray-50 cursor-not-allowed': props.disabled
  }
])
</script>
```

### 3. Page Components

#### Dashboard Page
**File**: `pages/dashboard/index.vue`

**Layout Structure**:
```
Dashboard
├── Page Header (h1 + description)
├── Stats Grid (3 cards on desktop)
├── Bottom Section (2 column grid)
│   ├── Recent Activity
│   └── Quick Actions
```

**Stats Cards**:
- Total Revenue (with trend indicator)
- Invoices (with pending count)
- Receipts (with last created date)

**Quick Actions Grid**:
- Create Invoice (indigo)
- Generate Receipt (green)
- Send Document (blue)
- View History (purple)

#### Invoices Page
**File**: `pages/dashboard/invoices.vue`

**Key Features**:
- **Header**: Title + "Create Invoice" button
- **Filters Bar**: Search + status dropdown + filter button
- **Data Table**: Sortable columns with actions
- **Modal Form**: Create/Edit invoice with validation
- **Status Badges**: Color-coded status indicators

**Table Columns**:
1. Invoice Number
2. Client Name
3. Email Address
4. Amount
5. Status (Paid/Pending/Overdue)
6. Date Created
7. Due Date
8. Actions (Edit/Send/Download/More)

**Modal Form Fields**:
- Invoice Number (auto-generated)
- Date (auto-generated)
- Client Name (required)
- Email Address (required)
- Amount (required, with $ prefix)
- Status dropdown
- Description (required, textarea)

#### Receipts Page
**File**: `pages/dashboard/receipts.vue`

**Layout**: Card-based grid instead of table
- **3-column responsive grid** (1 col mobile, 2 col md, 3 col lg)
- **Category badges** on each card
- **Action buttons**: View + Download

**Modal Form**:
- Receipt Number (auto-generated)
- Date (auto-generated)
- Client Name + Email
- Amount + Category dropdown
- Description textarea

#### Clients Page
**File**: `pages/dashboard/clients.vue`

**Layout**: Card-based client profiles
- **2-column responsive grid**
- **Client info**: Name, status badge, contact details
- **Stats**: Total invoices + total amount
- **Action buttons**: Edit client

**Modal Form Fields**:
- Client Name (required)
- Email + Phone (required)
- Address (required)
- Status dropdown (Active/Inactive)

#### History Page
**File**: `pages/dashboard/history.vue`

**Features**:
- **Timeline layout** with vertical connectors
- **Activity filtering**: Type, date range
- **Icon coding**: Different icons per activity type
- **Activity details**: Title, description, amount, timestamp

**Activity Types**:
- Invoice Created/Updated
- Receipt Generated
- Email Sent
- Payment Received

#### Send Documents Page
**File**: `pages/dashboard/send.vue`

**Layout**: 2-column layout
- **Left column**: Document selector + email details
- **Right column**: Client selection list

**Features**:
- Document dropdown (invoice + receipt options)
- Email subject/message composition
- Multi-client selection with checkboxes
- Send button (disabled until document + clients selected)

#### Copy Documents Page
**File**: `pages/dashboard/copy.vue`

**Layout**: Document list with copy functionality
- **Document cards**: Type indicator, number, client, amount, date
- **Copy buttons**: Success state feedback
- **Visual distinction**: Invoice (indigo) vs Receipt (green)

## State Management Architecture

### Pinia Store Structure

```typescript
// stores/ui.ts
interface UIState {
  sidebarExpanded: boolean
  activeView: ViewType
  notifications: Notification[]
  loading: Record<string, boolean>
  modals: Record<string, boolean>
}

// stores/invoices.ts
interface InvoiceState {
  invoices: Invoice[]
  currentInvoice: Invoice | null
  loading: boolean
  error: string | null
  filters: InvoiceFilters
}

// stores/receipts.ts
interface ReceiptState {
  receipts: Receipt[]
  currentReceipt: Receipt | null
  loading: boolean
  error: string | null
  filters: ReceiptFilters
}

// stores/clients.ts
interface ClientState {
  clients: Client[]
  currentClient: Client | null
  loading: boolean
  error: string | null
  filters: ClientFilters
}
```

### Composables

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  // Authentication logic
}

// composables/useInvoices.ts
export const useInvoices = () => {
  // Invoice CRUD operations
}

// composables/useReceipts.ts
export const useReceipts = () => {
  // Receipt CRUD operations
}

// composables/useClients.ts
export const useClients = () => {
  // Client CRUD operations
}

// composables/useNotifications.ts
export const useNotifications = () => {
  // Notification system
}
```

## Animation System

### Page Transitions
```css
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
```

### Modal Animations
```css
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}
```

### Hover States
```css
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

## Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .sidebar {
    transform: none;
  }
}
```

## Form Validation Patterns

### Client-Side Validation
```typescript
// utils/validators.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/
  return phoneRegex.test(phone)
}

export const validateRequired = (value: any): boolean => {
  return value !== null && value !== undefined && value !== ''
}

export const validateAmount = (amount: string): boolean => {
  const amountRegex = /^\d+(\.\d{1,2})?$/
  return amountRegex.test(amount)
}
```

### Error States
```vue
<template>
  <Input
    v-model="form.email"
    :error="errors.email"
    placeholder="client@example.com"
    type="email"
    label="Email Address"
    required
  />
</template>
```

## Accessibility Considerations

### Focus Management
- Skip navigation link for screen readers
- Focus trap in modals
- Proper focus indicators on all interactive elements
- Keyboard navigation support

### ARIA Labels
```vue
<button
  aria-label="Create new invoice"
  aria-describedby="create-invoice-help"
>
  <PlusIcon size={20} />
  Create Invoice
</button>

<div id="create-invoice-help" class="sr-only">
  Creates a new invoice with auto-generated number
</div>
```

### Screen Reader Support
- Proper heading hierarchy (h1 > h2 > h3)
- Descriptive button labels
- Status announcements for form errors
- Table headers with scope attributes

## Icon System

### Lucide Icons
All icons use Lucide React icons which need to be converted to Vue equivalents:
- HomeIcon → `<HomeIcon />`
- FileTextIcon → `<FileTextIcon />`
- ReceiptIcon → `<ReceiptIcon />`
- HistoryIcon → `<HistoryIcon />`
- MailIcon → `<MailIcon />`
- CopyIcon → `<CopyIcon />`
- UsersIcon → `<UsersIcon />`
- PlusIcon → `<PlusIcon />`
- SearchIcon → `<SearchIcon />`
- FilterIcon → `<FilterIcon />`
- EditIcon → `<EditIcon />`
- XIcon → `<XIcon />`

### Icon Sizing
```vue
<HomeIcon :size="20" /> <!-- Small -->
<HomeIcon :size="24" /> <!-- Medium -->
<HomeIcon :size="32" /> <!-- Large -->
```

## Performance Optimizations

### Lazy Loading
```vue
<!-- Page-level lazy loading -->
<script setup>
const LazyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))
</script>

<!-- Route-level lazy loading -->
const routes = [
  {
    path: '/dashboard/invoices',
    component: () => import('@/pages/dashboard/invoices.vue')
  }
]
```

### Virtual Scrolling
For large data tables (500+ items):
- Implement virtual scrolling for performance
- Paginate server-side data
- Debounce search inputs

### Image Optimization
- Use next/image for optimized images
- WebP format support
- Lazy loading for below-the-fold images

## Testing Strategy

### Component Testing
- Unit tests for all UI components
- Snapshot testing for visual regression
- Accessibility testing with axe-core
- User interaction testing

### E2E Testing
- Critical user flows (create invoice, send document)
- Cross-browser testing
- Mobile responsive testing
- Performance testing (Lighthouse scores)

## Deployment Considerations

### Build Optimization
- Tree shaking for unused code
- Code splitting by route
- CSS optimization and purging
- Image optimization and CDN

### Environment Variables
```typescript
// runtime config
const runtimeConfig = useRuntimeConfig()

const config = {
  apiBaseUrl: runtimeConfig.public.apiBaseUrl,
  appVersion: runtimeConfig.public.appVersion
}
```

This blueprint provides a comprehensive guide for implementing the InvoiceFlow UI in Nuxt.js while maintaining the exact design, functionality, and user experience from the original React application.