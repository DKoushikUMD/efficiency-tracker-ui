# EffiTrak.tech - Construction Site Efficiency Dashboard

![EffiTrak.tech Logo](./public/logo.svg)

## Overview

EffiTrak.tech is a sophisticated real-time dashboard for monitoring and optimizing construction site efficiency. It transforms static worksite blueprints into dynamic, interactive visualizations by integrating data from multiple sources including video feeds, CSV data, and IoT sensors.

## Features

### 🏗️ Interactive Blueprint View
- Real-time heat map visualization of site activity
- Zone-based monitoring and analytics
- Dynamic worker density tracking
- Equipment location monitoring

### 📊 Advanced Analytics
- Real-time efficiency metrics
- Resource utilization tracking
- Performance trend analysis
- Custom metric calculations

### 🚜 Equipment Management
- Real-time equipment status monitoring
- Maintenance scheduling and tracking
- Utilization analytics
- Location tracking

### 🔮 Predictive Analytics
- Efficiency forecasting
- Resource optimization suggestions
- Bottleneck prediction
- Weather impact analysis

### 📤 Data Integration
- Video feed analysis
- CSV data processing
- Real-time metric calculations
- Automated alert system

## Technology Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: shadcn/ui
- **Data Processing**: Papaparse, Lodash

## Getting Started

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/effitrak-tech.git
cd effitrak-tech
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Project Structure

```
src/
  ├── components/
  │   ├── blueprint/      # Blueprint view components
  │   ├── analytics/      # Analytics components
  │   ├── equipment/      # Equipment management
  │   ├── predictions/    # Predictive analytics
  │   ├── upload/         # File upload components
  │   └── shared/         # Shared components
  ├── hooks/              # Custom React hooks
  ├── utils/              # Utility functions
  ├── context/            # React context providers
  └── routes/             # Application routing
```

## Configuration

### Data Upload Specifications

#### Video Files
- Supported formats: MP4, WebM
- Maximum file size: 100MB
- Recommended resolution: 720p or higher

#### CSV Files
Required columns:
- timestamp
- efficiency
- utilization
- completion

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Implement proper error handling
- Write meaningful component documentation
- Use TypeScript for type safety

### Naming Conventions
- Components: PascalCase
- Functions: camelCase
- Files: PascalCase for components, camelCase for utilities
- CSS classes: kebab-case

## Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## Deployment

1. Build the project
```bash
npm run build
```

2. Preview the build
```bash
npm run preview
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- React team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- shadcn/ui for the beautiful UI components
- All contributors who have helped shape this project

## Support

For support, email support@effitrak.tech or join our Slack channel.

## Roadmap

- [ ] Mobile application integration
- [ ] AI-powered resource optimization
- [ ] 3D visualization support
- [ ] Real-time collaboration features
- [ ] Advanced reporting system

---

Built with ❤️ by the EffiTrak.tech team