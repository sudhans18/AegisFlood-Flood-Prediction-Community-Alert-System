# AegisFlood Frontend Guidelines - Enhanced for Code Generation

This enhanced document builds upon the core design principles by providing a detailed technical blueprint for frontend development. It includes a recommended project structure, naming conventions, and granular component definitions to ensure a consistent and scalable codebase.

---

### **1. Project Structure & Naming Conventions**

A clean and predictable file structure is essential for a maintainable project. We will follow a component-driven approach.

* **Folder Structure:**
    ```
    /src
    ├── components/
    │   ├── shared/
    │   │   ├── Button.js
    │   │   ├── Card.js
    │   │   ├── Input.js
    │   │   ├── StatusPill.js
    │   │   └── Toggle.js
    │   └── ui/
    │       ├── DashboardCard.js
    │       ├── Header.js
    │       └── NavigationBar.js
    ├── pages/
    │   ├── Dashboard.js
    │   ├── Home.js
    │   ├── Login.js
    │   ├── Registration.js
    │   └── Settings.js
    ├── styles/
    │   ├── main.css (for Tailwind CSS base/utilities)
    └── App.js
    ```

* **File Naming:** Use PascalCase for React components (e.g., `Button.js`, `Dashboard.js`). Use camelCase for utility functions and variables.
* **CSS Naming:** We will use Tailwind CSS utility classes. Avoid custom CSS files and instead apply classes directly to components.

### **2. Color Palette & Typography**

* **Color Palette (as Tailwind config):**
    The following colors should be defined in a `tailwind.config.js` file for easy use.
    ```javascript
    colors: {
        'brand-blue': '#2563EB',
        'dark-black': '#000000',
        'light-gray': '#F5F5F5',
        'border-gray': '#E0E0E0',
        'dark-gray': '#757575',
        'status-safe': '#34C759',
        'status-medium': '#FFCC00',
        'status-high': '#FF9500',
        'status-critical': '#DC2626',
        'status-alert': '#FF3B30',
        'status-completed': '#34C759', // Re-use for consistency
    }
    ```

* **Typography (as Tailwind config):**
    ```javascript
    fontFamily: {
      sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
    fontSize: {
      'xs': '0.75rem',  // 12px
      'sm': '0.875rem', // 14px (Small Text)
      'base': '1rem',    // 16px (Body Text)
      'lg': '1.125rem',  // 18px (H2)
      'xl': '1.5rem',    // 24px (H1)
    }
    ```

### **3. Component Definitions (Props & Variations)**

Each component should be a functional React component using hooks. All styling should be done using Tailwind CSS classes.

#### **`Button`**
* **File:** `src/components/shared/Button.js`
* **Props:** `children`, `onClick`, `variant`, `disabled`, `className`
* **Variants:**
    * `primary`: `bg-dark-black text-white`
    * `secondary`: `bg-light-gray text-dark-gray`
    * `link`: `text-brand-blue`
    * `disabled`: `bg-gray-400 text-white cursor-not-allowed`

#### **`Card`**
* **File:** `src/components/shared/Card.js`
* **Props:** `children`, `className`
* **Structure:** A container with a white background, rounded corners, and a subtle shadow.
    * **Tailwind Classes:** `bg-white rounded-xl shadow-sm p-4`

#### **`Input`**
* **File:** `src/components/shared/Input.js`
* **Props:** `type`, `placeholder`, `value`, `onChange`, `className`
* **States:**
    * `Default`: `border border-border-gray rounded-md`
    * `Focus`: `border-brand-blue ring-1 ring-brand-blue`

#### **`StatusPill`**
* **File:** `src/components/shared/StatusPill.js`
* **Props:** `status`, `children`, `className`
* **Behavior:** The component's background and text color should change based on the `status` prop (`safe`, `medium`, `high`, `critical`, `completed`). It should also include an icon (e.g., a triangle for risk, a checkmark for completed).
    * **Example:** `<StatusPill status="medium">Medium Risk</StatusPill>` would render a yellow pill with the corresponding text.

### **4. State Management & API Integration**

* **State:** Use `useState` for simple component-level state (e.g., form input values). For global state (e.g., user authentication, dashboard data), use React Context to avoid prop drilling.
* **Data Fetching:** All data fetching should be handled asynchronously. Use a dedicated service file or hook for API calls to keep components clean. The UI should display a loading state (`Loading...`) while waiting for data.

### **5. Responsive Design**

The application must be fully responsive. Use Tailwind's built-in responsive prefixes (`sm:`, `md:`, `lg:`) to adjust layouts.

* **Mobile-First Approach:** Start with the mobile layout and add breakpoints for larger screens.
* **Breakpoints:**
    * `sm`: `640px`
    * `md`: `768px`
    * `lg`: `1024px`
    * `xl`: `1280px`
* **Layouts:** Dashboards should transition from single-column layouts on mobile to multi-column grids on tablets and desktops. Components should use fluid widths (`w-full`) and adapt to their container size.
* **Tables:** For small screens, consider converting tables into scrollable sections or a card-list view where each row becomes a small card.