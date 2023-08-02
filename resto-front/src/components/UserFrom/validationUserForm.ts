// Función de validación para el campo de nombre
export function validateName(name: string): {
  isValid: boolean;
  message: string;
} {
  if (name.trim() === "") {
    return { isValid: false, message: "El nombre es obligatorio" };
  }

  return { isValid: true, message: "" };
}

// Función de validación para el campo de apellido
export function validateLastName(lastName: string): {
  isValid: boolean;
  message: string;
} {
  if (lastName.trim() === "") {
    return { isValid: false, message: "El apellido es obligatorio" };
  }

  return { isValid: true, message: "" };
}

// Función de validación para el campo de correo electrónico
export function validateEmail(email: string): {
  isValid: boolean;
  message: string;
} {
  // Expresión regular para validar el formato de un correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "El correo electrónico no es válido" };
  }

  return { isValid: true, message: "" };
}

// Función de validación para el campo de contraseña
export function validatePassword(password: string): {
  isValid: boolean;
  message: string;
} {
  if (password.length < 6) {
    return {
      isValid: false,
      message: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  return { isValid: true, message: "" };
}

// Función de validación para el campo de rol
export function validateRole(role: string): {
  isValid: boolean;
  message: string;
} {
  if (role.trim() === "") {
    return { isValid: false, message: "El rol es obligatorio" };
  }

  return { isValid: true, message: "" };
}

// Función de validación para el campo de estado (activo/desactivado)
export function validateActive(active: string): {
  isValid: boolean;
  message: string;
} {
  if (active !== "true" && active !== "false") {
    return { isValid: false, message: "Selecciona un estado válido" };
  }
  // Agrega más validaciones si es necesario
  return { isValid: true, message: "" };
}
