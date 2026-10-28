// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Input } from '@/registry/frontend-ui/input/ui/input';

import { FormField } from './form-field';

describe('FormField', () => {
  afterEach(() => {
    cleanup();
  });

  it('links the label and the description to the field', () => {
    render(
      <FormField label="Telefone" description="Com DDD, só números.">
        <Input name="phone" />
      </FormField>,
    );

    const field = screen.getByLabelText('Telefone');
    const descriptionId = screen.getByText('Com DDD, só números.').id;
    expect(field.getAttribute('aria-describedby')).toContain(descriptionId);
  });

  it('shows the error and marks the field as invalid', () => {
    render(
      <FormField label="CPF" error="CPF inválido.">
        <Input name="cpf" />
      </FormField>,
    );

    expect(screen.getByText('CPF inválido.')).toBeDefined();
    expect(screen.getByLabelText('CPF').getAttribute('aria-invalid')).toBe('true');
  });

  it('shows no error when there is none', () => {
    render(
      <FormField label="Nome">
        <Input name="name" />
      </FormField>,
    );

    expect(screen.getByLabelText('Nome').getAttribute('aria-invalid')).toBeNull();
  });
});
