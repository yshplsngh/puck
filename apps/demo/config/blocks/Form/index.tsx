import { ComponentConfig } from "@/core";
import React from "react";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@/core/lib";

const getClassName = getClassNameFactory("Form", styles);

export type FormProps = {
    title: string;
    inputFields: {
        label: string;
        type: "text" | "email" | "number" | "radio" | "textarea";
        options?: {
            optionText: string;
        }[];
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
                        { label: "Textarea", value: "textarea" }
                    ]
                },
                options: {
                    type: "array",
                    arrayFields: {
                        optionText: { type: "text" }
                    },
                    defaultItemProps: {
                        optionText: "New Option",
                    }
                }
            },
            defaultItemProps: {
                label: "New Field",
                type: "text",
            }
        }
    },
    defaultProps: {
        title: "Contact Us",
        inputFields: [{ label: "Email", type: "email" }]
    },
    render: ({ title, inputFields }) => {
        return (
            <div className={getClassName()}>
                <form>
                    <h2>{title}</h2>
                    {inputFields.map((field, index) => (
                        <div className={getClassName("group")} key={index}>
                            <label htmlFor={`${index}-${field.label}`}>{field.label}</label>

                            {field.type === "textarea" ? (
                                <textarea
                                    id={`${index}-${field.label}`}
                                    name={`${index}-${field.label}`}
                                />
                            ) : field.type === "radio" ? (
                                <div className={getClassName("radio-group")}>
                                    {field.options?.map((option, optionIndex) => (
                                        <div className={getClassName("radio-option")} key={optionIndex}>
                                            <input
                                                type="radio"
                                                id={`${optionIndex}-${field.label}-${option.optionText}`}
                                                name={`${index}-${field.label}`}
                                                value={option.optionText}
                                            />
                                            <label htmlFor={`${optionIndex}-${field.label}-${option.optionText}`}>
                                                {option.optionText}
                                            </label>
                                        </div>

                                    ))}
                                </div>
                            ) : (
                                <input
                                    type={field.type}
                                    id={`${index}-${field.label}`}
                                    name={`${index}-${field.label}`}
                                />
                            )}
                        </div>
                    ))}
                    {inputFields.length > 0 && (
                        <button type="submit" className={getClassName("submit")}>
                            Submit
                        </button>
                    )}
                </form>
            </div>
        )
    }
}