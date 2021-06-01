import React, { ReactChild, useCallback, useState } from "react";
import { AxiosResponse } from "axios";
import classNames from "classnames";
import styled from "styled-components";

type Field<T> = {
  label: string;
  type: "text" | "password" | "textarea";
  key: keyof T;
  className?: string;
};

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>;
    success: () => void;
  };
};

const Form = styled.form`
  .field {
    margin: 8px 0;
  }
`;
const Label = styled.label`
  display: flex;
  line-height: 32px;
  .label-text {
    white-space: nowrap;
    margin-right: 1em;
  }
  input {
    height: 32px;
  }
  > .control {
    width: 100%;
  }
`;

export function useForm<T>(options: useFormOptions<T>) {
  const { initFormData, fields, buttons, submit } = options;
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    for (const key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = [];
      }
    }
    return e;
  });
  const onChange = useCallback(
    (key: keyof T, value: any) => {
      setFormData({ ...formData, [key]: value });
    },
    [formData]
  );

  const _onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submit.request(formData).then(submit.success, (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors(response.data);
          } else if (response.status === 401) {
            window.alert("请先登录");
            window.location.href = `/sign_in?return_to=${encodeURIComponent(
              window.location.pathname
            )}`;
          }
        }
      });
    },
    [submit, formData]
  );

  const form = (
    <Form onSubmit={_onSubmit}>
      {fields.map((field) => (
        <div
          key={field.key.toString()}
          className={classNames("field", `field-${field.key}`, field.className)}
        >
          <Label>
            <span className="label-text">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                className="control"
                onChange={(e) => onChange(field.key, e.target.value)}
                value={formData[field.key].toString()}
              />
            ) : (
              <input
                type={field.type}
                className="control"
                value={formData[field.key].toString()}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            )}
          </Label>
          {errors[field.key]?.length > 0 && (
            <div>{errors[field.key].join(",")}</div>
          )}
        </div>
      ))}
      <div>{buttons}</div>
    </Form>
  );
  return {
    form: form,
    setErrors: setErrors,
  };
}
