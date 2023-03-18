enum InputType {
  Text = "text",
  Password = "password",
}

interface Field {
  text: () => string;
  clear: () => void;
  focus: () => void;
  blur: () => void;
}

export { InputType, Field };
