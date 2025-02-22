import { ComponentConfig } from "@/core";
import React from "react";

export type FormProps = {
    title: string;
    inputFields: {
        label: string;
        type: "text" | "email" | "number" | "radio" | "checkbox" | "select" | "textarea";
    }[];
};

export const Form: ComponentConfig<FormProps> = {
    label: "Form",
    fields: {
        title: {
            label: "Form Title",
            type: "text"
        },
        inputFields: {
            type: "array",
            getItemSummary: (item) => item.label || "New Field",
            arrayFields: {
                label: { type: "text" },
                type: {
                    type: "select",
                    options: [
                        { label: "Text", value: "text" },
                        { label: "Email", value: "email" },
                        { label: "Number", value: "number" },
                        { label: "Radio", value: "radio" },
                        { label: "Checkbox", value: "checkbox" },
                        { label: "Select", value: "select" },
                        { label: "Textarea", value: "textarea" }
                    ]
                }
            },
            defaultItemProps: {
                label: "New Field",
                type: "text"
            }

        }
    },
    defaultProps: {
        title: "Contact Us",
        inputFields: [{ label: "Email", type: "email" }]
    },
    render: ({ title, inputFields }) => {
        return (
            <div>
                <form>
                    <h2>{title}</h2>
                    {inputFields.map((field, index) => (
                        <div key={index}>
                            <label htmlFor={`${index}-${field.label}`}>{field.label}</label>

                            {field.type === "textarea" ? (
                                <textarea
                                    id={`${index}-${field.label}`}
                                    name={`${index}-${field.label}`}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    id={`${index}-${field.label}`}
                                    name={`${index}-${field.label}`}
                                />
                            )}
                        </div>
                    ))}
                </form>
            </div>
        )
    }
}