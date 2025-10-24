# Quick UI - Component Generator

A modern, interactive web application for generating customizable UI components with live previews and code export functionality. Built with **Tailwind CSS**, **Vanilla JavaScript**, and **HTML5**.

## 🎯 Project Overview

**Quick UI** is a component generation platform that allows developers and designers to:
- Create and customize UI components (Buttons, Toggle Switches, Checkboxes, Input Fields, Loaders, Cards)
- Preview components in real-time
- Copy generated code to clipboard
- Save components to browser history for future reference
- Manage a library of previously generated components

## 📁 Project Structure

```
project-root/
├── index.html                 # Home page with feature showcase
├── styles.css               # Global styles
├── generator/
│   ├── generator.html       # Component selector page
│   └── styles.css
├── history/
│   ├── history.html         # Generated components history
│   ├── history.js           # History management logic
│   └── styles.css
├── components/
│   ├── Button/
│   │   ├── button.html
│   │   ├── button.js
│   │   └── button.css
│   ├── Toggle/
│   │   ├── toggle.html
│   │   ├── toggle.js
│   │   └── toggle.css
│   ├── Checkbox/
│   │   ├── checkbox.html
│   │   ├── checkbox.js
│   │   └── checkbox.css
│   ├── Input/
│   │   ├── input.html
│   │   ├── input.js
│   │   ├── input.css
│   ├── Loader/
│   │   ├── loader.html
│   │   ├── loader.js
│   │   └── loader.css
│   └── Card/
│       ├── card.html
│       ├── card.js
│       └── card.css
```

## 🚀 Features

### Core Features
- **Component Generators**: Interactive UI for creating 6 different component types
- **Real-time Preview**: Instant visual feedback as you customize components
- **Code Export**: Copy generated Tailwind CSS code to clipboard
- **History Management**: Save and access previously generated components
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Input Validation**: Safe handling of numeric values, color inputs, and DOM access

### Component Types

#### 1. **Button Generator**
- Customizable text, colors, padding, border radius
- Hover effects (darken, lighten, scale)
- Border styling and width control
- Transition duration settings

#### 2. **Toggle Switch Generator**
- Adjustable size and styling
- Custom on/off colors
- Label positioning (left, right)
- Transition duration control
- Initial state configuration

#### 3. **Checkbox Generator**
- Customizable size and border radius
- Checked/unchecked colors
- Checkmark customization
- Label positioning options
- Transition animations

#### 4. **Input Field Generator**
- Multiple input types (text, password, email, number, tel)
- Label positioning (top, left)
- Icon support (eye, eye-off, check, search, etc.)
- Border radius and state control
- Width options

#### 5. **Loader Generator**
- Multiple loader types (spinner, bars, dots)
- Primary and secondary color customization
- Adjustable size, thickness, duration
- Optional label with positioning
- Animation speed control

#### 6. **Card Generator**
- Modular card structure (header, image, body, footer)
- Image positioning (top/bottom)
- Customizable dimensions and shadows
- Border styling
- Optional button in footer

## 🎨 Customization Options

Each component generator offers:
- **Colors**: HEX color picker for all color-related properties
- **Dimensions**: Size, width, height, padding controls
- **Styling**: Border radius, shadows, borders
- **Animations**: Transition duration, animation speed
- **Labels**: Text customization and positioning

## 💾 Data Persistence

Components are saved to browser **localStorage** with:
- Component type identifier
- Generated HTML/CSS code
- Timestamp of creation
- Quick access from history page

## 🔧 Technical Stack

| Technology | Usage |
|-----------|-------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Styling and animations |
| **Tailwind CSS** | Utility-first CSS framework (via CDN) |
| **Vanilla JavaScript** | Component logic and interactivity |
| **Feather Icons** | Icon library for input fields |
| **localStorage API** | Client-side data persistence |

## 📱 Responsive Design

- **Mobile First**: Optimized for small screens
- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Touch Friendly**: Large click targets and readable text


## 🎯 Key Pages

### Home Page (`index.html`)
- Hero section with project overview
- Feature highlights
- Component categories showcase
- Call-to-action buttons
- Navigation to generator and history

### Generator Page (`generator/generator.html`)
- Grid of component type cards
- Links to individual component generators
- Visual icons and descriptions

### Component Generators
- Interactive control panels on the left
- Live preview in the center/right
- Generated code display with copy button
- Mobile-responsive layout

### History Page (`history/history.html`)
- List of all generated components
- Component code preview
- Preview modal with interactive component
- Copy and delete functionality
- Clear history option


## 🚀 Getting Started


### Usage
1. **Generate**: Click "Generator" → Select component type
2. **Customize**: Adjust settings in the left panel
3. **Preview**: View changes in real-time on the right
4. **Copy**: Click "Copy to Clipboard" button
5. **Save**: Component automatically saved to history
6. **Retrieve**: Visit "History" page to access saved components

## 📊 Component Settings Reference

### Button
- Text, Title, Colors (text, background, border)
- Dimensions: Padding, Border Radius, Border Width
- Hover Effect: None, Darken, Lighten, Scale
- Transition Duration: 0-4000ms

### Toggle
- Label, Title, Colors (on, off, thumb, label)
- Size: 8-200px, Border Radius
- Initial State: On/Off
- Transition Duration: 0-10000ms
- Label Position: Left, Right

### Checkbox
- Label, Title, Colors (checked, unchecked, check, label)
- Size: 8-128px, Border Radius, Border Style
- Initial State: Checked/Unchecked
- Transition Duration: 0-10000ms
- Label Position: Left, Right, None

### Input
- Type: Text, Password, Email, Number, Tel
- Label: Text, Position (Top, Left)
- Colors: Text, Background, Border, Focus
- Size: Small, Medium, Large
- Border Radius, Width, State (Default, Focused, Disabled, Readonly)
- Icon: Optional with multiple choices

### Loader
- Type: Spinner, Bars, Dots
- Colors: Primary, Secondary
- Size: 8-512px, Thickness: 1-50px
- Duration: 0.1-60s
- Label: Optional with positioning

### Card
- Structure: Header, Image, Body, Footer
- Dimensions: Width, Height options
- Image: Height, Position (Top, Bottom)
- Colors: Background, Text, Border
- Styling: Border Radius, Shadow, Border
- Content: Header title, Body text, Footer text, Button

## 🎨 Design Philosophy

- **Dark Theme**: Eye-friendly dark background (#030712)
- **Modern Aesthetic**: Glass-morphism effects with backdrop blur
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Performance**: Minimal dependencies, fast loading
- **User Experience**: Intuitive controls and instant feedback

## 🐛 Known Limitations

- Components use Tailwind CSS arbitrary values (`[value]`) which may not work in all build environments
- Browser storage limited to ~5-10MB per domain
- History cleared if browser cache is cleared
- Mobile menu requires JavaScript to toggle


## 📝 Code Export Format

All generated components export as:
- **Framework**: Tailwind CSS
- **Syntax**: HTML with Tailwind classes
- **Format**: Ready-to-copy markup
- **Dependencies**: Tailwind CSS CDN or build tool


## 👤 Creator

**GitHub**: [Rutansh0101](https://github.com/Rutansh0101)

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Feather Icons](https://feathericons.com/) - Beautiful icon set
- [Inter Font](https://fonts.google.com/specimen/Inter) - Modern typeface

---