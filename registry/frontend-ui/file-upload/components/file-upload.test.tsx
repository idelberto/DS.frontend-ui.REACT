// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { FileUpload } from './file-upload';

describe('FileUpload', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows the chosen file name and hands the file over', async () => {
    const onFileChange = vi.fn();
    render(<FileUpload label="Foto" onFileChange={onFileChange} />);
    const photo = new File(['foto'], 'retrato.png', { type: 'image/png' });

    await userEvent.upload(screen.getByLabelText('Foto'), photo);

    expect(screen.getByText('retrato.png')).toBeDefined();
    expect(onFileChange).toHaveBeenCalledWith(photo);
  });
});
