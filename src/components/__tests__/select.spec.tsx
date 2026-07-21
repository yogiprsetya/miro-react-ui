import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Label } from '~/components/ui/label';

function renderSelect(props: {
  defaultValue?: string;
  disabled?: boolean;
  'aria-invalid'?: 'true' | 'false';
  value?: string;
  onValueChange?: (value: string) => void;
} = {}) {
  return render(
    <Select {...props}>
      <SelectTrigger aria-label="Choose a role">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="viewer">Viewer</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectSeparator />
          <SelectItem value="admin" disabled>
            Admin
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    renderSelect();

    const trigger = screen.getByRole('combobox', { name: 'Choose a role' });

    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('data-slot', 'select-trigger');
    expect(trigger).toHaveTextContent('Select a role');
  });

  it('supports labeled usage with Label', () => {
    render(
      <Select>
        <Label htmlFor="role-select">Role</Label>
        <SelectTrigger id="role-select">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="editor">Editor</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByLabelText('Role')).toHaveAttribute(
      'id',
      'role-select'
    );
  });

  it('opens the dropdown and selects an item on click', async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole('combobox', { name: 'Choose a role' });
    await user.click(trigger);

    const listbox = await screen.findByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const editorOption = within(listbox).getByRole('option', { name: 'Editor' });
    await user.click(editorOption);

    expect(trigger).toHaveTextContent('Editor');
  });

  it('supports keyboard navigation and selection', async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole('combobox', { name: 'Choose a role' });
    await user.click(trigger);

    const listbox = await screen.findByRole('listbox');
    const options = within(listbox).getAllByRole('option');
    expect(options.map((o) => o.textContent)).toEqual([
      'Viewer',
      'Editor',
      'Admin',
    ]);

    await user.keyboard('{ArrowDown}{Enter}');

    expect(trigger).toHaveTextContent('Editor');
  });

  it('closes with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole('combobox', { name: 'Choose a role' });
    await user.click(trigger);
    expect(await screen.findByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('supports controlled value', () => {
    const { rerender } = renderSelect({ value: 'viewer' });

    const trigger = screen.getByRole('combobox', { name: 'Choose a role' });
    expect(trigger).toHaveTextContent('Viewer');

    rerender(
      <Select value="editor">
        <SelectTrigger aria-label="Choose a role">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="viewer">Viewer</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(trigger).toHaveTextContent('Editor');
  });

  it('reflects disabled and invalid states', () => {
    renderSelect({ disabled: true });

    const trigger = screen.getByRole('combobox', { name: 'Choose a role' });

    expect(trigger).toBeDisabled();
    expect(trigger.className).toContain('disabled:cursor-not-allowed');
  });

  it('marks invalid state', () => {
    renderSelect();

    const trigger = screen.getByRole('combobox', { name: 'Choose a role' });
    trigger.setAttribute('aria-invalid', 'true');

    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger.className).toContain('aria-invalid:border-error-500');
  });

  it('marks disabled items as aria-disabled', async () => {
    const user = userEvent.setup();
    renderSelect();

    const trigger = screen.getByRole('combobox', { name: 'Choose a role' });
    await user.click(trigger);

    const listbox = await screen.findByRole('listbox');
    const adminOption = within(listbox).getByRole('option', { name: 'Admin' });

    expect(adminOption).toHaveAttribute('aria-disabled', 'true');
  });
});
