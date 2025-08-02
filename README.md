# 💳 FIAR Frontend - Sistema de Créditos
## Credit Management System - Web Application

<div align="center">

![FIAR Frontend](https://img.shields.io/badge/FIAR-Frontend-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

**Aplicación web moderna para gestión integral de créditos**  
*Parte del Ecosistema Humanizar*

</div>

## 🌟 Descripción General

FIAR Frontend es la interfaz de usuario del sistema de gestión de créditos del **Ecosistema Humanizar**. Esta aplicación web moderna, construida con Next.js 13 y TypeScript, proporciona una experiencia completa para la administración de clientes, transacciones de crédito, pagos y análisis financiero.

### 🎯 Propósito en el Ecosistema
- **Dashboard de créditos**: Interfaz principal para gestión de créditos
- **Portal de clientes**: Gestión completa de información de clientes
- **Centro de transacciones**: Monitoreo y control de operaciones crediticias
- **Sistema de pagos**: Integración con Wompi y métodos de pago
- **Analytics financiero**: Reportes y métricas en tiempo real

## ✨ Características Principales

### 📊 Dashboard Inteligente
- **Métricas en tiempo real** de créditos y transacciones
- **Gráficos interactivos** con Chart.js para análisis visual
- **Resumen financiero** de saldos y límites
- **Alertas automáticas** para límites y vencimientos
- **KPIs personalizables** por usuario

### 👥 Gestión Avanzada de Clientes
- **CRUD completo** de clientes con validación
- **Perfiles detallados** con información personal y comercial
- **Límites de crédito** configurables por cliente
- **Historial completo** de transacciones por cliente
- **Importación/Exportación** Excel para gestión masiva
- **Búsqueda y filtros** avanzados

### 💰 Centro de Transacciones
- **Vista unificada** de todas las transacciones
- **Estados dinámicos** (pending, approved, rejected, completed)
- **Filtros por fecha**, cliente, tipo y estado
- **Detalles completos** de cada operación
- **Paginación optimizada** para grandes volúmenes
- **Exportación de reportes** en múltiples formatos

### 💳 Sistema de Pagos
- **Integración Wompi** para pagos en línea
- **Payment Links** dinámicos
- **Suscripciones** y planes recurrentes
- **Métodos de pago** múltiples
- **Tracking de pagos** en tiempo real

### 🔐 Autenticación Segura
- **Firebase Auth** integrado
- **Protección de rutas** con middleware
- **Gestión de sesiones** persistente
- **Recuperación de contraseña** automatizada
- **Multi-dispositivo** sincronizado

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 13.5.6 | Framework React con SSR |
| **TypeScript** | 5.4.5 | Tipado estático |
| **React** | 18.3.1 | Biblioteca de UI |
| **Redux Toolkit** | 2.2.5 | Gestión de estado global |
| **React Bootstrap** | 2.10.2 | Componentes UI |
| **Chart.js** | 4.4.3 | Gráficos y visualizaciones |
| **Tailwind CSS** | 3.4.4 | Framework CSS utility-first |
| **Firebase** | 9.23.0 | Autenticación y servicios |
| **Axios** | 1.7.2 | Cliente HTTP |
| **XLSX** | 0.18.5 | Procesamiento de Excel |

## 🏗️ Arquitectura de la Aplicación

### Estructura de Directorios
```
📁 credito-front/
├── 📁 src/                           # Código fuente principal
│   ├── 📁 api/                       # Servicios de API
│   │   ├── 📄 index.ts               # Configuración base
│   │   ├── 📄 client.ts              # API de clientes
│   │   ├── 📄 transactions.ts        # API de transacciones
│   │   ├── 📄 payments.ts            # API de pagos
│   │   └── 📄 users.ts               # API de usuarios
│   ├── 📁 components/                # Componentes reutilizables
│   │   ├── 📄 Header.tsx             # Header de navegación
│   │   ├── 📄 Footer.tsx             # Footer de la aplicación
│   │   ├── 📄 Layout.tsx             # Layout principal
│   │   ├── 📄 Events.tsx             # Componente de eventos
│   │   ├── 📄 FilePreview.tsx        # Preview de archivos
│   │   ├── 📄 PremiumBanner.tsx      # Banner promocional
│   │   └── 📁 payment/               # Componentes de pago
│   │       └── 📄 PaymentForm.tsx    # Formulario de pago
│   ├── 📁 pages/                     # Páginas de la aplicación
│   │   ├── 📄 _app.tsx               # App wrapper principal
│   │   ├── 📄 _document.js           # Document personalizado
│   │   ├── 📄 index.tsx              # Página principal (router)
│   │   ├── 📁 home/                  # Página de inicio
│   │   │   └── 📄 index.tsx          # Landing page
│   │   ├── 📁 login/                 # Autenticación
│   │   │   ├── 📄 index.tsx          # Página de login
│   │   │   ├── 📄 Register.tsx       # Registro de usuarios
│   │   │   └── 📄 PasswordResetModal.tsx # Reset de contraseña
│   │   ├── 📁 client/                # Gestión de clientes
│   │   │   ├── 📄 index.tsx          # Lista principal
│   │   │   ├── 📄 ClientList.tsx     # Componente de lista
│   │   │   ├── 📄 ClientForm.tsx     # Formulario de cliente
│   │   │   ├── 📄 ClientFormModal.tsx # Modal de formulario
│   │   │   └── 📄 ClientDetailModal.tsx # Modal de detalle
│   │   ├── 📁 transacciones/         # Gestión de transacciones
│   │   │   ├── 📄 index.tsx          # Lista principal
│   │   │   ├── 📄 TransactionList.tsx # Componente de lista
│   │   │   └── 📄 TransactionFormModal.tsx # Modal de formulario
│   │   ├── 📁 plans/                 # Planes y suscripciones
│   │   │   └── 📄 index.tsx          # Gestión de planes
│   │   └── 📁 edit_user/             # Edición de perfil
│   │       └── 📄 index.tsx          # Perfil de usuario
│   ├── 📁 store/                     # Redux Store
│   │   ├── 📄 index.ts               # Configuración del store
│   │   ├── 📄 rootReducer.ts         # Root reducer
│   │   ├── 📄 helpers.ts             # Helpers del store
│   │   ├── 📁 user/                  # Estado de usuario
│   │   │   ├── 📄 index.tsx          # Hook personalizado
│   │   │   ├── 📄 actions.ts         # Acciones
│   │   │   └── 📄 reducer.ts         # Reducer
│   │   ├── 📁 client/                # Estado de clientes
│   │   │   ├── 📄 index.tsx          # Hook personalizado
│   │   │   ├── 📄 actions.ts         # Acciones
│   │   │   └── 📄 reducer.ts         # Reducer
│   │   ├── 📁 transactions/          # Estado de transacciones
│   │   │   ├── 📄 index.tsx          # Hook personalizado
│   │   │   ├── 📄 actions.ts         # Acciones
│   │   │   ├── 📄 reducer.ts         # Reducer
│   │   │   └── 📄 types.ts           # Tipos específicos
│   │   ├── 📁 payments/              # Estado de pagos
│   │   │   ├── 📄 index.tsx          # Hook personalizado
│   │   │   ├── 📄 actions.ts         # Acciones
│   │   │   └── 📄 reducer.ts         # Reducer
│   │   └── 📁 ui/                    # Estado de UI
│   │       ├── 📄 index.tsx          # Hook personalizado
│   │       ├── 📄 actions.ts         # Acciones
│   │       └── 📄 reducer.ts         # Reducer
│   ├── 📁 styles/                    # Estilos de la aplicación
│   │   ├── 📄 globals.css            # Estilos globales
│   │   ├── 📄 Client.module.css      # Estilos de clientes
│   │   ├── 📄 Transactions.module.css # Estilos de transacciones
│   │   ├── 📄 Login.module.css       # Estilos de login
│   │   ├── 📄 Register.module.css    # Estilos de registro
│   │   ├── 📄 Header.module.css      # Estilos de header
│   │   └── 📄 Contact.module.css     # Estilos de contacto
│   └── 📁 utils/                     # Utilidades y helpers
│       ├── 📄 auth.tsx               # Utilidades de autenticación
│       ├── 📄 axios.ts               # Configuración Axios
│       ├── 📄 conversions.ts         # Funciones de conversión
│       ├── 📄 fileUtils.ts           # Utilidades de archivos
│       ├── 📄 firebase.config.ts     # Configuración Firebase
│       └── 📄 types.ts               # Definiciones de tipos
├── 📁 public/                        # Archivos estáticos
│   └── 📁 img/                       # Imágenes y recursos
│       ├── 📄 Logo.png               # Logo principal
│       ├── 📄 dollar.png             # Icono de dólar
│       ├── 📄 girlcart.png           # Imagen decorativa
│       ├── 📄 student.png            # Imagen decorativa
│       └── 📄 fondo.png              # Imagen de fondo
├── 📄 next.config.js                 # Configuración Next.js
├── 📄 tailwind.config.js             # Configuración Tailwind
├── 📄 tsconfig.json                  # Configuración TypeScript
├── 📄 postcss.config.js              # Configuración PostCSS
├── 📄 package.json                   # Dependencias
└── 📄 Dockerfile                     # Imagen Docker
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** >= 16.x
- **npm** >= 8.x o **yarn** >= 1.x
- **FIAR API** ejecutándose
- **Git** para control de versiones

### 1️⃣ Instalación
```bash
# Navegar al directorio
cd FIAR/credito-front

# Instalar dependencias
npm install
# o
yarn install
```

### 2️⃣ Configuración del Entorno
```bash
# Crear archivo de variables de entorno
cp .env.local.example .env.local

# Editar variables
nano .env.local
```

#### Variables de Entorno
```bash
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3004/api
NEXT_PUBLIC_API_BASE_URL=http://localhost:3004

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App Configuration
NEXT_PUBLIC_APP_NAME=FIAR Credit System
NEXT_PUBLIC_APP_VERSION=0.1.0
NEXT_PUBLIC_ENVIRONMENT=development

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_EXCEL_IMPORT=true

# Wompi Integration
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_your_public_key
NEXT_PUBLIC_WOMPI_SANDBOX=true

# UI Configuration
NEXT_PUBLIC_DEFAULT_PAGE_SIZE=10
NEXT_PUBLIC_MAX_FILE_SIZE=5242880  # 5MB
NEXT_PUBLIC_ALLOWED_FILE_TYPES=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv
```

## 🏃‍♂️ Ejecución

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
# o
yarn dev

# La aplicación estará disponible en:
# http://localhost:3000
```

### Producción
```bash
# Construir para producción
npm run build
# o
yarn build

# Iniciar servidor de producción
npm start
# o
yarn start
```

### Con Docker
```bash
# Construir imagen Docker
docker build -t fiar-frontend .

# Ejecutar contenedor
docker run -p 3000:3000 fiar-frontend
```

## 🎨 Características de la Interfaz

### 🏠 Página de Inicio
- **Hero section** con información del sistema
- **Características principales** destacadas
- **Call-to-action** para registro/login
- **Responsive design** optimizado para móvil

### 📊 Dashboard Principal
- **Resumen de métricas** en tiempo real
- **Gráficos interactivos** de transacciones
- **Alertas y notificaciones** importantes
- **Acceso rápido** a funciones principales
- **Widgets personalizables** por usuario

### 👥 Gestión de Clientes
- **Lista paginada** con búsqueda y filtros
- **Formulario completo** con validación
- **Modal de detalles** con información completa
- **Importación Excel** con plantilla predefinida
- **Exportación de datos** en múltiples formatos
- **Gestión de límites** de crédito individual

### 💰 Centro de Transacciones
- **Vista de tabla** con ordenamiento
- **Filtros avanzados** por múltiples criterios
- **Estados visuales** con badges de color
- **Modal de creación** con formulario completo
- **Historial detallado** por cliente
- **Exportación de reportes** personalizados

### 💳 Sistema de Pagos
- **Formulario de pago** integrado con Wompi
- **Payment links** generados dinámicamente
- **Gestión de suscripciones** y planes
- **Historial de pagos** completo
- **Estados de pago** en tiempo real

### ⚙️ Configuración de Usuario
- **Perfil completo** editable
- **Configuración de notificaciones**
- **Preferencias de interfaz**
- **Gestión de seguridad**
- **Historial de actividad**

## 🔌 Integración con FIAR API

### Cliente API
```typescript
// Configuración del cliente API
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para autenticación
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Redux State Management
```typescript
// Store principal con persistencia
const store = configureStore({
  reducer: {
    user: userReducer,
    client: clientReducer,
    transactions: transactionsReducer,
    payments: paymentsReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
```

### Custom Hooks
```typescript
// Hook personalizado para clientes
const useClient = () => {
  const dispatch = useAppDispatch();
  const client = useAppSelector(state => state.client);
  
  const fetchClient = useCallback(async (params) => {
    // Lógica de fetch
  }, [dispatch]);
  
  return { client, fetchClient, createClient, updateClient };
};
```

## 🎯 Funcionalidades Específicas

### Gestión de Estados
- **Loading states** con spinners personalizados
- **Error handling** con alertas informativas
- **Optimistic updates** para mejor UX
- **Real-time sync** con WebSockets

### Validación de Formularios
- **Validación en tiempo real** con feedback visual
- **Reglas de negocio** integradas
- **Campos requeridos** marcados claramente
- **Mensajes de error** contextuales

### Importación/Exportación
- **Templates Excel** predefinidos
- **Validación de datos** antes de importar
- **Preview de datos** antes de confirmar
- **Reportes de errores** detallados
- **Exportación personalizada** con filtros

### Responsive Design
- **Mobile-first approach**
- **Breakpoints optimizados**
- **Touch-friendly interfaces**
- **Navegación adaptiva**

## 📱 Compatibilidad

### Navegadores Soportados
- **Chrome** >= 90
- **Firefox** >= 88
- **Safari** >= 14
- **Edge** >= 90

### Dispositivos
- **Desktop**: Resoluciones 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: 320px - 768px

## 🧪 Testing y Calidad

### Comandos Disponibles
```bash
# Linting
npm run lint

# Build check
npm run build

# Type checking
npx tsc --noEmit
```

### Estándares de Calidad
- **ESLint** para calidad de código
- **TypeScript strict mode**
- **Component composition**
- **Custom hooks** para lógica
- **CSS Modules** para estilos

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variables en Vercel dashboard
```

### Docker Production
```bash
# Build para producción
docker build -f Dockerfile -t fiar-frontend:prod .

# Run en producción
docker run -p 3000:3000 fiar-frontend:prod
```

### Variables por Ambiente
```bash
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:3004/api

# .env.staging
NEXT_PUBLIC_API_URL=https://staging-api.fiar.com/api

# .env.production
NEXT_PUBLIC_API_URL=https://api.fiar.com/api
```

## 🤝 Contribución

### Proceso de Desarrollo
1. **Fork** del repositorio
2. **Branch** específico: `feature/nueva-funcionalidad`
3. **Desarrollo** siguiendo guías de estilo
4. **Testing** de funcionalidades
5. **Pull request** con descripción detallada

### Guías de Estilo
- **Componentes funcionales** con TypeScript
- **Custom hooks** para lógica reutilizable
- **CSS Modules** para estilos específicos
- **Conventional commits** para mensajes
- **JSDoc** para documentación

## 📞 Soporte

### Enlaces Útiles
- [FIAR API Documentation](../creditos-api/README.md)
- [Ecosistema Humanizar](../../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Bootstrap Docs](https://react-bootstrap.github.io)

### Contacto
- **Maintainer**: Steven Vallejo Ortiz
- **Email**: stevenvallejo780@gmail.com
- **Issues**: GitHub Issues del repositorio

### Troubleshooting

#### Error de conexión API
```bash
# Verificar que FIAR API esté ejecutándose
curl http://localhost:3004/health

# Verificar variables de entorno
echo $NEXT_PUBLIC_API_URL
```

#### Problemas de build
```bash
# Limpiar caché de Next.js
rm -rf .next

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

#### Issues con Firebase
```bash
# Verificar configuración
console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)

# Revisar autenticación
firebase auth:export --project your-project-id
```

---

<div align="center">

**FIAR Frontend v0.1.0**  
*Sistema de Créditos Web App - Ecosistema Humanizar*

![Humanizar](https://img.shields.io/badge/Humanizar-Ecosystem-orange?style=for-the-badge)

</div>
