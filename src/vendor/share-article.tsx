"use client";

import { ComponentType } from "react";

export function Clipboard_Share(Component): ComponentType<any> {
  return (props) => {
    return (
      <Component
        {...props}
        onTap={() => {
          const textField = document.createElement("textarea");
          textField.innerText = window.location.href;
          document.body.appendChild(textField);
          textField.select();
          document.execCommand("copy");
          textField.remove();
          alert("URL copied to clipboard!");
        }}
      />
    );
  };
}
