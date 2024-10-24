import { useState } from 'react';

export const useForm = <T>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);

  const clearForm = () => {
    setForm(() => initialState);
  };

  return {
    form,
    setForm,
    clearForm
  };
};
