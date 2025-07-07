# 🚛 Logistics Analytics - Data Explorer

A React TypeScript application for exploring logistics data through guided insights and interactive dashboards. This is a **mock/conceptual** application designed to demonstrate data exploration patterns for logistics and transportation companies.

## 🎯 Features

### Core Functionality
- **📤 Data Upload**: Drag-and-drop interface for uploading CSV, XLSX, JSON, SQL dumps, and ZIP files
- **⏳ Simulated Analysis**: Animated loading screen with realistic data processing messages
- **📊 Interactive Dashboard**: 4 main insight cards dynamically generated based on data context
- **🔍 Guided Exploration**: 4×4×4 exploration pattern allowing deep dives into specific insights
- **🧭 Smart Navigation**: Breadcrumb navigation and backtracking through exploration paths

### Logistics-Specific Insights
- **📦 Order Analysis**: Frequency, categories, size distribution, customer segments
- **⏰ Delivery Performance**: Delays by region, shipment type, warehouse performance
- **💸 Cost Optimization**: Shipping costs, fuel impact, vehicle efficiency, loading optimization
- **🛣️ Route Intelligence**: Efficiency metrics, traffic patterns, cross-border logistics

## 🏗️ Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Material-UI v5** with sx prop styling
- **React Router v6** for navigation
- **TanStack Query v4** for data management
- **Preact Signals** for global state management
- **i18next** for internationalization (Polish/English)
- **Vitest** + **React Testing Library** for testing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd logistics-analytics-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🧭 User Journey

### 1. 🟢 Data Upload Screen
- Upload files via drag-and-drop or file picker
- Supported formats: CSV, XLSX, JSON, SQL, ZIP
- Contextual instructions and file validation

### 2. 🟡 Loading Screen
- Simulated data analysis with progress indicators
- Sequential loading messages:
  - "Analyzing data structure..."
  - "Detecting entity relationships..."
  - "Looking for anomalies..."
  - "Generating insights..."

### 3. 🟠 Dashboard (Level 0)
Four main insight categories:
- 📦 **Most Frequent Orders**
- ⏰ **Delivery Delays** 
- 💸 **Shipping Costs**
- 🧭 **Routes & Regions**

### 4. 🔵 Exploration (Level 1, 2, 3...)
Each card click reveals 4 new insights:
- **Delays** → Region analysis, trends, shipment types, warehouse performance
- **Costs** → Distance analysis, fuel impact, vehicle efficiency, loading optimization
- **Orders** → Categories, size distribution, customer segments, timing patterns
- **Routes** → Efficiency metrics, traffic patterns, cross-border logistics

## 🎨 Design Principles

- **Simplicity**: Clean, uncluttered interface that never overwhelms
- **Guided Discovery**: User always presented with 4 clear next steps
- **Contextual Insights**: Cards dynamically generated based on current path
- **Responsive Design**: Optimized for desktop and tablet usage
- **Smooth Interactions**: Hover effects, transitions, and loading states

## 🔧 Architecture

### Components Structure
```
src/
├── components/
│   ├── DataUploadScreen.tsx     # File upload interface
│   ├── LoadingScreen.tsx        # Animated loading with progress
│   ├── DashboardScreen.tsx      # Main 4-card dashboard
│   └── ExploreScreen.tsx        # Dynamic exploration interface
├── hooks/
│   └── useTypedTranslation.ts   # Type-safe i18n hook
├── store/
│   └── appState.ts              # Preact signals for global state
├── data/
│   └── insightData.ts           # Mock logistics insights data
└── i18n.ts                      # Internationalization setup
```

### State Management
- **Preact Signals** for reactive global state
- **TanStack Query** for async data operations
- **React Hook Form** for form state management

### Styling
- **Material-UI v5** components with sx prop
- **Theme-based** consistent color palette
- **Responsive Grid** system for layouts
- **Smooth animations** and transitions

## 🌍 Internationalization

Supports Polish (default) and English:
- Type-safe translation keys
- Nested JSON structure
- Easy language switching capability

## 🚧 Mock Data

The application uses comprehensive mock data representing:
- **Order patterns** and customer behavior
- **Delivery performance** metrics and delays
- **Cost structure** and optimization opportunities  
- **Route efficiency** and logistics insights

## 🔮 Future Enhancements

- **Real data integration** with APIs
- **Advanced visualizations** (charts, maps)
- **AI-powered insights** and recommendations
- **Export capabilities** for reports
- **Real-time data updates**
- **Mobile-responsive** interface

## 📝 License

This project is for demonstration purposes only. All data is mock/simulated.

---

Built with ❤️ for logistics professionals who need quick, actionable insights from their data. 